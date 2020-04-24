import { AsyncStorage } from 'react-native';
import {
  AlertFrequencyType,
  WashFrequencyType,
  GetFrequencyType,
} from '@types';
import {
  calcToday,
  calcTodayFrequency,
  getFrequency,
  setAlertFrequency,
  setWashFrequency,
  storeAlertFrequency,
  storeWashFrequency,
} from '@utils/frequency';
import STORAGE_KEYS from '@/constants/storage';

const mockAlertKey = STORAGE_KEYS.ALERT_FREQUENCY;
jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
    getItem: jest.fn((key) => {
      return new Promise((resolve) => {
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        if (key === mockAlertKey) {
          resolve(
            JSON.stringify({
              [today.getFullYear()]: {
                [today.getMonth()]: {
                  [today.getDate()]: [{ timestamp: today.getTime() - 1 }],
                },
              },
            })
          );
          return;
        }
        resolve(
          JSON.stringify({
            [today.getFullYear()]: {
              [today.getMonth()]: {
                [today.getDate()]: 2,
              },
            },
          })
        );
      });
    }),
  },
}));

describe('Frequency', () => {
  describe('calcToday', () => {
    test('should return year, month, date of today', () => {
      const { year, month, date } = calcToday();

      expect(year).toBe(new Date().getFullYear());
      expect(month).toBe(new Date().getMonth());
      expect(date).toBe(new Date().getDate());
    });
  });

  describe('calcFrequency', () => {
    test('should return 0 when frequency is falsy', () => {
      const frequency = null;
      const result = calcTodayFrequency(frequency);

      expect(result).toBe(0);
    });

    test('should return 0 when month is not set', () => {
      const now = new Date();
      const frequency = { [now.getFullYear()]: null };
      const result = calcTodayFrequency(frequency);

      expect(result).toBe(0);
    });

    test('should return 0 when date is not set', () => {
      const now = new Date();
      const frequency = { [now.getFullYear()]: { [now.getMonth()]: null } };
      const result = calcTodayFrequency(frequency);

      expect(result).toBe(0);
    });

    test('should return 1 when a pair is set as AlertFrequency', () => {
      const now = new Date();
      const frequency: AlertFrequencyType = {
        [now.getFullYear()]: {
          [now.getMonth()]: { [now.getDate()]: [{ timestamp: Date.now() }] },
        },
      };
      const result = calcTodayFrequency(frequency);

      expect(result).toBe(1);
    });

    test('should return 2 when a pair is set as AlertFrequency', () => {
      const now = new Date();
      const frequency: AlertFrequencyType = {
        [now.getFullYear()]: {
          [now.getMonth()]: {
            [now.getDate()]: [
              { timestamp: Date.now() - 1 },
              { timestamp: Date.now() },
            ],
          },
        },
      };
      const result = calcTodayFrequency(frequency);

      expect(result).toBe(2);
    });

    test('should return 2 as WashFrequency', () => {
      const now = new Date();
      const frequency: WashFrequencyType = {
        [now.getFullYear()]: {
          [now.getMonth()]: {
            [now.getDate()]: 2,
          },
        },
      };
      const result = calcTodayFrequency(frequency);

      expect(result).toBe(2);
    });
  });

  describe('getFrequency', () => {
    let spyOnGetItem;

    beforeEach(() => {
      spyOnGetItem = jest.spyOn(AsyncStorage, 'getItem');
    });

    afterEach(() => {
      spyOnGetItem.mockClear();
    });

    test('should get GetFrequencyType', async () => {
      const result = await getFrequency();
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      const expected: GetFrequencyType = {
        alertTimes: 1,
        washTimes: 2,
        alertFrequency: {
          [today.getFullYear()]: {
            [today.getMonth()]: {
              [today.getDate()]: [{ timestamp: today.getTime() - 1 }],
            },
          },
        },
        washFrequency: {
          [today.getFullYear()]: {
            [today.getMonth()]: {
              [today.getDate()]: 2,
            },
          },
        },
      };
      expect(result).toEqual(expected);
      expect(spyOnGetItem).toHaveBeenCalledTimes(2);
      expect(spyOnGetItem).toHaveBeenNthCalledWith(
        1,
        STORAGE_KEYS.ALERT_FREQUENCY
      );
      expect(spyOnGetItem).toHaveBeenLastCalledWith(
        STORAGE_KEYS.WASH_FREQUENCY
      );
    });
  });

  describe('setAlertFrequency', () => {
    let spyOnSetItem;

    beforeEach(() => {
      spyOnSetItem = jest.spyOn(AsyncStorage, 'setItem');
    });

    afterEach(() => {
      spyOnSetItem.mockClear();
    });

    test('should throw error if neither dataTobeSet nor dataTobeSets is set as arguments', async () => {
      const { year, month, date } = calcToday();
      const oldFrequency: AlertFrequencyType = {
        [year]: { [month]: { [date]: [{ timestamp: Date.now() }] } },
      };
      try {
        await setAlertFrequency({ frequency: oldFrequency });
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    test('store alert frequency at the very first time', async () => {
      const dataTobeSet = Date.now();
      const type = STORAGE_KEYS.ALERT_FREQUENCY;
      await setAlertFrequency({ dataTobeSet });

      const { year, month, date } = calcToday();
      const expected: AlertFrequencyType = {
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
      const type = STORAGE_KEYS.ALERT_FREQUENCY;
      await setAlertFrequency({ frequency: oldFrequency, dataTobeSet });

      const expected: AlertFrequencyType = oldFrequency;
      expected[year][month][date].push({
        timestamp: dataTobeSet,
      });

      expect(spyOnSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
    });
  });

  describe('setWashFrequency', () => {
    let spyOnSetItem;

    beforeEach(() => {
      spyOnSetItem = jest.spyOn(AsyncStorage, 'setItem');
    });

    afterEach(() => {
      spyOnSetItem.mockClear();
    });

    test('store wash frequency at the very first time', async () => {
      const dataTobeSet = 1;
      const type = STORAGE_KEYS.WASH_FREQUENCY;
      await setWashFrequency({ dataTobeSet });

      const { year, month, date } = calcToday();
      const expected: WashFrequencyType = {
        [year]: { [month]: { [date]: 1 } },
      };

      expect(spyOnSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
    });

    test('store wash frequency at the second time', async () => {
      const { year, month, date } = calcToday();
      const oldFrequency: WashFrequencyType = {
        [year]: { [month]: { [date]: 2 } },
      };
      const dataTobeSet = 3;
      const type = STORAGE_KEYS.WASH_FREQUENCY;
      await setWashFrequency({ frequency: oldFrequency, dataTobeSet });

      const expected = oldFrequency;
      expected[year][month][date] = 3;

      expect(spyOnSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
    });
  });

  describe('storeAlertFrequency', () => {
    let spyOnGetItem;
    let spyOnSetItem;

    beforeEach(() => {
      spyOnGetItem = jest.spyOn(AsyncStorage, 'getItem');
      spyOnSetItem = jest.spyOn(AsyncStorage, 'setItem');
    });

    afterEach(() => {
      spyOnGetItem.mockClear();
      spyOnSetItem.mockClear();
    });

    test('should throw error if neither dataTobeSet nor dataTobeSets is set as arguments', async () => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        await storeAlertFrequency();
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    test('should store alert frequency with one frequency', async () => {
      const type = STORAGE_KEYS.ALERT_FREQUENCY;
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);

      const newTimestamp = Date.now() - 2;
      const expected = {
        [today.getFullYear()]: {
          [today.getMonth()]: {
            [today.getDate()]: [
              { timestamp: today.getTime() - 1 },
              { timestamp: newTimestamp },
            ],
          },
        },
      };

      await storeAlertFrequency({ dataTobeSet: newTimestamp });
      expect(spyOnGetItem).toHaveBeenCalledTimes(1);
      expect(spyOnGetItem).toHaveBeenCalledWith(STORAGE_KEYS.ALERT_FREQUENCY);
      expect(spyOnSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
    });
  });

  describe('storeWashFrequency', () => {
    let spyOnGetItem;
    let spyOnSetItem;

    beforeEach(() => {
      spyOnGetItem = jest.spyOn(AsyncStorage, 'getItem');
      spyOnSetItem = jest.spyOn(AsyncStorage, 'setItem');
    });

    afterEach(() => {
      spyOnGetItem.mockClear();
      spyOnSetItem.mockClear();
    });

    test('should store alert frequency with one frequency', async () => {
      const type = STORAGE_KEYS.WASH_FREQUENCY;
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);

      const expected = {
        [today.getFullYear()]: {
          [today.getMonth()]: {
            [today.getDate()]: 2,
          },
        },
      };

      await storeWashFrequency({ dataTobeSet: 2 });
      expect(spyOnGetItem).toHaveBeenCalledTimes(1);
      expect(spyOnGetItem).toHaveBeenCalledWith(STORAGE_KEYS.WASH_FREQUENCY);
      expect(spyOnSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
    });
  });
});
