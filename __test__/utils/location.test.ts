import * as Location from 'expo-location';
import { hasStartedLocationUpdates } from '@utils/location';
import { GET_LOCATION_TASK } from '@constants/task';

jest.mock('expo-location', () => {
  return {
    hasStartedLocationUpdatesAsync: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(true);
      });
    }),
  };
});

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

  test('should return true', async () => {
    const result = await hasStartedLocationUpdates();

    expect(result).toBe(true);
    expect(spyOnHasStartedLocationUpdatesAsync).toHaveBeenCalledTimes(1);
    expect(spyOnHasStartedLocationUpdatesAsync).toHaveBeenCalledWith(
      GET_LOCATION_TASK
    );
  });
});
