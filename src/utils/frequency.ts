import {
  AlertFrequencyType,
  WashFrequencyType,
  GetFrequencyType,
} from '@types';
import { AsyncStorage } from 'react-native';
import STORAGE_KEYS from '@constants/storage';

interface CalcToday {
  year: number;
  month: number;
  date: number;
}
export const calcToday = (): CalcToday => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  return { year, month, date };
};

/**
 * calcFrequency provides you with how frequent alert or wash times are
 * @param frequency This should be AlertFrequencyType or WashFrequencyType
 * @returns {Number}
 */
export const calcFrequency = (
  frequency: AlertFrequencyType | WashFrequencyType
): number => {
  const { year, month, date } = calcToday();
  if (!frequency) {
    return 0;
  }
  const currentYearSet = frequency[year];
  if (!currentYearSet) {
    return 0;
  }
  const currentMonthSet = frequency[year][month];
  if (!currentMonthSet) {
    return 0;
  }
  const currentDateSet = frequency[year][month][date];
  if (!currentDateSet) {
    return 0;
  }
  //  This means currentDataSet is WashFrequencyType
  if (typeof currentDateSet === 'number') {
    return currentDateSet;
  }
  //  This means currentDataSet is AlertFrequencyType
  return currentDateSet.length;
};

export const getFrequency = async (): Promise<GetFrequencyType> => {
  const alertFrequencyJSON = await AsyncStorage.getItem(
    STORAGE_KEYS.AlertFrequency
  );
  const washFrequencyJSON = await AsyncStorage.getItem(
    STORAGE_KEYS.WashFrequency
  );

  const result: GetFrequencyType = {
    alertTimes: 0,
    todayTimes: 0,
    alertFrequency: null,
    washFrequency: null,
  };
  if (alertFrequencyJSON) {
    result.alertFrequency = JSON.parse(alertFrequencyJSON);
    result.alertTimes = calcFrequency(result.alertFrequency);
  }
  if (washFrequencyJSON) {
    result.washFrequency = JSON.parse(washFrequencyJSON);
    result.todayTimes = calcFrequency(result.washFrequency);
  }
  return result;
};

export const setFrequency = async ({
  frequency,
  dataTobeSet,
  type,
}: {
  frequency?: AlertFrequencyType | WashFrequencyType | null;
  dataTobeSet: number;
  type: string;
}): Promise<void> => {
  let newFrequency: AlertFrequencyType | WashFrequencyType = {};
  if (frequency) {
    newFrequency = JSON.parse(JSON.stringify(frequency));
  }
  const { year, month, date } = calcToday();

  const currentYearSet = newFrequency[year];
  if (!currentYearSet) {
    newFrequency[year] = {};
  }
  const currentMonthSet = newFrequency[year][month];
  if (!currentMonthSet) {
    newFrequency[year][month] = {};
  }
  const currentDateSet = newFrequency[year][month][date];
  if (type === STORAGE_KEYS.WashFrequency) {
    newFrequency[year][month][date] = dataTobeSet;
    await AsyncStorage.setItem(
      STORAGE_KEYS.WashFrequency,
      JSON.stringify(newFrequency)
    );
    return;
  }

  if (!currentDateSet) {
    newFrequency[year][month][date] = [{ timestamp: dataTobeSet }];
  } else {
    // eslint-disable-next-line
    // @ts-ignore
    newFrequency[year][month][date].push({ timestamp: dataTobeSet });
  }
  await AsyncStorage.setItem(
    STORAGE_KEYS.AlertFrequency,
    JSON.stringify(newFrequency)
  );
};
