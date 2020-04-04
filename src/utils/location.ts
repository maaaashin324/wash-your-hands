import * as Location from 'expo-location';
import { GET_LOCATION_TASK } from '@constants/task';
import { getLocationPermission } from './permissions';

const hasStartedLocationUpdates = async (): Promise<boolean> => {
  const result = await Location.hasStartedLocationUpdatesAsync(
    GET_LOCATION_TASK
  );
  return result;
};

export const startLocationUpdates = async (): Promise<void> => {
  const result = await hasStartedLocationUpdates();
  if (!result) {
    return;
  }
  const status = await getLocationPermission();
  if (!status) {
    return;
  }
  await Location.startLocationUpdatesAsync('recordLocation', {
    accuracy: Location.Accuracy.Balanced,
  });
};

export default startLocationUpdates;
