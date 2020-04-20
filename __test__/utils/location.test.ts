import * as Location from 'expo-location';
import {
  hasStartedLocationUpdates,
  startLocationUpdates,
  isMovedFarEnough,
} from '@utils/location';
import { LOCATION_TASK_NAME } from '@constants/task';

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

    test('should execute startLocationUpdatesAsync', async () => {
      await startLocationUpdates();

      expect(spyOnStartLocationUpdatesAsync).toHaveBeenCalledTimes(1);
      expect(spyOnStartLocationUpdatesAsync).toHaveBeenCalledWith(
        LOCATION_TASK_NAME,
        {
          accuracy: Location.Accuracy.Balanced,
        }
      );
    });
  });

  describe('isMovedFarEnough', () => {
    test('should return true when you move far enough and stop', () => {
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

      const result = isMovedFarEnough([xPoint, yPoint]);
      expect(result).toBe(true);
    });

    test('should return false when you move far enough and do not stop', () => {
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

      const result = isMovedFarEnough([xPoint, yPoint]);
      expect(result).toBe(false);
    });

    test('should return false when you do not move far enough and stop', () => {
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

      const result = isMovedFarEnough([xPoint, yPoint]);
      expect(result).toBe(false);
    });
  });
});
