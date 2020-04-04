import { AsyncStorage } from 'react-native';
import { AlertFrequencyType } from 'types/alertFrequency';
import { makeNotificationForWash } from './notifications';
import { findMovement } from './measureMeters';
import { setFrequency } from './frequency';

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
