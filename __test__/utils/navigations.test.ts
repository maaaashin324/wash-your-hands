import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {
  HomeScreenRouteProp,
  HowToWashScreenRouteProp,
  SettingsScreenRouteProp,
  StatisticsScreenRouteProp,
  RouteType,
} from '@types';
import { getHeaderTitle } from '@/utils/navigations';
import en from '@/locales/en.json';
import ja from '@/locales/ja.json';

type GetHeaderTitleParamType =
  | HomeScreenRouteProp
  | HowToWashScreenRouteProp
  | SettingsScreenRouteProp
  | StatisticsScreenRouteProp;

i18n.translations = { en, ja };
i18n.locale = Localization.locale;
i18n.fallbacks = true;

describe('getHeadherTitle', () => {
  test('should return home title when state is not set', () => {
    const route: GetHeaderTitleParamType | RouteType = {
      name: 'Home',
      key: 'Home',
    };
    const result = getHeaderTitle(route);
    expect(result).toBe(i18n.t('tab.home'));
  });

  test('should return How to Wash title when state is not set', () => {
    const route: GetHeaderTitleParamType | RouteType = {
      name: 'HowToWash',
      key: 'HowToWash',
    };
    const result = getHeaderTitle(route);
    expect(result).toBe(i18n.t('tab.howToWash'));
  });

  test('should return Statistics title when state is not set', () => {
    const route: GetHeaderTitleParamType | RouteType = {
      name: 'Statistics',
      key: 'Statistics',
    };
    const result = getHeaderTitle(route);
    expect(result).toBe(i18n.t('tab.statistics'));
  });

  test('should return YouTube title when state is not set', () => {
    const route: GetHeaderTitleParamType | RouteType = {
      name: 'YouTube',
      key: 'YouTube',
    };
    const result = getHeaderTitle(route);
    expect(result).toBe(i18n.t('tab.youTube'));
  });

  test('should return Settings title when state is not set', () => {
    const route: GetHeaderTitleParamType | RouteType = {
      name: 'Settings',
      key: 'Settings',
    };
    const result = getHeaderTitle(route);
    expect(result).toBe(i18n.t('tab.settings'));
  });
});
