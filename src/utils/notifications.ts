import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Locations from 'expo-location';
import i18n from 'i18n-js';
import {
  DEFAULT_TIMER_INTERVAL,
  SCHEDULE_NOTIFICATION_BUFFER,
  STORAGE_KEYS,
} from '@/constants';
import { AlertFrequencyType } from '@types';
import { getTimerPermission } from './permissions';
import { isMovedFarEnough } from './location';
import { setFrequency } from './frequency';

export const setLastTimeNotification = async (time: number): Promise<void> => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.LastNotificationTime,
    JSON.stringify(time)
  );
};

export const getLastTimeNotification = async (): Promise<number> => {
  const result = await AsyncStorage.getItem(STORAGE_KEYS.LastNotificationTime);
  if (!result) {
    return Date.now();
  }
  return JSON.parse(result);
};

export const getTimerDurationByMinutes = async (): Promise<number> => {
  const result = await AsyncStorage.getItem(STORAGE_KEYS.TimeDuration);
  if (!result) {
    return DEFAULT_TIMER_INTERVAL;
  }
  return JSON.parse(result);
};

export const setTimerDurationByMinutes = async (
  duration: number
): Promise<void> => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.TimeDuration,
    JSON.stringify(duration)
  );
};

const storeFrequency = async (dataTobeSet: number): Promise<void> => {
  const dataSet = await AsyncStorage.getItem(STORAGE_KEYS.AlertFrequency);
  let frequency: AlertFrequencyType = {};
  if (dataSet) {
    frequency = JSON.parse(dataSet);
  }
  await setFrequency({
    frequency,
    dataTobeSet,
    type: STORAGE_KEYS.AlertFrequency,
  });
};

export const makeLocationNotification = async (
  locations: Locations.LocationData[]
): Promise<void> => {
  if (!isMovedFarEnough(locations)) {
    return;
  }
  const time = Date.now() + SCHEDULE_NOTIFICATION_BUFFER;
  await Notifications.scheduleLocalNotificationAsync(
    {
      title: i18n.t('notification:title'),
      body: i18n.t('notification:body'),
    },
    { time }
  );
  await storeFrequency(time);
};

// https://github.com/expo/expo/pull/7035#discussion_r390141822
// We CANNOT use presentLocalNotificationAsync for ios
export const makeTimerNotification = async (): Promise<boolean> => {
  const granted = await getTimerPermission();
  if (!granted) {
    return false;
  }
  const timer = [];
  const lastTimeNotification = await getLastTimeNotification();
  const timerDurationByMinutes = await getTimerDurationByMinutes();
  let beforeTime = lastTimeNotification;
  const timerDuration = timerDurationByMinutes * 60000;
  for (let i = 0; i < 100; i += 1) {
    const currentTime = beforeTime + timerDuration;
    timer.push(currentTime);
    beforeTime = currentTime;
  }
  await Promise.all(
    timer.map(async (time) => {
      if (!time) {
        return;
      }
      await Notifications.scheduleLocalNotificationAsync(
        {
          title: i18n.t('notification:title'),
          body: i18n.t('notification:body'),
        },
        { time }
      );
    })
  );
  await setLastTimeNotification(timer[timer.length - 1]);
  return true;
};
