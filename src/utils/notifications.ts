import { Notifications } from 'expo';

// eslint-disable-next-line
export const makeNotificationForWash = async () => {
  await Notifications.presentLocalNotificationAsync({
    title: 'Wash your hands!',
    body: 'You started to stay somewhere? Wash your hands!',
  });
};
