import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import i18n from 'i18n-js';
import { INITIAL_ROUTE_NAME } from '@constants/navigations';

// eslint-disable-next-line
export const getHeaderTitle = (route: BottomTabBarProps): string => {
  const routeName =
    route.state?.routes[route.state?.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return i18n.t('tab.home');
    case 'How To Wash':
      return i18n.t('tab.howToWash');
    case 'Statistics':
      return i18n.t('tab.statistics');
    case 'Settings':
      return i18n.t('tab.settings');
    default:
      return i18n.t('tab.home');
  }
};
