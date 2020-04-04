import * as Location from 'expo-location';
import hasStartedLocationUpdates from './hasStartedLocationUpdates';
import { getLocationPermission } from './permissions';

const startLocationUpdates = async (): Promise<void> => {
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
