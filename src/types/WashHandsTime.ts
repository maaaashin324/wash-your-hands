export type WashHandsTime = {
  timestamp: number;
};

export type WashHandsTimeSet = {
  // year
  [key: string]: {
    // month
    [key: string]: {
      // day
      [key: string]: WashHandsTime[];
    };
  };
};
