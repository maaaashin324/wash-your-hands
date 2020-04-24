import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';
import STORAGE_KEYS from '@constants/storage';

export const getLocationPermission = async (): Promise<boolean> => {
  const { granted } = await Permissions.getAsync(Permissions.LOCATION);
  return granted;
};

export const askLocationPermission = async (): Promise<boolean> => {
  const { granted } = await Permissions.askAsync(Permissions.LOCATION);
  return granted;
};

export const getNotificationPermission = async (): Promise<boolean> => {
  const { granted } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  return granted;
};

export const askNotificationPermission = async (): Promise<boolean> => {
  const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return granted;
};

export const getTimerPermission = async (): Promise<boolean> => {
  const grantedJSON = await AsyncStorage.getItem(STORAGE_KEYS.IS_TIMER_GRANTED);
  if (!grantedJSON) {
    return false;
  }
  return JSON.parse(grantedJSON);
};

export const setTimerPermission = async (granted: boolean): Promise<void> => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.IS_TIMER_GRANTED,
    JSON.stringify(granted)
  );
};

export interface GetNecessaryPermissions {
  granted: boolean;
  detail: {
    [key: string]: boolean;
  };
}

// https://docs.expo.io/versions/latest/sdk/permissions/
export const getNecessaryPermissions = async (): Promise<
  GetNecessaryPermissions
> => {
  const isLocationPermitted = await getLocationPermission();
  const isNotificationPermitted = await getNotificationPermission();
  return {
    granted: isLocationPermitted && isNotificationPermitted,
    detail: {
      [Permissions.LOCATION]: isLocationPermitted,
      [Permissions.NOTIFICATIONS]: isNotificationPermitted,
    },
  };
};
