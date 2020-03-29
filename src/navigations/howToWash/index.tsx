import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HowToWashScreen from '@screens/howToWash';

const HowToWashStack = createStackNavigator();

const HowToWashNavigator: React.FC<{}> = () => (
  <HowToWashStack.Navigator>
    <HowToWashStack.Screen name="HowToWash" component={HowToWashScreen} />
  </HowToWashStack.Navigator>
);

export default HowToWashNavigator;
