import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { HomeStackParamList, HomeScreenProps } from '@types';
import HomeScreen from '@screens/home';
import { getHeaderTitle } from '@/utils';

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC<{}> = () => (
  <HomeStack.Navigator
    screenOptions={({ route }: HomeScreenProps): StackNavigationOptions => ({
      headerTitle: getHeaderTitle(route),
    })}
  >
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
