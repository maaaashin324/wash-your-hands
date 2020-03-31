import * as Permissions from 'expo-permissions';

export const getNotificationPermission = async (): Promise<string> => {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  return status;
};

export const askNotificationPermission = async (): Promise<string> => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return status;
};

export const enableNotificationPermission = async (
  canAsk: boolean,
  status?: string
): Promise<boolean> => {
  let currentStatus = '';
  if (!status) {
    currentStatus = await getNotificationPermission();
  }
  if (currentStatus !== 'granted' && canAsk) {
    const result = await askNotificationPermission();
    await enableNotificationPermission(false, result);
  }
  if (currentStatus !== 'granted' && !canAsk) {
    return false;
  }
  return true;
};
