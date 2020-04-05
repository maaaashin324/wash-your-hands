import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import i18n from 'i18n-js';

const setLastTimeNotification = async (): Promise<void> => {
  await AsyncStorage.setItem(
    'lastNotificationTime',
    JSON.stringify(Date.now())
  );
};

export const getLastTimeNotification = async (): Promise<number> => {
  const result = await AsyncStorage.getItem('lastNotificationTime');
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

// eslint-disable-next-line
export const makeNotificationForTest = async () => {
  await Notifications.presentLocalNotificationAsync({
    title: i18n.t('notification:testTitle'),
    body: i18n.t('notification:testBody'),
  });
  await setLastTimeNotification();
};

export const getTimerDuration = async (): Promise<number> => {
  const result = await AsyncStorage.getItem('timerDuration');
  if (!result) {
    return 30;
  }
  return JSON.parse(result);
};

export const setTimerDuration = async (duration: number): Promise<void> => {
  await AsyncStorage.setItem('timerDuration', JSON.stringify(duration));
};
