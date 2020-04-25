import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const Navigator: React.FC<{}> = () => (
  <>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default Navigator;
