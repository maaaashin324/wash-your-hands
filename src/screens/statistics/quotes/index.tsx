import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Subheading, Paragraph } from 'react-native-paper';

const Quotes: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={style}>
    <Subheading>Quotes</Subheading>
    <Paragraph>CDC: Show Me the Science - Why Wash Your Hands?</Paragraph>
    <Paragraph>https://www.cdc.gov/handwashing/why-handwashing.html</Paragraph>
  </View>
);

export default Quotes;
