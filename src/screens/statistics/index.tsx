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

const StatisticsScreen: React.FC<{}> = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Statistics</Text>
    <Text style={styles.sentence}>手を洗うことでこんな効果がある</Text>
  </View>
);

export default StatisticsScreen;
