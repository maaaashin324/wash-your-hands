import { AsyncStorage } from 'react-native';
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
 * calcTodayFrequency provides you with how frequent alert or wash times are
 * @param frequency This should be AlertFrequencyType or WashFrequencyType
 * @returns {Number}
 */
export const calcTodayFrequency = (frequency: FrequencyType): number => {
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
    washTimes: 0,
    alertFrequency: null,
    washFrequency: null,
  };
  if (alertFrequencyJSON) {
    result.alertFrequency = JSON.parse(alertFrequencyJSON);
    result.alertTimes = calcTodayFrequency(result.alertFrequency);
  }
  if (washFrequencyJSON) {
    result.washFrequency = JSON.parse(washFrequencyJSON);
    result.washTimes = calcTodayFrequency(result.washFrequency);
  }
  return result;
};

export const setFrequency = async ({
  frequency,
  dataTobeSet,
  dataTobeSets,
  type,
}: {
  frequency?: FrequencyType | null;
  dataTobeSet?: number;
  dataTobeSets?: number[];
  type: string;
}): Promise<void> => {
  if (!dataTobeSet && !dataTobeSets) {
    throw new TypeError();
  }
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
  if (dataTobeSet) {
    if (!currentDateSet) {
      newFrequency[year][month][date] = [{ timestamp: dataTobeSet }];
    } else {
      newFrequency[year][month][date].push({ timestamp: dataTobeSet });
    }
  } else if (!currentDateSet) {
    newFrequency[year][month][date] = dataTobeSets.map((eachData) => ({
      timestamp: eachData,
    }));
  } else {
    newFrequency[year][month][date].push(
      ...dataTobeSets.map((eachData) => ({
        timestamp: eachData,
      }))
    );
  }
  await AsyncStorage.setItem(type, JSON.stringify(newFrequency));
};

export const storeFrequency = async ({
  type,
  dataTobeSet,
  dataTobeSets,
}: {
  type: string;
  dataTobeSet?: number;
  dataTobeSets?: number[];
}): Promise<void> => {
  if (!dataTobeSet && !dataTobeSets) {
    throw new TypeError();
  }
  const dataSet = await AsyncStorage.getItem(type);
  let frequency: FrequencyType = {};
  if (dataSet) {
    frequency = JSON.parse(dataSet);
  }
  await setFrequency({
    frequency,
    dataTobeSet,
    dataTobeSets,
    type,
  });
};
