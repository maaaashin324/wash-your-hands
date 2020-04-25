import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackHeaderProps,
} from '@react-navigation/stack';
import { SettingsStackParamList, SettingsScreenProps } from '@types';
import SettingsScreen from '@screens/settings';
import { getHeaderTitle } from '@/utils';
import Header from '@/components/header';

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsStackNavigator: React.FC<{}> = () => (
  <SettingsStack.Navigator
    screenOptions={({
      route,
    }: SettingsScreenProps): StackNavigationOptions => ({
      headerTitle: getHeaderTitle(route),
      header: (props: StackHeaderProps): React.ReactNode => (
        <Header {...props} />
      ),
    })}
  >
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

export default SettingsStackNavigator;
