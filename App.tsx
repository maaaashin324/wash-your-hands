import React, { useEffect } from 'react';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { Provider as PaperProvider } from 'react-native-paper';
import { GET_LOCATION_TASK, TIMER_TASK } from '@constants/task';
import { makeNotifications, makeTimerNotifications } from '@utils/task';
import MyApp from './src';

const App: React.FC<{}> = () => {
  useEffect(() => {});
  return (
    <PaperProvider>
      <MyApp />
    </PaperProvider>
  );
};

if (TaskManager.isTaskDefined(GET_LOCATION_TASK)) {
  TaskManager.defineTask(GET_LOCATION_TASK, makeNotifications);
  BackgroundFetch.registerTaskAsync(GET_LOCATION_TASK, { minimumInterval: 30 });
}
if (TaskManager.isTaskDefined(TIMER_TASK)) {
  TaskManager.defineTask(TIMER_TASK, makeTimerNotifications);
  BackgroundFetch.registerTaskAsync(TIMER_TASK, { minimumInterval: 30 });
}

export default App;
