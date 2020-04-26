import { AsyncStorage } from 'react-native';
import {
  AlertFrequencyType,
  WashFrequencyType,
  GetFrequencyType,
} from '@types';
import Frequency from '@/class/Frequency';

const mockAlertKey = Frequency['alertFrequencyStorageKey'];
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
      const { year, month, date } = Frequency['calcToday']();

      expect(year).toBe(new Date().getFullYear());
      expect(month).toBe(new Date().getMonth());
      expect(date).toBe(new Date().getDate());
    });
  });

  describe('calcFrequency', () => {
    test('should return 0 when frequency is falsy', () => {
      const frequency = null;
      const result = Frequency['calcTodayFrequency'](frequency);

      expect(result).toBe(0);
    });

    test('should return 0 when month is not set', () => {
      const now = new Date();
      const frequency = { [now.getFullYear()]: null };
      const result = Frequency['calcTodayFrequency'](frequency);

      expect(result).toBe(0);
    });

    test('should return 0 when date is not set', () => {
      const now = new Date();
      const frequency = { [now.getFullYear()]: { [now.getMonth()]: null } };
      const result = Frequency['calcTodayFrequency'](frequency);

      expect(result).toBe(0);
    });

    test('should return 1 when a pair is set as AlertFrequency', () => {
      const now = new Date();
      const frequency: AlertFrequencyType = {
        [now.getFullYear()]: {
          [now.getMonth()]: { [now.getDate()]: [{ timestamp: Date.now() }] },
        },
      };
      const result = Frequency['calcTodayFrequency'](frequency);

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
      const result = Frequency['calcTodayFrequency'](frequency);

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
      const result = Frequency['calcTodayFrequency'](frequency);

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
      const result = await Frequency.getFrequency();
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
        Frequency['alertFrequencyStorageKey']
      );
      expect(spyOnGetItem).toHaveBeenLastCalledWith(
        Frequency['washFrequencyStorageKey']
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
      const { year, month, date } = Frequency['calcToday']();
      const oldFrequency: AlertFrequencyType = {
        [year]: { [month]: { [date]: [{ timestamp: Date.now() }] } },
      };
      try {
        await Frequency.setAlertFrequency({ frequency: oldFrequency });
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    test('store alert frequency at the very first time', async () => {
      const dataTobeSet = Date.now();
      const type = Frequency['alertFrequencyStorageKey'];
      await Frequency.setAlertFrequency({ dataTobeSet });

      const { year, month, date } = Frequency['calcToday']();
      const expected: AlertFrequencyType = {
        [year]: { [month]: { [date]: [{ timestamp: dataTobeSet }] } },
      };

      expect(spyOnSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
    });

    test('store alert frequency at the second time', async () => {
      const { year, month, date } = Frequency['calcToday']();
      const oldFrequency = {
        [year]: { [month]: { [date]: [{ timestamp: Date.now() }] } },
      };
      const dataTobeSet = Date.now();
      const type = Frequency['alertFrequencyStorageKey'];
      await Frequency.setAlertFrequency({
        frequency: oldFrequency,
        dataTobeSet,
      });

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
      const type = Frequency['washFrequencyStorageKey'];
      await Frequency.setWashFrequency({ dataTobeSet });

      const { year, month, date } = Frequency['calcToday']();
      const expected: WashFrequencyType = {
        [year]: { [month]: { [date]: 1 } },
      };

      expect(spyOnSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
    });

    test('store wash frequency at the second time', async () => {
      const { year, month, date } = Frequency['calcToday']();
      const oldFrequency: WashFrequencyType = {
        [year]: { [month]: { [date]: 2 } },
      };
      const dataTobeSet = 3;
      const type = Frequency['washFrequencyStorageKey'];
      await Frequency.setWashFrequency({
        frequency: oldFrequency,
        dataTobeSet,
      });

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
        await Frequency.storeAlertFrequency();
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    test('should store alert frequency with one frequency', async () => {
      const type = Frequency['alertFrequencyStorageKey'];
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

      await Frequency.storeAlertFrequency({ dataTobeSet: newTimestamp });
      expect(spyOnGetItem).toHaveBeenCalledTimes(1);
      expect(spyOnGetItem).toHaveBeenCalledWith(
        Frequency['alertFrequencyStorageKey']
      );
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
      const type = Frequency['washFrequencyStorageKey'];
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

      await Frequency.storeWashFrequency({ dataTobeSet: 2 });
      expect(spyOnGetItem).toHaveBeenCalledTimes(1);
      expect(spyOnGetItem).toHaveBeenCalledWith(
        Frequency['washFrequencyStorageKey']
      );
      expect(spyOnSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnSetItem).toHaveBeenCalledWith(type, JSON.stringify(expected));
    });
  });
});
