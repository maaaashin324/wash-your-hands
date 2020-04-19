import React, { useLayoutEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import TabBarIcon from '@components/tabBarIcon';
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
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }): React.ReactNode => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="How To Wash"
        component={HowToWashStackScreen}
        options={{
          tabBarIcon: ({ focused }): React.ReactNode => (
            <TabBarIcon name="play-circle-filled" focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Statistics"
        component={StatisticsStackScreen}
        options={{
          tabBarIcon: ({ focused }): React.ReactNode => (
            <TabBarIcon name="insert-chart" focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStackScreen}
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
