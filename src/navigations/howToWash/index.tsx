import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HowToWashScreen from '@screens/howToWash';
import YouTubeScreen from '@screens/youTube';

const HowToWashStack = createStackNavigator();

const HowToWashNavigator: React.FC<{}> = () => (
  <HowToWashStack.Navigator screenOptions={{ headerShown: false }}>
    <HowToWashStack.Screen name="HowToWash" component={HowToWashScreen} />
    <HowToWashStack.Screen name="YouTube" component={YouTubeScreen} />
  </HowToWashStack.Navigator>
);

export default HowToWashNavigator;
