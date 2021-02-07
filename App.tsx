import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import * as Localization from 'expo-localization';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import i18n from 'i18n-js';
import TaskService from '@/class/task';
import COLORS from '@constants/colors';
import MyApp from './src';
import en from './src/locales/en.json';
import ja from './src/locales/ja.json';

TaskService.defineTask();

i18n.translations = { en, ja };
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.themeColor,
    accent: COLORS.accentColor,
  },
};

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
    <PaperProvider theme={theme}>
      <MyApp />
    </PaperProvider>
  );
};

export default App;
