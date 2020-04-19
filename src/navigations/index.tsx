import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import BottomTabNavigator from './BottomTabNavigator';
import en from '../locales/en.json';
import ja from '../locales/ja.json';

i18n.translations = { en, ja };
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Stack = createStackNavigator();

const Navigator: React.FC<{}> = () => (
  <>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default Navigator;
