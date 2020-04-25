import { AsyncStorage } from 'react-native';
import {
  AlertFrequencyType,
  WashFrequencyType,
  GetFrequencyType,
} from '@types';

interface CalcToday {
  year: number;
  month: number;
  date: number;
}

class Frequency {
  private alertFrequencyStorageKey = 'ALERT_FREQUENCY';

  private washFrequencyStorageKey = 'WASH_FREQUENCY';

  static calcToday = (): CalcToday => {
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
  static calcTodayFrequency = (
    frequency: AlertFrequencyType | WashFrequencyType
  ): number => {
    const { year, month, date } = Frequency.calcToday();
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
    if (!Array.isArray(currentDateSet)) {
      return currentDateSet;
    }
    return currentDateSet.filter(
      (dateNumber) => dateNumber.timestamp <= Date.now()
    ).length;
  };

  getFrequency = async (): Promise<GetFrequencyType> => {
    const alertFrequencyJSON = await AsyncStorage.getItem(
      this.alertFrequencyStorageKey
    );
    const washFrequencyJSON = await AsyncStorage.getItem(
      this.washFrequencyStorageKey
    );

    const result: GetFrequencyType = {
      alertTimes: 0,
      washTimes: 0,
      alertFrequency: null,
      washFrequency: null,
    };
    if (alertFrequencyJSON) {
      result.alertFrequency = JSON.parse(alertFrequencyJSON);
      result.alertTimes = Frequency.calcTodayFrequency(result.alertFrequency);
    }
    if (washFrequencyJSON) {
      result.washFrequency = JSON.parse(washFrequencyJSON);
      result.washTimes = Frequency.calcTodayFrequency(result.washFrequency);
    }
    return result;
  };

  setAlertFrequency = async ({
    frequency,
    dataTobeSet,
    dataTobeSets,
  }: {
    frequency?: AlertFrequencyType | null;
    dataTobeSet?: number;
    dataTobeSets?: number[];
  }): Promise<void> => {
    if (!dataTobeSet && !dataTobeSets) {
      throw new TypeError();
    }
    let newFrequency: AlertFrequencyType = {};
    if (frequency) {
      newFrequency = JSON.parse(JSON.stringify(frequency));
    }
    const { year, month, date } = Frequency.calcToday();

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
    await AsyncStorage.setItem(
      this.alertFrequencyStorageKey,
      JSON.stringify(newFrequency)
    );
  };

  setWashFrequency = async ({
    frequency,
    dataTobeSet,
  }: {
    frequency?: WashFrequencyType | null;
    dataTobeSet?: number;
  }): Promise<void> => {
    let newFrequency: WashFrequencyType = {};
    if (frequency) {
      newFrequency = JSON.parse(JSON.stringify(frequency));
    }
    const { year, month, date } = Frequency.calcToday();

    const currentYearSet = newFrequency[year];
    if (!currentYearSet) {
      newFrequency[year] = {};
    }
    const currentMonthSet = newFrequency[year][month];
    if (!currentMonthSet) {
      newFrequency[year][month] = {};
    }
    newFrequency[year][month][date] = dataTobeSet;
    await AsyncStorage.setItem(
      this.washFrequencyStorageKey,
      JSON.stringify(newFrequency)
    );
  };

  storeAlertFrequency = async ({
    dataTobeSet,
    dataTobeSets,
  }: {
    dataTobeSet?: number;
    dataTobeSets?: number[];
  }): Promise<void> => {
    if (!dataTobeSet && !dataTobeSets) {
      throw new TypeError();
    }
    const dataSet = await AsyncStorage.getItem(this.alertFrequencyStorageKey);
    let frequency: AlertFrequencyType = {};
    if (dataSet) {
      frequency = JSON.parse(dataSet);
    }
    await this.setAlertFrequency({
      frequency,
      dataTobeSet,
      dataTobeSets,
    });
  };

  storeWashFrequency = async ({
    dataTobeSet,
  }: {
    dataTobeSet: number;
  }): Promise<void> => {
    const dataSet = await AsyncStorage.getItem(this.washFrequencyStorageKey);
    let frequency: WashFrequencyType = {};
    if (dataSet) {
      frequency = JSON.parse(dataSet);
    }
    await this.setWashFrequency({
      frequency,
      dataTobeSet,
    });
  };
}

const frequency = new Frequency();
export default frequency;
