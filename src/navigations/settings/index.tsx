import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '@screens/settings';

const SettingsStack = createStackNavigator();

const SettingsNavigator: React.FC<{}> = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

export default SettingsNavigator;
