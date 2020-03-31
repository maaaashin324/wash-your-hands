import { AsyncStorage } from 'react-native';
import { makeNotificationForWash } from './notifications';
import { findMovement } from './measureMeters';

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
    let washHandsTimeSet = [];
    if (dataSet) {
      washHandsTimeSet = JSON.parse(dataSet);
    }
    washHandsTimeSet.push(Date.now());
    await AsyncStorage.setItem('washTimes', JSON.stringify(washHandsTimeSet));
  }
};
