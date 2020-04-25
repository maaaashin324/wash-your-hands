import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackHeaderProps,
} from '@react-navigation/stack';
import { HomeStackParamList, HomeScreenProps } from '@types';
import HomeScreen from '@screens/home';
import { getHeaderTitle } from '@/utils';
import Header from '@/components/header';

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC<{}> = () => (
  <HomeStack.Navigator
    screenOptions={({ route }: HomeScreenProps): StackNavigationOptions => ({
      headerTitle: getHeaderTitle(route),
      header: (props: StackHeaderProps): React.ReactNode => (
        <Header {...props} />
      ),
    })}
  >
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
