export type GetFrequencyType = {
  alertTimes: number;
  todayTimes: number;
  alertFrequency: FrequencyType | null;
  washFrequency: FrequencyType | null;
};

export type FrequencyTimeType = {
  timestamp: number;
};

export type FrequencyType = {
  // year
  [key: number]: {
    // month
    [key: number]: {
      // day
      [key: number]: FrequencyTimeType[];
    };
  };
};
