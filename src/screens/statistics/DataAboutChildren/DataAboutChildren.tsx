import React from 'react';
import { View, ViewStyle } from 'react-native';
import { DataTable, Headline } from 'react-native-paper';
import i18n from 'i18n-js';

const DataAboutChildren: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={style}>
    <Headline>{i18n.t('statistics.children.headline')}</Headline>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>{i18n.t('statistics.children.label')}</DataTable.Title>
        <DataTable.Title numeric>
          {i18n.t('statistics.children.data')}
        </DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>{i18n.t('statistics.children.cell1')}</DataTable.Cell>
        <DataTable.Cell numeric>33%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>{i18n.t('statistics.children.cell2')}</DataTable.Cell>
        <DataTable.Cell numeric>25%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>{i18n.t('statistics.children.cell3')}</DataTable.Cell>
        <DataTable.Cell numeric>
          {i18n.t('statistics.children.cell3Data')}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>{i18n.t('statistics.children.cell4')}</DataTable.Cell>
        <DataTable.Cell numeric>
          {i18n.t('statistics.children.cell4Data')}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>{i18n.t('statistics.children.cell5')}</DataTable.Cell>
        <DataTable.Cell numeric>
          {i18n.t('statistics.children.cell5Data')}
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  </View>
);

export default DataAboutChildren;
