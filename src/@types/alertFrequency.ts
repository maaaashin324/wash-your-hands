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
