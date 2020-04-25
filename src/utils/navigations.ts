import i18n from 'i18n-js';
import {
  HomeScreenRouteProp,
  HowToWashScreenRouteProp,
  SettingsScreenRouteProp,
  StatisticsScreenRouteProp,
  RouteType,
} from '@types';
import { INITIAL_ROUTE_NAME } from '@constants/navigations';

type GetHeaderTitleParamType =
  | HomeScreenRouteProp
  | HowToWashScreenRouteProp
  | SettingsScreenRouteProp
  | StatisticsScreenRouteProp;

// eslint-disable-next-line
export const getHeaderTitle = (
  route: GetHeaderTitleParamType | RouteType
): string => {
  const routeName = route.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
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
