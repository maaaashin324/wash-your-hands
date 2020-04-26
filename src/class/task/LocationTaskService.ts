import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Locations from 'expo-location';
import LocationService from '@/class/LocationService';
import NotificationService from '@/class/NotificationService';
import PermissionService from '@/class/PermissionService';

export default class LocationTaskService {
  defineTask = (): void => {
    TaskManager.defineTask(
      LocationService.getTaskName(),
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
        await NotificationService.makeLocationNotification(locations);
      }
    );
  };

  // https://github.com/expo/expo/issues/3582#issuecomment-480820345
  initLocationTask = async (): Promise<void> => {
    const isLocationPermitted = await PermissionService.getLocationPermission();
    const isBackPermitted = await BackgroundFetch.getStatusAsync();
    if (
      isLocationPermitted &&
      isBackPermitted === BackgroundFetch.Status.Available
    ) {
      await LocationService.startLocationUpdates();
    }
  };
}
