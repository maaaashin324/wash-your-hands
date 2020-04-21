import { AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { AlertFrequencyType } from '@types';
import { LOCATION_TASK_NAME, TIMER_TASK, StorageKeys } from '@/constants';
import { setFrequency } from './frequency';
import { startLocationUpdates, isMovedFarEnough } from './location';
import { makeNotificationForWash, getTimerDuration } from './notifications';
import { getTimerPermission, getLocationPermission } from './permissions';

export const makeNotifications = async (locations): Promise<void> => {
  const result = isMovedFarEnough(locations);
  if (result) {
    await makeNotificationForWash();

    const dataSet = await AsyncStorage.getItem(StorageKeys.AlertFrequency);
    let frequency: AlertFrequencyType = {};
    if (dataSet) {
      frequency = JSON.parse(dataSet);
    }
    await setFrequency({
      frequency,
      dataTobeSet: Date.now(),
      type: StorageKeys.AlertFrequency,
    });
  }
};

export const makeTimerNotifications = async (): Promise<number> => {
  const granted = await getTimerPermission();
  if (!granted) {
    return BackgroundFetch.Result.NoData;
  }
  await makeNotificationForWash();
  return BackgroundFetch.Result.NewData;
};

const defineLocationTask = (): void => {
  if (!TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
    TaskManager.defineTask(
      LOCATION_TASK_NAME,
      async ({ data: { locations }, error }) => {
        if (error) {
          return;
        }
        await makeNotifications(locations);
      }
    );
  }
};

// https://github.com/expo/expo/issues/3582#issuecomment-480820345
const initLocationTask = async (): Promise<void> => {
  const isLocationPermitted = await getLocationPermission();
  const isBackPermitted = await BackgroundFetch.getStatusAsync();
  if (
    isLocationPermitted &&
    isBackPermitted === BackgroundFetch.Status.Available
  ) {
    await startLocationUpdates();
  }
};

const defineTimerTask = (): void => {
  if (!TaskManager.isTaskDefined(TIMER_TASK)) {
    TaskManager.defineTask(TIMER_TASK, async ({ error }) => {
      if (error) {
        return BackgroundFetch.Result.Failed;
      }
      try {
        const result = await makeTimerNotifications();
        return !result
          ? BackgroundFetch.Result.NoData
          : BackgroundFetch.Result.NewData;
      } catch (error) {
        return BackgroundFetch.Result.Failed;
      }
    });
  }
};

// https://github.com/expo/expo/issues/3582#issuecomment-480820345
const initTimerTask = async (): Promise<void> => {
  const isBackPermitted = await BackgroundFetch.getStatusAsync();
  if (isBackPermitted === BackgroundFetch.Status.Available) {
    const timerDuration = await getTimerDuration();
    await BackgroundFetch.registerTaskAsync(TIMER_TASK, {
      minimumInterval: timerDuration * 60,
    });
  }
};

export const defineTask = (): void => {
  defineLocationTask();
  defineTimerTask();
};

export const initTask = async (): Promise<void> => {
  await TaskManager.unregisterAllTasksAsync();
  await initTimerTask();
  await initLocationTask();
};

export const restartTimerTask = async (): Promise<void> => {
  await BackgroundFetch.unregisterTaskAsync(TIMER_TASK);
  await initTimerTask();
};
