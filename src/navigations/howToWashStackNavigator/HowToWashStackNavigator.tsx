import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackHeaderProps,
} from '@react-navigation/stack';
import { HowToWashStackParamList, HowToWashScreenProps } from '@types';
import HowToWashScreen from '@screens/howToWash';
import YouTubeScreen from '@screens/youTube';
import { getHeaderTitle } from '@/utils';
import Header from '@/components/header';

const HowToWashStack = createStackNavigator<HowToWashStackParamList>();

const HowToWashStackNavigator: React.FC<{}> = () => (
  <HowToWashStack.Navigator
    screenOptions={({
      route,
    }: HowToWashScreenProps): StackNavigationOptions => ({
      headerTitle: getHeaderTitle(route),
      header: (props: StackHeaderProps): React.ReactNode => (
        <Header {...props} />
      ),
    })}
  >
    <HowToWashStack.Screen name="HowToWash" component={HowToWashScreen} />
    <HowToWashStack.Screen name="YouTube" component={YouTubeScreen} />
  </HowToWashStack.Navigator>
);

export default HowToWashStackNavigator;
