import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/home';
import SettingScreen from '@screens/setting';
import HowToWashStackScreen from './howToWash';
import StatisticsStackScreen from './statistics';

const Tab = createBottomTabNavigator();

const Navigator: React.FC<{}> = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="HowToWash" component={HowToWashStackScreen} />
      <Tab.Screen name="Statistics" component={StatisticsStackScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Navigator;
