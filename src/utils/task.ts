import { AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Locations from 'expo-location';
import { AlertFrequencyType } from '@types';
import { LOCATION_TASK_NAME, TIMER_TASK, StorageKeys } from '@/constants';
import { setFrequency } from './frequency';
import { startLocationUpdates, isMovedFarEnough } from './location';
import { makeNotificationForWash } from './notifications';
import { getTimerPermission, getLocationPermission } from './permissions';

export const makeNotifications = async (
  locations: Locations.LocationData[]
): Promise<void> => {
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

export const makeTimerNotifications = async (): Promise<boolean> => {
  const granted = await getTimerPermission();
  if (!granted) {
    return false;
  }
  await makeNotificationForWash();
  return true;
};

const defineLocationTask = (): void => {
  TaskManager.defineTask(
    LOCATION_TASK_NAME,
    // https://github.com/expo/expo/blob/sdk-37/packages/expo-task-manager/src/TaskManager.ts
    // Since taskExecutor is invoked with await in line 182, this should be return promise.
    // eslint-disable-next-line
    async ({
      data,
      error,
    }: TaskManager.TaskManagerTaskBody & {
      data: { locations: Locations.LocationData[] };
    }) => {
      const { locations }: { locations: Locations.LocationData[] } = data;
      if (error) {
        return;
      }
      await makeNotifications(locations);
    }
  );
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
  TaskManager.defineTask(
    TIMER_TASK,
    // https://github.com/expo/expo/blob/sdk-37/packages/expo-task-manager/src/TaskManager.ts
    // Since taskExecutor is invoked with await in line 182, this should be return promise.
    // eslint-disable-next-line
    async ({ error: taskManagerError }: TaskManager.TaskManagerTaskBody) => {
      if (taskManagerError) {
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
    }
  );
};

// https://github.com/expo/expo/issues/3582#issuecomment-480820345
const initTimerTask = async (): Promise<void> => {
  const isBackPermitted = await BackgroundFetch.getStatusAsync();
  if (isBackPermitted === BackgroundFetch.Status.Available) {
    await BackgroundFetch.registerTaskAsync(TIMER_TASK);
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
