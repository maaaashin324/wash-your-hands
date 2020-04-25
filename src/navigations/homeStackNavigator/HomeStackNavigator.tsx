import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/home';

const HomeStack = createStackNavigator();

const HomeStackNavigator: React.FC<{}> = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
