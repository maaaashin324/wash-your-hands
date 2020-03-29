import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import PreventionData from './prevention';
import ChildrenData from './children';
import AntibioticResistanceData from './antibioticResistance';
import Quotes from './quotes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginBottom: 20,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  childrenView: {
    marginTop: 20,
  },
  antibioticsResitanceView: {
    marginTop: 20,
  },
  quotesView: {
    marginTop: 20,
  },
});

const StatisticsScreen: React.FC<{}> = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <PreventionData />
      <ChildrenData style={styles.childrenView} />
      <AntibioticResistanceData style={styles.antibioticsResitanceView} />
      <Quotes style={styles.quotesView} />
    </ScrollView>
  </SafeAreaView>
);

export default StatisticsScreen;
