import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/home';
import HowToWashScreen from '@screens/howToWash';
import StatisticsScreen from '@screens/statistics';

const Tab = createBottomTabNavigator();

const Navigator: React.FC<{}> = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="HowToWash" component={HowToWashScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Navigator;
