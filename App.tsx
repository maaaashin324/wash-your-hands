import React from 'react';
import * as TaskManager from 'expo-task-manager';
import { GET_LOCATION_TASK } from '@constants/task';
import { makeNotifications } from '@utils/task';
import { Provider as PaperProvider } from 'react-native-paper';
import MyApp from './src';

const App: React.FC<{}> = () => (
  <PaperProvider>
    <MyApp />
  </PaperProvider>
);

TaskManager.defineTask(GET_LOCATION_TASK, makeNotifications);

export default App;
