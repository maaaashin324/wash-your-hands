export type GetFrequencyType = {
  alertTimes: number;
  washTimes: number;
  alertFrequency: AlertFrequencyType | null;
  washFrequency: WashFrequencyType | null;
};

export type FrequencyTimeType = {
  timestamp: number;
};

export type AlertFrequencyType = {
  // year
  [key: number]: {
    // month
    [key: number]: {
      // day
      [key: number]: FrequencyTimeType[];
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
