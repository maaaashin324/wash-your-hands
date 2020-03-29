import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 100,
  },
  sentence: {
    fontSize: 50,
  },
});

const SettingScreen: React.FC<{}> = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Setting</Text>
    <Text style={styles.sentence}>You can channge your settings</Text>
  </View>
);

export default SettingScreen;
