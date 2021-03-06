import i18n from 'i18n-js';
import {
  HomeScreenRouteProp,
  HowToWashScreenRouteProp,
  SettingsScreenRouteProp,
  StatisticsScreenRouteProp,
  RouteType,
} from '@types';

type GetHeaderTitleParamType =
  | HomeScreenRouteProp
  | HowToWashScreenRouteProp
  | SettingsScreenRouteProp
  | StatisticsScreenRouteProp;

export const getHeaderTitle = (
  route: GetHeaderTitleParamType | RouteType
): string => {
  switch (route.name) {
    case 'Home':
      return i18n.t('tab.home');
    case 'HowToWash':
      return i18n.t('tab.howToWash');
    case 'YouTube':
      return i18n.t('tab.youTube');
    case 'Statistics':
      return i18n.t('tab.statistics');
    case 'Settings':
      return i18n.t('tab.settings');
    default:
      return i18n.t('tab.home');
  }
};

const topScreenName = ['Home', 'HowToWash', 'Statistics', 'Settings'];
export const isTopScreenName = (
  route: GetHeaderTitleParamType | RouteType
): boolean => {
  if (topScreenName.includes(route.name)) {
    return true;
  }
  return false;
};
