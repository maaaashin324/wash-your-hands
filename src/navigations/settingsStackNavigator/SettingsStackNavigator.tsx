import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { SettingsStackParamList, SettingsScreenProps } from '@types';
import SettingsScreen from '@screens/settings';
import { getHeaderTitle } from '@/utils';

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsStackNavigator: React.FC<{}> = () => (
  <SettingsStack.Navigator
    screenOptions={({
      route,
    }: SettingsScreenProps): StackNavigationOptions => ({
      headerTitle: getHeaderTitle(route),
    })}
  >
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

export default SettingsStackNavigator;
