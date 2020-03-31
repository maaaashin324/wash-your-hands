import * as Location from 'expo-location';
import { GET_LOCATION_TASK } from '@constants/task';

const hasStartedLocationUpdates = async (): Promise<boolean> => {
  const result = await Location.hasStartedLocationUpdatesAsync(
    GET_LOCATION_TASK
  );
  return result;
};

export default hasStartedLocationUpdates;
