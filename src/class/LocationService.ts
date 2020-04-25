import { AsyncStorage, Platform } from 'react-native';
import * as Location from 'expo-location';
import PermissionService from './PermissionService';

class LocationService {
  private options: Location.LocationTaskOptions;

  private storageKey = 'LOCATIONS';

  private taskName = 'LOCATION_TASK_NAME';

  constructor() {
    this.options = {
      accuracy: Location.Accuracy.Balanced,
      distanceInterval: 100,
      deferredUpdatesDistance: 100,
      deferredUpdatesInterval: 60000,
    };
    if (Platform.OS === 'ios') {
      this.options.showsBackgroundLocationIndicator = true;
      this.options.pausesUpdatesAutomatically = false;
      this.options.activityType = Location.ActivityType.Other;
    } else {
      this.options.timeInterval = 60000;
    }
  }

  hasStartedLocationUpdates = async (): Promise<boolean> => {
    const result = await Location.hasStartedLocationUpdatesAsync(this.taskName);
    return result;
  };

  startLocationUpdates = async (): Promise<void> => {
    const result = await this.hasStartedLocationUpdates();
    if (!result) {
      return;
    }
    const status = await PermissionService.getLocationPermission();
    if (!status) {
      return;
    }
    await Location.startLocationUpdatesAsync(this.taskName, this.options);
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
  static measureMeters = (lat1, lon1, lat2, lon2): number => {
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

  getStorage = async (): Promise<Location.LocationData[]> => {
    const result = await AsyncStorage.getItem(this.storageKey);
    if (!result) {
      return [];
    }
    return JSON.parse(result);
  };

  removeStorage = async (): Promise<void> => {
    await AsyncStorage.removeItem(this.storageKey);
  };

  setStorage = async (locations: Location.LocationData[]): Promise<void> => {
    await AsyncStorage.setItem(this.storageKey, JSON.stringify(locations));
  };

  isMovedFarEnough = async (
    locations: Location.LocationData[]
  ): Promise<boolean> => {
    const lastLocation = locations[locations.length - 1];
    // This speed is meter per second
    if (lastLocation.coords.speed > 0) {
      await this.setStorage(locations);
      return false;
    }

    const locationsStored = await this.getStorage();
    locationsStored.push(...locations);
    let meters = 0;
    for (let i = 0; i < locations.length - 1; i += 1) {
      meters += LocationService.measureMeters(
        locations[i].coords.latitude,
        locations[i].coords.longitude,
        locations[i + 1].coords.latitude,
        locations[i + 1].coords.longitude
      );
    }
    if (meters < 500) {
      await this.setStorage(locationsStored);
      return false;
    }
    await this.removeStorage();
    return true;
  };
}

const locationService = new LocationService();
export default locationService;
