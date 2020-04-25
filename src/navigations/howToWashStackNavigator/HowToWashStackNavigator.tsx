import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HowToWashScreen from '@screens/howToWash';
import YouTubeScreen from '@screens/youTube';

const HowToWashStack = createStackNavigator();

const HowToWashStackNavigator: React.FC<{}> = () => (
  <HowToWashStack.Navigator>
    <HowToWashStack.Screen name="HowToWash" component={HowToWashScreen} />
    <HowToWashStack.Screen name="YouTube" component={YouTubeScreen} />
  </HowToWashStack.Navigator>
);

export default HowToWashStackNavigator;
