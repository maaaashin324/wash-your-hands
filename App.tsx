import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { Provider as PaperProvider } from 'react-native-paper';
import { GET_LOCATION_TASK, TIMER_TASK } from '@constants/task';
import { makeNotifications, makeTimerNotifications } from '@utils/task';
import MyApp from './src';

const App: React.FC<{}> = () => {
  const [isSplashReady, setSplashReady] = useState<boolean>(false);
  const [isAppReady, setAppReady] = useState<boolean>(false);

  const cacheSplashResourcesAsync = async (): Promise<void> => {
    // eslint-disable-next-line
    const png = require('./src/assets/splash.png');
    return Asset.fromModule(png).downloadAsync();
  };

  const cacheResourcesAsync = async (): Promise<void> => {
    SplashScreen.hide();
    const images = [
      // eslint-disable-next-line
      require('./src/assets/icon.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    setAppReady(true);
  };

  if (!isSplashReady) {
    return (
      <AppLoading
        startAsync={cacheSplashResourcesAsync}
        onFinish={(): void => setSplashReady(true)}
        autoHideSplash={false}
      />
    );
  }
  if (!isAppReady) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          // eslint-disable-next-line
          source={require('./src/assets/splash.png')}
          onLoad={cacheResourcesAsync}
        />
      </View>
    );
  }
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
