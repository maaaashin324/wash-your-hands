import React from 'react';
import { DataTable, Subheading } from 'react-native-paper';

const DataAboutPrevention: React.FC<{}> = () => (
  <>
    <Subheading>Data about Prevention</Subheading>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Reduces...</DataTable.Title>
        <DataTable.Title numeric>Data</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Sick with diarrhea</DataTable.Cell>
        <DataTable.Cell numeric>23-40%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Sick with diarrhea/weakened immune</DataTable.Cell>
        <DataTable.Cell numeric>58%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Respiratory illnesses</DataTable.Cell>
        <DataTable.Cell numeric>16-21%</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Absenteeism in schoolchildren</DataTable.Cell>
        <DataTable.Cell numeric>29-57%</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  </>
);

export default DataAboutPrevention;
