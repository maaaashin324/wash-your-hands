import React from 'react';
import { View, ViewStyle } from 'react-native';
import { DataTable, Headline } from 'react-native-paper';

const DataAboutChildren: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={style}>
    <Headline>Data about children</Headline>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Label</DataTable.Title>
        <DataTable.Title numeric>Data</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>
          Reduce young children who get sick with diarrhea
        </DataTable.Cell>
        <DataTable.Cell numeric>33%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Reduce young children with respiratory</DataTable.Cell>
        <DataTable.Cell numeric>25%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Improve attendance in school</DataTable.Cell>
        <DataTable.Cell numeric>Some extend</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>
          Improve child development in some settings
        </DataTable.Cell>
        <DataTable.Cell numeric>Some extend</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Handwashing after using the toilet</DataTable.Cell>
        <DataTable.Cell numeric>Only 19%!!</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  </View>
);

export default DataAboutChildren;
