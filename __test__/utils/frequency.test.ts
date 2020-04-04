import { AsyncStorage } from 'react-native';
import { calcToday, calcFrequency, setFrequency } from '@utils/frequency';
import { AlertFrequencyType } from 'types';

jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
  },
}));

describe('calcToday', () => {
  test('should return year, month, date of today', () => {
    const { year, month, date } = calcToday();

    expect(year).toBe(2020);
    expect(month).toBe(3);
    expect(date).toBe(4);
  });
});

describe('calcFrequency', () => {
  test('should return 0 when frequency is falsy', () => {
    const frequency = null;
    const result = calcFrequency(frequency);

    expect(result).toBe(0);
  });

  test('should return 0 when month is not set', () => {
    const now = new Date();
    const frequency = { [now.getFullYear()]: null };
    const result = calcFrequency(frequency);

    expect(result).toBe(0);
  });

  test('should return 0 when date is not set', () => {
    const now = new Date();
    const frequency = { [now.getFullYear()]: { [now.getMonth()]: null } };
    const result = calcFrequency(frequency);

    expect(result).toBe(0);
  });

  test('should return 1 when a pair is set', () => {
    const now = new Date();
    const frequency: AlertFrequencyType = {
      [now.getFullYear()]: {
        [now.getMonth()]: { [now.getDate()]: [{ timestamp: Date.now() }] },
      },
    };
    const result = calcFrequency(frequency);

    expect(result).toBe(1);
  });

  test('should return 2 when a pair is set', () => {
    const now = new Date();
    const frequency: AlertFrequencyType = {
      [now.getFullYear()]: {
        [now.getMonth()]: {
          [now.getDate()]: [
            { timestamp: Date.now() },
            { timestamp: Date.now() + 1 },
          ],
        },
      },
    };
    const result = calcFrequency(frequency);

    expect(result).toBe(2);
  });
});

describe('setFrequency', () => {
  let spyOnSetItem;

  beforeEach(() => {
    spyOnSetItem = jest.spyOn(AsyncStorage, 'setItem');
  });

  afterEach(() => {
    spyOnSetItem.mockClear();
  });

  test('store alert frequency at the very first time', async () => {
    const dataTobeSet = Date.now();
    const type = 'alert';
    await setFrequency({ dataTobeSet, type });

    const { year, month, date } = calcToday();
    const expected = {
      [year]: { [month]: { [date]: [{ timestamp: dataTobeSet }] } },
    };

    expect(spyOnSetItem).toHaveBeenCalledTimes(1);
    expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
  });

  test('store alert frequency at the second time', async () => {
    const { year, month, date } = calcToday();
    const oldFrequency = {
      [year]: { [month]: { [date]: [{ timestamp: Date.now() }] } },
    };
    const dataTobeSet = Date.now();
    const type = 'alert';
    await setFrequency({ frequency: oldFrequency, dataTobeSet, type });

    const expected = oldFrequency;
    expected[year][month][date].push({
      timestamp: dataTobeSet,
    });

    expect(spyOnSetItem).toHaveBeenCalledTimes(1);
    expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
  });

  test('store wash frequency at the very first time', async () => {
    const dataTobeSet = 1;
    const type = 'wash';
    await setFrequency({ dataTobeSet, type });

    const { year, month, date } = calcToday();
    const expected = {
      [year]: { [month]: { [date]: 1 } },
    };

    expect(spyOnSetItem).toHaveBeenCalledTimes(1);
    expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
  });

  test('store wash frequency at the second time', async () => {
    const { year, month, date } = calcToday();
    const oldFrequency = {
      [year]: { [month]: { [date]: 2 } },
    };
    const dataTobeSet = 3;
    const type = 'wash';
    await setFrequency({ frequency: oldFrequency, dataTobeSet, type });

    const expected = oldFrequency;
    expected[year][month][date] = 3;

    expect(spyOnSetItem).toHaveBeenCalledTimes(1);
    expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
  });
});
