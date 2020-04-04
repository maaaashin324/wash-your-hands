import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

// eslint-disable-next-line
export const makeNotificationForWash = async () => {
  await Notifications.presentLocalNotificationAsync({
    title: 'Wash your hands!',
    body: 'You started to stay somewhere? Wash your hands!',
  });
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
