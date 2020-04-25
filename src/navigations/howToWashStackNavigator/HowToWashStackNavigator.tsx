import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { HowToWashStackParamList, HowToWashScreenProps } from '@types';
import HowToWashScreen from '@screens/howToWash';
import YouTubeScreen from '@screens/youTube';
import { getHeaderTitle } from '@/utils';

const HowToWashStack = createStackNavigator<HowToWashStackParamList>();

const HowToWashStackNavigator: React.FC<{}> = () => (
  <HowToWashStack.Navigator
    screenOptions={({
      route,
    }: HowToWashScreenProps): StackNavigationOptions => ({
      headerTitle: getHeaderTitle(route),
    })}
  >
    <HowToWashStack.Screen name="HowToWash" component={HowToWashScreen} />
    <HowToWashStack.Screen name="YouTube" component={YouTubeScreen} />
  </HowToWashStack.Navigator>
);

export default HowToWashStackNavigator;
