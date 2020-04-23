import { Notifications } from 'expo';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Locations from 'expo-location';
import { LOCATION_TASK_NAME, TIMER_TASK_NAME } from '@/constants';
import { startLocationUpdates } from './location';
import {
  makeLocationNotification,
  makeTimerNotification,
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

const defineTimerTask = (): void => {
  TaskManager.defineTask(
    TIMER_TASK_NAME,
    // https://github.com/expo/expo/blob/sdk-37/packages/expo-task-manager/src/TaskManager.ts
    // Since taskExecutor is invoked with await in line 182, this should be return promise.
    // eslint-disable-next-line
    async ({ error }: TaskManager.TaskManagerTaskBody) => {
      if (error) {
        return BackgroundFetch.Result.Failed;
      }
      const result = await makeTimerNotification();
      return !result
        ? BackgroundFetch.Result.NoData
        : BackgroundFetch.Result.NewData;
    }
  );
};

// https://github.com/expo/expo/issues/3582#issuecomment-480820345
const initTimerTask = async (): Promise<void> => {
  const isBackPermitted = await BackgroundFetch.getStatusAsync();
  if (isBackPermitted === BackgroundFetch.Status.Available) {
    await makeTimerNotification();
    await BackgroundFetch.registerTaskAsync(TIMER_TASK_NAME, {
      minimumInterval: 60,
    });
  }
};

export const defineTask = (): void => {
  defineLocationTask();
  defineTimerTask();
};

export const initTask = async (): Promise<void> => {
  await initTimerTask();
  await initLocationTask();
  await BackgroundFetch.setMinimumIntervalAsync(60);
};

export const restartTimerTask = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await initTimerTask();
};
