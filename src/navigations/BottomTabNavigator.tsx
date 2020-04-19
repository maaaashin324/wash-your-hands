import React, { useLayoutEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
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

type RootStackParamList = {
  BottomTab: undefined;
};

type BottomTabScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BottomTab'
>;

type BottomTabNavigatorProps = {
  route: BottomTabBarProps;
  navigation: BottomTabScreenNavigationProp;
};

const getHeaderTitle = (route: BottomTabBarProps): string => {
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

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  navigation,
  route,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }): React.ReactNode => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="How To Wash"
        component={HowToWashStackScreen}
        options={{
          tabBarIcon: ({ color, size }): React.ReactNode => (
            <MaterialIcons
              name="play-circle-filled"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Statistics"
        component={StatisticsStackScreen}
        options={{
          tabBarIcon: ({ color, size }): React.ReactNode => (
            <MaterialIcons name="insert-chart" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color, size }): React.ReactNode => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
