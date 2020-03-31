export type WashHandsTimeType = {
  timestamp: number;
};

export type WashHandsTimeSetType = {
  // year
  [key: number]: {
    // month
    [key: number]: {
      // day
      [key: number]: WashHandsTimeType[];
    };
  };
};
