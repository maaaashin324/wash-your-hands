export type GetFrequencyType = {
  alertTimes: number;
  todayTimes: number;
  alertFrequency: AlertFrequencyType | null;
  washFrequency: WashFrequencyType | null;
};

export type AlertTimeType = {
  timestamp: number;
};

export type AlertFrequencyType = {
  // year
  [key: number]: {
    // month
    [key: number]: {
      // day
      [key: number]: AlertTimeType[];
    };
  };
};

export type WashFrequencyType = {
  // year
  [key: number]: {
    // month
    [key: number]: {
      // day
      [key: number]: number;
    };
  };
};
