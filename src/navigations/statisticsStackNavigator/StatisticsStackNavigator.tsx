import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StatisticsScreen from '@screens/statistics';

const StatisticsStack = createStackNavigator();

const StatisticsNavigator: React.FC<{}> = () => (
  <StatisticsStack.Navigator screenOptions={{ headerShown: false }}>
    <StatisticsStack.Screen name="Statistics" component={StatisticsScreen} />
  </StatisticsStack.Navigator>
);

export default StatisticsNavigator;
