import { AsyncStorage } from 'react-native';
import { WashHandsTimeSet } from '@types/washHandsTime';
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
    let washHandsTimeSet: WashHandsTimeSet = {};
    if (dataSet) {
      washHandsTimeSet = JSON.parse(dataSet);
    }
    const now = new Date();
    if (!washHandsTimeSet[now.getFullYear()]) {
      washHandsTimeSet[now.getFullYear()] = {};
    }
    if (!washHandsTimeSet[now.getFullYear()][now.getMonth()]) {
      washHandsTimeSet[now.getFullYear()][now.getMonth()] = {};
    }
    if (!washHandsTimeSet[now.getFullYear()][now.getMonth()][now.getDate()]) {
      washHandsTimeSet[now.getFullYear()][now.getMonth()][now.getDate()] = [
        { timestamp: now.getTime() },
      ];
    }
    await AsyncStorage.setItem('washTimes', JSON.stringify(washHandsTimeSet));
  }
};
