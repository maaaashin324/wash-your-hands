import { AlertFrequencyType, WashFrequencyType } from 'types';
import { AsyncStorage } from 'react-native';

// eslint-disable-next-line
export const calcFrequency = (
  frequency: AlertFrequencyType | WashFrequencyType
): number => {
  const now = new Date();
  if (!frequency) {
    return 0;
  }
  const currentYearSet = frequency[now.getFullYear()];
  if (!currentYearSet) {
    return 0;
  }
  const currentMonthSet = frequency[now.getFullYear()][now.getMonth()];
  if (!currentMonthSet) {
    return 0;
  }
  const currentDateSet =
    frequency[now.getFullYear()][now.getMonth()][now.getDate()];
  if (!currentDateSet) {
    return 0;
  }
  if (typeof currentDateSet === 'number') {
    return currentDateSet;
  }
  return currentDateSet.length;
};

export const setFrequency = async ({
  frequency,
  dataTobeSet,
  type,
}: {
  frequency: AlertFrequencyType | WashFrequencyType | null;
  dataTobeSet: number;
  type: string;
}): Promise<void> => {
  let newFrequency: AlertFrequencyType | WashFrequencyType = {};
  if (frequency) {
    newFrequency = JSON.parse(JSON.stringify(frequency));
  }
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const currentYearSet = newFrequency[year];
  if (!currentYearSet) {
    newFrequency[year] = {};
  }
  const currentMonthSet = newFrequency[year][month];
  if (!currentMonthSet) {
    newFrequency[year][month] = {};
  }
  const currentDateSet = newFrequency[year][month][date];
  if (type === 'wash') {
    newFrequency[year][month][date] = dataTobeSet;
  } else if (!currentDateSet) {
    newFrequency[year][month][date] = [{ timestamp: dataTobeSet }];
  } else {
    // eslint-disable-next-line
    // @ts-ignore
    newFrequency[year][month][date].push({ timestamp: dataTobeSet });
  }

  if (type === 'wash') {
    await AsyncStorage.setItem('wash', JSON.stringify(newFrequency));
  } else {
    await AsyncStorage.setItem('alert', JSON.stringify(newFrequency));
  }
};
