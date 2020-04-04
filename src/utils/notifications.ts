import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

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
    title: 'Wash your hands!',
    body: 'You started to stay somewhere? Wash your hands!',
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
