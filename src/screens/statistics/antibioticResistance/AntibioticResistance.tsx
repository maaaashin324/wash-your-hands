import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import i18n from 'i18n-js';

const AntibioticResistance: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={style}>
    <Headline>{i18n.t('statistics.antibiotics.headline')}</Headline>
    <Paragraph>{i18n.t('statistics.antibiotics.paragraph')}</Paragraph>
  </View>
);

export default AntibioticResistance;
