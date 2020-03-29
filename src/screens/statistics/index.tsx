import React from 'react';
import { StyleSheet, View } from 'react-native';
import PreventionData from './prevention';
import ChildrenData from './children';
import AntibioticResistanceData from './antibioticResistance';
import Quotes from './quotes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const StatisticsScreen: React.FC<{}> = () => (
  <View style={styles.container}>
    <PreventionData />
    <ChildrenData />
    <AntibioticResistanceData />
    <Quotes />
  </View>
);

export default StatisticsScreen;
