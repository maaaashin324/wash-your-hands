import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import TabBarIcon from '@components/tabBarIcon';
import { INITIAL_ROUTE_NAME } from '@constants/navigations';
// import { getHeaderTitle } from '@utils/navigations';
import HomeStackNavigator from './homeStackNavigator';
import HowToWashStackNavigator from './howToWashStackNavigator';
import StatisticsStackNavigator from './statisticsStackNavigator';
import SettingsStackNavigator from './settingsStackNavigator';

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

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = () => {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }): React.ReactNode => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="How To Wash"
        component={HowToWashStackNavigator}
        options={{
          tabBarIcon: ({ focused }): React.ReactNode => (
            <TabBarIcon name="play-circle-filled" focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Statistics"
        component={StatisticsStackNavigator}
        options={{
          tabBarIcon: ({ focused }): React.ReactNode => (
            <TabBarIcon name="insert-chart" focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ focused }): React.ReactNode => (
            <TabBarIcon name="settings" focused={focused} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
