import { AsyncStorage } from 'react-native';
import { AlertFrequencyType } from 'types/alertFrequency';
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
    let alertFrequency: AlertFrequencyType = {};
    if (dataSet) {
      alertFrequency = JSON.parse(dataSet);
    }
    const now = new Date();
    if (!alertFrequency[now.getFullYear()]) {
      alertFrequency[now.getFullYear()] = {};
    }
    if (!alertFrequency[now.getFullYear()][now.getMonth()]) {
      alertFrequency[now.getFullYear()][now.getMonth()] = {};
    }
    if (!alertFrequency[now.getFullYear()][now.getMonth()][now.getDate()]) {
      alertFrequency[now.getFullYear()][now.getMonth()][now.getDate()] = [
        { timestamp: now.getTime() },
      ];
    }
    await AsyncStorage.setItem('washTimes', JSON.stringify(alertFrequency));
  }
};
