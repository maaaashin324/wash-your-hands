import React from 'react';
import * as TaskManager from 'expo-task-manager';
import { GET_LOCATION_TASK, TIMER_TASK } from '@constants/task';
import { makeNotifications, makeTimerNotifications } from '@utils/task';
import { Provider as PaperProvider } from 'react-native-paper';
import MyApp from './src';

const App: React.FC<{}> = () => (
  <PaperProvider>
    <MyApp />
  </PaperProvider>
);

TaskManager.defineTask(GET_LOCATION_TASK, makeNotifications);
TaskManager.defineTask(TIMER_TASK, makeTimerNotifications);

export default App;
