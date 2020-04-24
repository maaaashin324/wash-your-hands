import AsyncStorage from '@react-native-community/async-storage';
import { FrequencyType, GetFrequencyType } from '@types';
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
export const calcFrequency = (frequency: FrequencyType): number => {
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
  return currentDateSet.filter(
    (dateNumber) => dateNumber.timestamp <= Date.now()
  ).length;
};

export const getFrequency = async (): Promise<GetFrequencyType> => {
  const alertFrequencyJSON = await AsyncStorage.getItem(
    STORAGE_KEYS.ALERT_FREQUENCY
  );
  const washFrequencyJSON = await AsyncStorage.getItem(
    STORAGE_KEYS.WASH_FREQUENCY
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
  frequency?: FrequencyType | null;
  dataTobeSet: number;
  type: string;
}): Promise<void> => {
  let newFrequency: FrequencyType = {};
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
  if (!currentDateSet) {
    newFrequency[year][month][date] = [{ timestamp: dataTobeSet }];
  } else {
    // eslint-disable-next-line
    // @ts-ignore
    newFrequency[year][month][date].push({ timestamp: dataTobeSet });
  }
  await AsyncStorage.setItem(type, JSON.stringify(newFrequency));
};

export const storeFrequency = async (dataTobeSet: number): Promise<void> => {
  const dataSet = await AsyncStorage.getItem(STORAGE_KEYS.ALERT_FREQUENCY);
  let frequency: FrequencyType = {};
  if (dataSet) {
    frequency = JSON.parse(dataSet);
  }
  await setFrequency({
    frequency,
    dataTobeSet,
    type: STORAGE_KEYS.ALERT_FREQUENCY,
  });
};

export const storeFrequencies = async (
  dataTobeSet: number[]
): Promise<void> => {
  const dataSet = await AsyncStorage.getItem(STORAGE_KEYS.ALERT_FREQUENCY);
  let frequency: FrequencyType = {};
  if (dataSet) {
    frequency = JSON.parse(dataSet);
  }
  await Promise.all(
    dataTobeSet.map(async (eachData) => {
      await setFrequency({
        frequency,
        dataTobeSet: eachData,
        type: STORAGE_KEYS.ALERT_FREQUENCY,
      });
    })
  );
};
