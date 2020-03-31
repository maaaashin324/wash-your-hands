import * as Permissions from 'expo-permissions';

// eslint-disable-next-line
export const getNecessaryPermissions = async (): Promise<boolean> => {
  const { status } = await Permissions.getAsync(
    Permissions.LOCATION,
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    return false;
  }
  return true;
};
