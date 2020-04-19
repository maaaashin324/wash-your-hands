import React, { useLayoutEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
// eslint-disable-next-line
import { MaterialIcons } from '@expo/vector-icons';
import { INITIAL_ROUTE_NAME } from '@constants/navigations';
import { getHeaderTitle } from '@utils/navigations';
import HomeStackScreen from './home';
import HowToWashStackScreen from './howToWash';
import StatisticsStackScreen from './statistics';
import SettingsStackScreen from './settings';

const BottomTab = createBottomTabNavigator();

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
