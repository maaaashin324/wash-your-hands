import { AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Locations from 'expo-location';
import { LOCATION_TASK_NAME, STORAGE_KEYS } from '@/constants';
import { startLocationUpdates } from './location';
import {
  getTimerDurationByMinutes,
  makeLocationNotification,
  makeTimerNotification,
  setLastTimeNotification,
} from './notifications';
import { getLocationPermission } from './permissions';

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
      await makeLocationNotification(locations);
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

// https://github.com/expo/expo/issues/3582#issuecomment-480820345
const initTimerTask = async (): Promise<void> => {
  const currentIntervalID = await AsyncStorage.getItem(STORAGE_KEYS.IntervalID);
  if (currentIntervalID) {
    const IDTobeCleared = JSON.parse(currentIntervalID);
    clearInterval(IDTobeCleared);
  }
  const timerDurationByMinutes = await getTimerDurationByMinutes();
  const intervalID = setInterval(() => {
    makeTimerNotification();
  }, timerDurationByMinutes * 60000);
  await AsyncStorage.setItem(
    STORAGE_KEYS.IntervalID,
    JSON.stringify(intervalID)
  );
};

export const defineTask = (): void => {
  defineLocationTask();
};

export const initTask = async (): Promise<void> => {
  await TaskManager.unregisterAllTasksAsync();
  await initTimerTask();
  await initLocationTask();
  await BackgroundFetch.setMinimumIntervalAsync(60);
};

export const restartTimerTask = async (): Promise<void> => {
  // Since you need to make a notification by duration after now, you need to execute this function.
  await setLastTimeNotification();
  await initTimerTask();
};
