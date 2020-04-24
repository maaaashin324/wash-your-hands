import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Locations from 'expo-location';
import i18n from 'i18n-js';
import {
  DEFAULT_TIMER_INTERVAL,
  SCHEDULE_NOTIFICATION_BUFFER,
  STORAGE_KEYS,
} from '@/constants';
import { getTimerPermission } from './permissions';
import { isMovedFarEnough } from './location';
import { storeFrequency, storeFrequencies } from './frequency';

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

export const getTimerDurationByHours = async (): Promise<number> => {
  const result = await AsyncStorage.getItem(STORAGE_KEYS.TimeDuration);
  if (!result) {
    return DEFAULT_TIMER_INTERVAL;
  }
  return JSON.parse(result);
};

export const setTimerDurationByHours = async (
  duration: number
): Promise<void> => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.TimeDuration,
    JSON.stringify(duration)
  );
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
  const timerDurationByHours = await getTimerDurationByHours();
  let beforeTime = lastTimeNotification;
  if (beforeTime < Date.now()) {
    beforeTime = Date.now();
  }
  const timerDuration = timerDurationByHours * 3600000;
  for (let i = 0; i < 10; i += 1) {
    const currentTime = beforeTime + timerDuration;
    timer.push(currentTime);
    beforeTime = currentTime;
  }
  await Promise.all(
    timer.map(async (time) => {
      await Notifications.scheduleLocalNotificationAsync(
        {
          title: i18n.t('notification:title'),
          body: i18n.t('notification:body'),
        },
        { time }
      );
    })
  );
  await storeFrequencies(timer);
  await setLastTimeNotification(timer[timer.length - 1]);
  return true;
};
