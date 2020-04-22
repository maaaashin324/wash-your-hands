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

export const getTimerDurationByMinutes = async (): Promise<number> => {
  const result = await AsyncStorage.getItem(StorageKeys.TimeDuration);
  if (!result) {
    return 30;
  }
  return JSON.parse(result);
};

export const setTimerDurationByMinutes = async (
  duration: number
): Promise<void> => {
  await AsyncStorage.setItem(
    StorageKeys.TimeDuration,
    JSON.stringify(duration)
  );
};

// https://github.com/expo/expo/pull/7035#discussion_r390141822
// We CANNOT use presentLocalNotificationAsync for ios
// eslint-disable-next-line
export const makeNotificationForWash = async () => {
  const timerDurationByMinutes = await getTimerDurationByMinutes();
  const lastNotificationTime = await getLastTimeNotification();
  let nextNotificationTime = 0;
  if (!lastNotificationTime) {
    nextNotificationTime = Date.now() + timerDurationByMinutes * 60000;
  } else {
    let calculated = lastNotificationTime + timerDurationByMinutes * 60000;
    if (calculated < Date.now()) {
      calculated = Date.now() + timerDurationByMinutes * 60000;
    }
    nextNotificationTime = calculated;
  }
  await Notifications.scheduleLocalNotificationAsync(
    {
      title: i18n.t('notification:title'),
      body: i18n.t('notification:body'),
    },
    { time: nextNotificationTime }
  );
  await setLastTimeNotification();
};
