import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '@screens/settings';

const SettingsStack = createStackNavigator();

const SettingsStackNavigator: React.FC<{}> = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

export default SettingsStackNavigator;