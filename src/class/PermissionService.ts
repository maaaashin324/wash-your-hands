import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

export type GetNecessaryPermissions = {
  granted: boolean;
  detail: {
    [key: string]: boolean;
  };
};

const IS_TIMER_GRANTED = 'IS_TIMER_GRANTED';

class PermissionService {
  public getLocationPermission = async (): Promise<boolean> => {
    const { granted } = await Permissions.getAsync(Permissions.LOCATION);
    return granted;
  };

  public askLocationPermission = async (): Promise<boolean> => {
    const { granted } = await Permissions.askAsync(Permissions.LOCATION);
    return granted;
  };

  public getNotificationPermission = async (): Promise<boolean> => {
    const { granted } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    return granted;
  };

  public askNotificationPermission = async (): Promise<boolean> => {
    const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    return granted;
  };

  public getTimerPermission = async (): Promise<boolean> => {
    const grantedJSON = await AsyncStorage.getItem(IS_TIMER_GRANTED);
    if (!grantedJSON) {
      return false;
    }
    return JSON.parse(grantedJSON);
  };

  public setTimerPermission = async (granted: boolean): Promise<void> => {
    await AsyncStorage.setItem(IS_TIMER_GRANTED, JSON.stringify(granted));
  };

  // https://docs.expo.io/versions/latest/sdk/permissions/
  public getNecessaryPermissions = async (): Promise<
    GetNecessaryPermissions
  > => {
    const isLocationPermitted = await this.getLocationPermission();
    const isNotificationPermitted = await this.getNotificationPermission();
    return {
      granted: isLocationPermitted && isNotificationPermitted,
      detail: {
        [Permissions.LOCATION]: isLocationPermitted,
        [Permissions.NOTIFICATIONS]: isNotificationPermitted,
      },
    };
  };
}

const permissionService = new PermissionService();
export default permissionService;
