import * as Location from 'expo-location';

const startLocationUpdates = async (): Promise<void> => {
  await Location.startLocationUpdatesAsync('recordLocation', {
    accuracy: Location.Accuracy.Balanced,
  });
};

export default startLocationUpdates;
