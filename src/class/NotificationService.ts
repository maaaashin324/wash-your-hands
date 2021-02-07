import { AsyncStorage, Alert } from 'react-native';
import { Notifications } from 'expo';
import * as Locations from 'expo-location';
import i18n from 'i18n-js';
import Frequency from './Frequency';
import LocationService from './LocationService';
import PermissionService from './PermissionService';

class NotificationService {
  private defaultTimeInterval = 1;

  private lastNotificactionTimeStorageKey = 'LAST_NOTIFICATION_TIME';

  private scheduleNotificationBuffer = 10000;

  private timeDurationStorageKey = 'TIME_DURATION';

  getDefaultTimeInterval = (): number => {
    return this.defaultTimeInterval;
  };

  setLastTimeNotification = async (time: number): Promise<void> => {
    await AsyncStorage.setItem(
      this.lastNotificactionTimeStorageKey,
      JSON.stringify(time)
    );
  };

  getLastTimeNotification = async (): Promise<number> => {
    const result = await AsyncStorage.getItem(
      this.lastNotificactionTimeStorageKey
    );
    if (!result) {
      return Date.now();
    }
    return JSON.parse(result);
  };

  getTimerDurationByHours = async (): Promise<number> => {
    const result = await AsyncStorage.getItem(this.timeDurationStorageKey);
    if (!result) {
      return this.defaultTimeInterval;
    }
    return JSON.parse(result);
  };

  setTimerDurationByHours = async (duration: number): Promise<void> => {
    await AsyncStorage.setItem(
      this.timeDurationStorageKey,
      JSON.stringify(duration)
    );
  };

  makeLocationNotification = async (
    locations: Locations.LocationData[]
  ): Promise<void> => {
    const isMoved = await LocationService.isMovedFarEnough(locations);
    if (!isMoved) {
      return;
    }
    const time = Date.now() + this.scheduleNotificationBuffer;
    await Notifications.scheduleLocalNotificationAsync(
      {
        title: i18n.t('notification.title'),
        body: i18n.t('notification.body'),
      },
      { time }
    );
    await Frequency.storeAlertFrequency({
      dataTobeSet: time,
    });
  };

  // https://github.com/expo/expo/pull/7035#discussion_r390141822
  // We CANNOT use presentLocalNotificationAsync for ios
  makeTimerNotification = async (): Promise<boolean> => {
    const granted = await PermissionService.getTimerPermission();
    if (!granted) {
      return false;
    }
    const timer = [];
    const lastTimeNotification = await this.getLastTimeNotification();
    const timerDurationByHours = await this.getTimerDurationByHours();
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
            title: i18n.t('notification.title'),
            body: i18n.t('notification.timerBody'),
          },
          { time }
        );
      })
    );
    await Frequency.storeAlertFrequency({
      dataTobeSets: timer,
    });
    await this.setLastTimeNotification(timer[timer.length - 1]);
    return true;
  };

  addNotificationEvent = (): void => {
    Notifications.addListener((notification) => {
      if (notification.origin === 'received') {
        Alert.alert(
          i18n.t('notification.title'),
          i18n.t('notification.timerBody'),
          [
            {
              text: 'Ok',
            },
          ]
        );
      }
    });
  };
}

const notificationService = new NotificationService();
export default notificationService;
