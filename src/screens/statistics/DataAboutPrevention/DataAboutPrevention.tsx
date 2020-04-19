import React from 'react';
import { View, ViewStyle } from 'react-native';
import { DataTable, Headline } from 'react-native-paper';
import i18n from 'i18n-js';

const DataAboutPrevention: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={style}>
    <Headline>{i18n.t('statistics.prevention.headline')}</Headline>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>
          {i18n.t('statistics.prevention.label')}
        </DataTable.Title>
        <DataTable.Title numeric>
          {i18n.t('statistics.prevention.data')}
        </DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>{i18n.t('statistics.prevention.cell1')}</DataTable.Cell>
        <DataTable.Cell numeric>23-40%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>{i18n.t('statistics.prevention.cell2')}</DataTable.Cell>
        <DataTable.Cell numeric>58%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>{i18n.t('statistics.prevention.cell3')}</DataTable.Cell>
        <DataTable.Cell numeric>16-21%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>{i18n.t('statistics.prevention.cell4')}</DataTable.Cell>
        <DataTable.Cell numeric>29-57%</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  </View>
);

export default DataAboutPrevention;
