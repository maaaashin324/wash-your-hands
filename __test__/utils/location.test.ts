import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import {
  hasStartedLocationUpdates,
  startLocationUpdates,
  isMovedFarEnough,
} from '@utils/location';
import { LOCATION_TASK_NAME } from '@/constants/task';

jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
    getItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
    removeItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
  },
  Dimensions: {
    get: jest.fn(() => ({
      width: 0,
      height: 0,
    })),
  },
  Platform: {
    OS: 'ios',
  },
}));
jest.mock('expo-location', () => {
  return {
    hasStartedLocationUpdatesAsync: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(true);
      });
    }),
    startLocationUpdatesAsync: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
    Accuracy: {
      Balanced: 3,
    },
    ActivityType: {
      Other: 'other',
    },
  };
});
jest.mock('@/utils/permissions', () => {
  return {
    getLocationPermission: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(true);
      });
    }),
  };
});

describe('Location', () => {
  describe('hasStartedLocationUpdatesAsync', () => {
    let spyOnHasStartedLocationUpdatesAsync;

    beforeEach(() => {
      spyOnHasStartedLocationUpdatesAsync = jest.spyOn(
        Location,
        'hasStartedLocationUpdatesAsync'
      );
    });

    afterEach(() => {
      spyOnHasStartedLocationUpdatesAsync.mockClear();
    });

    test('should return true since mock always returns true', async () => {
      const result = await hasStartedLocationUpdates();

      expect(result).toBe(true);
      expect(spyOnHasStartedLocationUpdatesAsync).toHaveBeenCalledTimes(1);
      expect(spyOnHasStartedLocationUpdatesAsync).toHaveBeenCalledWith(
        LOCATION_TASK_NAME
      );
    });
  });

  describe('startLocationUpdates', () => {
    let spyOnStartLocationUpdatesAsync;

    beforeEach(() => {
      spyOnStartLocationUpdatesAsync = jest.spyOn(
        Location,
        'startLocationUpdatesAsync'
      );
    });

    afterEach(() => {
      spyOnStartLocationUpdatesAsync.mockClear();
    });

    test('should execute startLocationUpdatesAsync in ios', async () => {
      await startLocationUpdates();

      expect(spyOnStartLocationUpdatesAsync).toHaveBeenCalledTimes(1);
      expect(spyOnStartLocationUpdatesAsync).toHaveBeenCalledWith(
        LOCATION_TASK_NAME,
        {
          accuracy: Location.Accuracy.Balanced,
          activityType: 'other',
          deferredUpdatesDistance: 100,
          deferredUpdatesInterval: 60000,
          distanceInterval: 100,
          pausesUpdatesAutomatically: false,
          showsBackgroundLocationIndicator: true,
        }
      );
    });
  });

  describe('isMovedFarEnough', () => {
    let spyOnAsyncStorageGetItem;
    let spyOnAsyncStorageRemoveItem;
    let spyOnAsyncStorageSetItem;

    beforeEach(() => {
      spyOnAsyncStorageGetItem = jest.spyOn(AsyncStorage, 'getItem');
      spyOnAsyncStorageRemoveItem = jest.spyOn(AsyncStorage, 'removeItem');
      spyOnAsyncStorageSetItem = jest.spyOn(AsyncStorage, 'setItem');
    });

    afterEach(() => {
      spyOnAsyncStorageGetItem.mockClear();
      spyOnAsyncStorageRemoveItem.mockClear();
      spyOnAsyncStorageSetItem.mockClear();
    });

    test('should return true when you move far enough and stop', async () => {
      const xPoint: Location.LocationData = {
        coords: {
          latitude: 35.5675675,
          longitude: 139.7222422,
          altitude: 0,
          accuracy: 2,
          heading: 0,
          speed: 0,
        },
        timestamp: Date.now(),
      };
      const yPoint: Location.LocationData = {
        coords: {
          latitude: 31.5836893,
          longitude: 130.5395267,
          altitude: 0,
          accuracy: 2,
          heading: 0,
          speed: 0,
        },
        timestamp: Date.now(),
      };

      const result = await isMovedFarEnough([xPoint, yPoint]);
      expect(spyOnAsyncStorageGetItem).toHaveBeenCalledTimes(1);
      expect(spyOnAsyncStorageRemoveItem).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    test('should return false when you move far enough and do not stop', async () => {
      const xPoint: Location.LocationData = {
        coords: {
          latitude: 35.5675675,
          longitude: 139.7222422,
          altitude: 0,
          accuracy: 2,
          heading: 0,
          speed: 50,
        },
        timestamp: Date.now(),
      };
      const yPoint: Location.LocationData = {
        coords: {
          latitude: 31.5836893,
          longitude: 130.5395267,
          altitude: 0,
          accuracy: 2,
          heading: 0,
          speed: 50,
        },
        timestamp: Date.now(),
      };

      const result = await isMovedFarEnough([xPoint, yPoint]);
      expect(spyOnAsyncStorageSetItem).toHaveBeenCalledTimes(1);
      expect(result).toBe(false);
    });

    test('should return false when you do not move far enough and stop', async () => {
      const xPoint: Location.LocationData = {
        coords: {
          latitude: 35.5675675,
          longitude: 139.7222422,
          altitude: 0,
          accuracy: 2,
          heading: 0,
          speed: 0,
        },
        timestamp: Date.now(),
      };
      const yPoint: Location.LocationData = {
        coords: {
          latitude: 35.5675676,
          longitude: 139.7222423,
          altitude: 0,
          accuracy: 2,
          heading: 0,
          speed: 0,
        },
        timestamp: Date.now(),
      };

      const result = await isMovedFarEnough([xPoint, yPoint]);
      expect(spyOnAsyncStorageGetItem).toHaveBeenCalledTimes(1);
      expect(spyOnAsyncStorageSetItem).toHaveBeenCalledTimes(1);
      expect(result).toBe(false);
    });
  });
});
