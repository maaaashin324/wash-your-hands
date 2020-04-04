import { AlertFrequencyType, WashFrequencyType } from 'types';

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
