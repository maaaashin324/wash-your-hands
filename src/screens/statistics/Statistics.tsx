import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Divider } from 'react-native-paper';
import DataAboutPrevention from './DataAboutPrevention';
import DataAboutChildren from './DataAboutChildren';
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
  divider: {
    marginTop: 20,
  },
  quotesView: {
    marginTop: 20,
  },
});

const StatisticsScreen: React.FC<{}> = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <DataAboutPrevention />
      <DataAboutChildren style={styles.childrenView} />
      <AntibioticResistanceData style={styles.antibioticsResitanceView} />
      <Divider style={styles.divider} />
      <Quotes style={styles.quotesView} />
    </ScrollView>
  </SafeAreaView>
);

export default StatisticsScreen;
