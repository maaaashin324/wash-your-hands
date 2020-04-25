import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackHeaderProps,
} from '@react-navigation/stack';
import { StatisticsStackParamList, StatisticsScreenProps } from '@types';
import StatisticsScreen from '@screens/statistics';
import { getHeaderTitle } from '@/utils';
import Header from '@/components/header';

const StatisticsStack = createStackNavigator<StatisticsStackParamList>();

const StatisticsNavigator: React.FC<{}> = () => (
  <StatisticsStack.Navigator
    screenOptions={({
      route,
    }: StatisticsScreenProps): StackNavigationOptions => ({
      headerTitle: getHeaderTitle(route),
      header: (props: StackHeaderProps): React.ReactNode => (
        <Header {...props} />
      ),
    })}
  >
    <StatisticsStack.Screen name="Statistics" component={StatisticsScreen} />
  </StatisticsStack.Navigator>
);

export default StatisticsNavigator;
