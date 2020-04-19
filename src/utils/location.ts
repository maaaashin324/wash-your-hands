import * as Location from 'expo-location';
import { LOCATION_TASK_NAME } from '@constants/task';
import { getLocationPermission } from './permissions';

export const hasStartedLocationUpdates = async (): Promise<boolean> => {
  const result = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TASK_NAME
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
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
  });
};

// https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
/**
 * measureMeters calculate meters by two points of latitude and longitude
 * @param lat1 Latitude of X
 * @param lon1 Longitude of X
 * @param lat2 Latitude of Y
 * @param lon2 Longitude of Y
 * @returns {Number} meters
 */
export const measureMeters = (lat1, lon1, lat2, lon2): number => {
  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000; // meters
};

export const isMovedFarEnough = (
  locations: Location.LocationData[]
): boolean => {
  const [firstLocation] = locations;
  const lastLocation = locations[locations.length - 1];
  // This speed is meter per second
  if (lastLocation.coords.speed > 0) {
    return false;
  }
  const meters = measureMeters(
    firstLocation.coords.latitude,
    firstLocation.coords.longitude,
    lastLocation.coords.latitude,
    lastLocation.coords.longitude
  );
  if (meters < 500) {
    return false;
  }
  return true;
};
