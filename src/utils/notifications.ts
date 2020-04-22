import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Locations from 'expo-location';
import i18n from 'i18n-js';
import StorageKeys from '@constants/storage';
import { AlertFrequencyType } from '@types';
import { getTimerPermission } from './permissions';
import { isMovedFarEnough } from './location';
import { setFrequency } from './frequency';

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

const storeFrequency = async (): Promise<void> => {
  const dataSet = await AsyncStorage.getItem(StorageKeys.AlertFrequency);
  let frequency: AlertFrequencyType = {};
  if (dataSet) {
    frequency = JSON.parse(dataSet);
  }
  await setFrequency({
    frequency,
    dataTobeSet: Date.now() + 60000,
    type: StorageKeys.AlertFrequency,
  });
};

export const makeLocationNotification = async (
  locations: Locations.LocationData[]
): Promise<void> => {
  if (!isMovedFarEnough(locations)) {
    return;
  }
  await Notifications.scheduleLocalNotificationAsync(
    {
      title: i18n.t('notification:title'),
      body: i18n.t('notification:body'),
    },
    { time: Date.now() + 60000 }
  );
  await storeFrequency();
};

// https://github.com/expo/expo/pull/7035#discussion_r390141822
// We CANNOT use presentLocalNotificationAsync for ios
export const makeTimerNotification = async (): Promise<boolean> => {
  const granted = await getTimerPermission();
  if (!granted) {
    return false;
  }
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
  await storeFrequency();
  return true;
};
