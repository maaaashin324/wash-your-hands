import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

export type GetNecessaryPermissions = {
  granted: boolean;
  detail: {
    [key: string]: boolean;
  };
};

const IS_TIMER_GRANTED = 'IS_TIMER_GRANTED';

export default class PermissionService {
  static getLocationPermission = async (): Promise<boolean> => {
    const { granted } = await Permissions.getAsync(Permissions.LOCATION);
    return granted;
  };

  static askLocationPermission = async (): Promise<boolean> => {
    const { granted } = await Permissions.askAsync(Permissions.LOCATION);
    return granted;
  };

  static getNotificationPermission = async (): Promise<boolean> => {
    const { granted } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    return granted;
  };

  static askNotificationPermission = async (): Promise<boolean> => {
    const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    return granted;
  };

  static getTimerPermission = async (): Promise<boolean> => {
    const grantedJSON = await AsyncStorage.getItem(IS_TIMER_GRANTED);
    if (!grantedJSON) {
      return false;
    }
    return JSON.parse(grantedJSON);
  };

  static setTimerPermission = async (granted: boolean): Promise<void> => {
    await AsyncStorage.setItem(IS_TIMER_GRANTED, JSON.stringify(granted));
  };

  // https://docs.expo.io/versions/latest/sdk/permissions/
  static getNecessaryPermissions = async (): Promise<
    GetNecessaryPermissions
  > => {
    const isLocationPermitted = await PermissionService.getLocationPermission();
    const isNotificationPermitted = await PermissionService.getNotificationPermission();
    return {
      granted: isLocationPermitted && isNotificationPermitted,
      detail: {
        [Permissions.LOCATION]: isLocationPermitted,
        [Permissions.NOTIFICATIONS]: isNotificationPermitted,
      },
    };
  };
}
