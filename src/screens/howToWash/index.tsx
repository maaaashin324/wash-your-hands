import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HowToWashScreen: React.FC<{}> = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Details Screen</Text>
  </View>
);

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

export default HowToWashScreen;
