import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HomeScreen: React.FC<{}> = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Wash your hands</Text>
    <Text style={styles.sentence}>
      Why not wash your hands to guard you from COVID19?
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 100,
  },
  sentence: {
    fontSize: 50,
  },
});

export default HomeScreen;
