import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Subheading, Paragraph } from 'react-native-paper';
import i18n from 'i18n-js';

const Quotes: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={style}>
    <Subheading>{i18n.t('statistics.quotes.subheading')}</Subheading>
    <Paragraph>{i18n.t('statistics.quotes.paragraph1')}</Paragraph>
    <Paragraph>{i18n.t('statistics.quotes.paragraph2')}</Paragraph>
  </View>
);

export default Quotes;
