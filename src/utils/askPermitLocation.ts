import * as Permissions from 'expo-permissions';

export const getLocationPermission = async (): Promise<string> => {
  const { status } = await Permissions.getAsync(Permissions.LOCATION);
  return status;
};

export const askLocationPermission = async (): Promise<string> => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  return status;
};

export const enableLocationPermission = async (
  canAsk: boolean,
  status?: string
): Promise<boolean> => {
  let currentStatus = '';
  if (!status) {
    currentStatus = await getLocationPermission();
  }
  if (currentStatus !== 'granted' && canAsk) {
    const result = await askLocationPermission();
    await enableLocationPermission(false, result);
  }
  if (currentStatus !== 'granted' && !canAsk) {
    return false;
  }
  return true;
};
