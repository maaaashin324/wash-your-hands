import * as Permissions from 'expo-permissions';

export const getLocationPermission = async (): Promise<boolean> => {
  const { granted } = await Permissions.getAsync(Permissions.LOCATION);
  return granted;
};

export const askLocationPermission = async (): Promise<boolean> => {
  const { granted } = await Permissions.askAsync(Permissions.LOCATION);
  return granted;
};
