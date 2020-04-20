import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';
import StorageKeys from '@constants/storage';

export interface GetNecessaryPermissions {
  granted: boolean;
  detail: {
    [key: string]: boolean;
  };
}

// eslint-disable-next-line
export const getNecessaryPermissions = async (): Promise<
  GetNecessaryPermissions
> => {
  const { granted, permissions } = await Permissions.getAsync(
    Permissions.LOCATION,
    Permissions.NOTIFICATIONS
  );
  return {
    granted,
    detail: {
      [Permissions.LOCATION]: permissions[Permissions.LOCATION].granted,
      [Permissions.NOTIFICATIONS]:
        permissions[Permissions.NOTIFICATIONS].granted,
    },
  };
};

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
  const grantedJSON = await AsyncStorage.getItem(StorageKeys.IsTimerGranted);
  if (!grantedJSON) {
    return false;
  }
  return JSON.parse(grantedJSON);
};

export const setTimerPermission = async (granted: boolean): Promise<void> => {
  await AsyncStorage.setItem(
    StorageKeys.IsTimerGranted,
    JSON.stringify(granted)
  );
};
