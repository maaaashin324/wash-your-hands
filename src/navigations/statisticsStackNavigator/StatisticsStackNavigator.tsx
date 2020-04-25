import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { StatisticsStackParamList, StatisticsScreenProps } from '@types';
import StatisticsScreen from '@screens/statistics';
import { getHeaderTitle } from '@/utils';

const StatisticsStack = createStackNavigator<StatisticsStackParamList>();

const StatisticsNavigator: React.FC<{}> = () => (
  <StatisticsStack.Navigator
    screenOptions={({
      route,
    }: StatisticsScreenProps): StackNavigationOptions => ({
      headerTitle: getHeaderTitle(route),
    })}
  >
    <StatisticsStack.Screen name="Statistics" component={StatisticsScreen} />
  </StatisticsStack.Navigator>
);

export default StatisticsNavigator;
