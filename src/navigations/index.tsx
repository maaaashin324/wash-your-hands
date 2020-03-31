import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
// eslint-disable-next-line
import { MaterialIcons } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import TRANSLATIONS from '@constants/translations';
import HomeStackScreen from './home';
import HowToWashStackScreen from './howToWash';
import StatisticsStackScreen from './statistics';
import SettingsStackScreen from './settings';

i18n.translations = TRANSLATIONS;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Tab = createBottomTabNavigator();

const Navigator: React.FC<{}> = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ color, size }): React.ReactNode => {
          if (route.name === 'Home') {
            return <MaterialIcons name="home" color={color} size={size} />;
          }
          if (route.name === 'How To Wash') {
            return (
              <MaterialIcons
                name="play-circle-filled"
                color={color}
                size={size}
              />
            );
          }
          if (route.name === 'Statistics') {
            return (
              <MaterialIcons name="insert-chart" color={color} size={size} />
            );
          }
          return <MaterialIcons name="settings" color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen name={i18n.t('tab.home')} component={HomeStackScreen} />
      <Tab.Screen
        name={i18n.t('tab.howToWash')}
        component={HowToWashStackScreen}
      />
      <Tab.Screen
        name={i18n.t('tab.statistics')}
        component={StatisticsStackScreen}
      />
      <Tab.Screen
        name={i18n.t('tab.settings')}
        component={SettingsStackScreen}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Navigator;
