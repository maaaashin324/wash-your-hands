import { AsyncStorage } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import { AlertFrequencyType } from 'types/alertFrequency';
import {
  makeNotificationForWash,
  getTimerDuration,
  getLastTimeNotification,
} from './notifications';
import { findMovement } from './measureMeters';
import { setFrequency } from './frequency';
import { getTimerPermission } from './permissions';

// eslint-disable-next-line
export const makeNotifications = async ({
  data: { locations },
  error,
}): Promise<void> => {
  if (error) {
    return;
  }
  const result = findMovement(locations);
  if (result) {
    await makeNotificationForWash();

    const dataSet = await AsyncStorage.getItem('washTimes');
    let frequency: AlertFrequencyType = {};
    if (dataSet) {
      frequency = JSON.parse(dataSet);
    }
    await setFrequency({ frequency, dataTobeSet: Date.now(), type: 'alert' });
  }
};

export const makeTimerNotifications = async (): Promise<number> => {
  const granted = await getTimerPermission();
  if (!granted) {
    return BackgroundFetch.Result.NoData;
  }
  const lastNotificationTime = await getLastTimeNotification();
  if (!lastNotificationTime) {
    return BackgroundFetch.Result.NoData;
  }
  const timerDuration = await getTimerDuration();
  if (Date.now() - lastNotificationTime > timerDuration * 60000) {
    await makeNotificationForWash();
  }
  return BackgroundFetch.Result.NewData;
};
