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
