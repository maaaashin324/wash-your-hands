import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 100,
  },
});

const HowToWashScreen: React.FC<{}> = () => (
  <View style={styles.container}>
    <WebView
      source={{
        uri: 'https://www.youtube.com/watch?v=IisgnbMfKvI&autoplay=1',
      }}
    />
  </View>
);

export default HowToWashScreen;
