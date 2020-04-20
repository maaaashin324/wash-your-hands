import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import i18n from 'i18n-js';
import StorageKeys from '@constants/storage';

const setLastTimeNotification = async (): Promise<void> => {
  await AsyncStorage.setItem(
    StorageKeys.LastNotificationTime,
    JSON.stringify(Date.now())
  );
};

export const getLastTimeNotification = async (): Promise<number> => {
  const result = await AsyncStorage.getItem(StorageKeys.LastNotificationTime);
  if (!result) {
    return 0;
  }
  return JSON.parse(result);
};

// eslint-disable-next-line
export const makeNotificationForWash = async () => {
  await Notifications.presentLocalNotificationAsync({
    title: i18n.t('notification:title'),
    body: i18n.t('notification:body'),
  });
  await setLastTimeNotification();
};

export const getTimerDuration = async (): Promise<number> => {
  const result = await AsyncStorage.getItem(StorageKeys.TimeDuration);
  if (!result) {
    return 30;
  }
  return JSON.parse(result);
};

export const setTimerDuration = async (duration: number): Promise<void> => {
  await AsyncStorage.setItem(
    StorageKeys.TimeDuration,
    JSON.stringify(duration)
  );
};
