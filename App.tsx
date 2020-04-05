import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import { Provider as PaperProvider } from 'react-native-paper';
import { defineTask, initTask } from '@utils/task';
import MyApp from './src';

const App: React.FC<{}> = () => {
  const [isSplashReady, setSplashReady] = useState<boolean>(false);
  const [isAppReady, setAppReady] = useState<boolean>(false);

  useEffect(() => {
    initTask();
  }, []);

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

defineTask();

export default App;
