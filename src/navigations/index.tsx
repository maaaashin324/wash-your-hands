import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
// eslint-disable-next-line
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '@screens/home';
import HowToWashStackScreen from './howToWash';
import StatisticsStackScreen from './statistics';
import SettingsStackScreen from './settings';

const Tab = createBottomTabNavigator();

const Navigator: React.FC<{}> = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ color, size }): React.ReactNode => {
          if (route.name === 'Home') {
            return <MaterialIcons name="home" color={color} size={size} />;
          }
          if (route.name === 'How To Wash') {
            return (
              <MaterialIcons
                name="play-circle-filled"
                color={color}
                size={size}
              />
            );
          }
          if (route.name === 'Statistics') {
            return (
              <MaterialIcons name="insert-chart" color={color} size={size} />
            );
          }
          return <MaterialIcons name="settings" color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="How To Wash" component={HowToWashStackScreen} />
      <Tab.Screen name="Statistics" component={StatisticsStackScreen} />
      <Tab.Screen name="Setting" component={SettingsStackScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Navigator;
