export type WashHandsTime = {
  timestamp: number;
};

export type WashHandsTimeSet = {
  // year
  [key: number]: {
    // month
    [key: number]: {
      // day
      [key: number]: WashHandsTime[];
    };
  };
};
