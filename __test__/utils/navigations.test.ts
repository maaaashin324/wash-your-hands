import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { getHeaderTitle } from '@/utils/navigations';
import en from '@/locales/en.json';
import ja from '@/locales/ja.json';

i18n.translations = { en, ja };
i18n.locale = Localization.locale;
i18n.fallbacks = true;

describe('getHeadherTitle', () => {
  test('should return home title when state is not set', () => {
    const result = getHeaderTitle({
      state: undefined,
      descriptors: undefined,
      navigation: undefined,
    });
    expect(result).toBe(i18n.t('tab.home'));
  });

  test('should return How to Wash title when state is not set', () => {
    const result = getHeaderTitle({
      // eslint-disable-next-line
      // @ts-ignore
      state: {
        routes: [
          {
            name: 'Home',
            key: undefined,
          },
          {
            name: 'How To Wash',
            key: undefined,
          },
        ],
        index: 1,
      },
      descriptors: undefined,
      navigation: undefined,
    });
    expect(result).toBe(i18n.t('tab.howToWash'));
  });

  test('should return Statistics title when state is not set', () => {
    const result = getHeaderTitle({
      // eslint-disable-next-line
      // @ts-ignore
      state: {
        routes: [
          {
            name: 'Home',
            key: undefined,
          },
          {
            name: 'Statistics',
            key: undefined,
          },
        ],
        index: 1,
      },
      descriptors: undefined,
      navigation: undefined,
    });
    expect(result).toBe(i18n.t('tab.statistics'));
  });

  test('should return Statistics title when state is not set', () => {
    const result = getHeaderTitle({
      // eslint-disable-next-line
      // @ts-ignore
      state: {
        routes: [
          {
            name: 'Home',
            key: undefined,
          },
          {
            name: 'Settings',
            key: undefined,
          },
        ],
        index: 1,
      },
      descriptors: undefined,
      navigation: undefined,
    });
    expect(result).toBe(i18n.t('tab.settings'));
  });
});
