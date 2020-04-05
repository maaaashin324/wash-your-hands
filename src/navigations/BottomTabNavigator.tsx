import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
// eslint-disable-next-line
import { MaterialIcons } from '@expo/vector-icons';
import i18n from 'i18n-js';
import HomeStackScreen from './home';
import HowToWashStackScreen from './howToWash';
import StatisticsStackScreen from './statistics';
import SettingsStackScreen from './settings';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = i18n.t('tab.home');

const BottomTabNavigator: React.FC<{}> = () => (
  <BottomTab.Navigator
    initialRouteName={INITIAL_ROUTE_NAME}
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
    <BottomTab.Screen name={i18n.t('tab.home')} component={HomeStackScreen} />
    <BottomTab.Screen
      name={i18n.t('tab.howToWash')}
      component={HowToWashStackScreen}
    />
    <BottomTab.Screen
      name={i18n.t('tab.statistics')}
      component={StatisticsStackScreen}
    />
    <BottomTab.Screen
      name={i18n.t('tab.settings')}
      component={SettingsStackScreen}
    />
  </BottomTab.Navigator>
);

export default BottomTabNavigator;
