import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import BottomTabNavigator from './BottomTabNavigator';
import en from '../locales/en.json';
import ja from '../locales/ja.json';

i18n.translations = { en, ja };
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Navigator: React.FC<{}> = () => (
  <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
);

export default Navigator;
