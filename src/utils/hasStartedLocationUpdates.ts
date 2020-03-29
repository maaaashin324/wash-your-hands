import * as Location from 'expo-location';

const hasStartedLocationUpdates = async (): Promise<boolean> => {
  const result = await Location.hasStartedLocationUpdatesAsync(
    'recordLocation'
  );
  return result;
};

export default hasStartedLocationUpdates;
