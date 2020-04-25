import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeStackParamList = {
  Home: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Home'
>;

export type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'Home'>;

export type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export type HowToWashStackParamList = {
  HowToWash: undefined;
  YouTube: { uri: string };
};

export type HowToWashScreenNavigationProp = StackNavigationProp<
  HowToWashStackParamList,
  'HowToWash' | 'YouTube'
>;

export type HowToWashScreenRouteProp = RouteProp<
  HowToWashStackParamList,
  'HowToWash' | 'YouTube'
>;

export type HowToWashScreenProps = {
  route: HowToWashScreenRouteProp;
  navigation: HowToWashScreenNavigationProp;
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type SettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'Settings'
>;

export type SettingsScreenRouteProp = RouteProp<
  SettingsStackParamList,
  'Settings'
>;

export type SettingsScreenProps = {
  route: SettingsScreenRouteProp;
  navigation: SettingsScreenNavigationProp;
};

export type StatisticsStackParamList = {
  Statistics: undefined;
};

export type StatisticsScreenNavigationProp = StackNavigationProp<
  StatisticsStackParamList,
  'Statistics'
>;

export type StatisticsScreenRouteProp = RouteProp<
  StatisticsStackParamList,
  'Statistics'
>;

export type StatisticsScreenProps = {
  route: StatisticsScreenRouteProp;
  navigation: StatisticsScreenNavigationProp;
};
