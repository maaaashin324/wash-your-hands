import { AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { AlertFrequencyType } from 'types/alertFrequency';
import { LOCATION_TASK_NAME, TIMER_TASK } from '@constants/task';
import { setFrequency } from './frequency';
import { startLocationUpdates, isMovedFarEnough } from './location';
import { makeNotificationForWash, getTimerDuration } from './notifications';
import { getTimerPermission, getLocationPermission } from './permissions';

// eslint-disable-next-line
export const makeNotifications = async (locations): Promise<void> => {
  const result = isMovedFarEnough(locations);
  if (result) {
    await makeNotificationForWash();

    const dataSet = await AsyncStorage.getItem('washTimes');
    let frequency: AlertFrequencyType = {};
    if (dataSet) {
      frequency = JSON.parse(dataSet);
    }
    await setFrequency({ frequency, dataTobeSet: Date.now(), type: 'alert' });
  }
};

export const makeTimerNotifications = async (): Promise<number> => {
  const granted = await getTimerPermission();
  if (!granted) {
    return BackgroundFetch.Result.NoData;
  }
  const timerDuration = await getTimerDuration();
  setInterval(() => {
    makeNotificationForWash();
  }, timerDuration * 60000);
  return BackgroundFetch.Result.NewData;
};

const initLocationTask = async (): Promise<void> => {
  if (!TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
    TaskManager.defineTask(
      LOCATION_TASK_NAME,
      // eslint-disable-next-line
      // @ts-ignore
      ({ data: { locations }, error }) => {
        if (error) {
          console.error(error);
        }
        makeNotifications(locations);
      }
    );
  }

  const isLocationPermitted = await getLocationPermission();
  const isBackPermitted = await BackgroundFetch.getStatusAsync();
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    LOCATION_TASK_NAME
  );
  if (
    isLocationPermitted &&
    isBackPermitted === BackgroundFetch.Status.Available &&
    !isRegistered
  ) {
    await startLocationUpdates();
  }
};

const initTimerTask = async (): Promise<void> => {
  if (!TaskManager.isTaskDefined(TIMER_TASK)) {
    TaskManager.defineTask(
      TIMER_TASK,
      // eslint-disable-next-line
      // @ts-ignore
      ({ error }) => {
        if (error) {
          console.error(error);
        }
        makeTimerNotifications();
      }
    );
  }

  const isLocationPermitted = await getTimerPermission();
  const isBackPermitted = await BackgroundFetch.getStatusAsync();
  const isRegistered = await TaskManager.isTaskRegisteredAsync(TIMER_TASK);
  if (
    isLocationPermitted &&
    isBackPermitted === BackgroundFetch.Status.Available &&
    !isRegistered
  ) {
    const timerDuration = await getTimerDuration();
    BackgroundFetch.registerTaskAsync(TIMER_TASK, {
      minimumInterval: timerDuration * 60000,
    });
  }
};

// https://github.com/expo/expo/issues/3582
export const initTask = async (): Promise<void> => {
  await Promise.all([initLocationTask, initTimerTask]);
};
