import * as TaskManager from 'expo-task-manager';
import { GET_LOCATION_TASK, TIMER_TASK } from '@constants/task';
import { AsyncStorage } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import { AlertFrequencyType } from 'types/alertFrequency';
import { makeNotificationForWash, getTimerDuration } from './notifications';
import { findMovement } from './measureMeters';
import { setFrequency } from './frequency';
import { getTimerPermission } from './permissions';

// eslint-disable-next-line
export const makeNotifications = async (locations): Promise<void> => {
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
  const timerDuration = await getTimerDuration();
  setInterval(() => {
    makeNotificationForWash();
  }, timerDuration * 60000);
  return BackgroundFetch.Result.NewData;
};

export const initTask = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const promiseArray = [];
    if (TaskManager.isTaskDefined(GET_LOCATION_TASK)) {
      TaskManager.defineTask(
        GET_LOCATION_TASK,
        // eslint-disable-next-line
        // @ts-ignore
        ({ data: { locations }, error }) => {
          if (error) {
            reject(error);
          }
          const promise = makeNotifications(locations).then(() => {
            BackgroundFetch.registerTaskAsync(GET_LOCATION_TASK, {
              minimumInterval: 30,
            });
          });
          promiseArray.push(promise);
        }
      );
    }
    if (TaskManager.isTaskDefined(TIMER_TASK)) {
      TaskManager.defineTask(TIMER_TASK, ({ error }) => {
        if (error) {
          reject(error);
        }
        const promise = makeTimerNotifications()
          .then(() => {
            return getTimerDuration();
          })
          .then((timerDuration) => {
            BackgroundFetch.registerTaskAsync(TIMER_TASK, {
              minimumInterval: timerDuration * 60000,
            });
          });
        promiseArray.push(promise);
      });
    }
    Promise.all(promiseArray).then(() => resolve());
  });
};
