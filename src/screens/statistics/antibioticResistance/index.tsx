import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';

const AntibioticResistance: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={style}>
    <Headline>Antibiotic Resistance</Headline>
    <Paragraph>
      You can help prevent the overuse of antibiotics—the single most important
      factor leading to antibiotic resistance around the world.
    </Paragraph>
  </View>
);

export default AntibioticResistance;
