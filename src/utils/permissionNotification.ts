import * as Permissions from 'expo-permissions';

export const getNotificationPermission = async (): Promise<boolean> => {
  const { granted } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  return granted;
};

export const askNotificationPermission = async (): Promise<boolean> => {
  const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return granted;
};
