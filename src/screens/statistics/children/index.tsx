import React from 'react';
import { DataTable } from 'react-native-paper';

const DataAboutChildren: React.FC<{}> = () => (
  <DataTable>
    <DataTable.Header>
      <DataTable.Title>Label</DataTable.Title>
      <DataTable.Title numeric>Data</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>
        Reduce young children who get sick with diarrhea
      </DataTable.Cell>
      <DataTable.Cell>33%</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Reduce young children with respiratory</DataTable.Cell>
      <DataTable.Cell>25%</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Improve attendance in school</DataTable.Cell>
      <DataTable.Cell>Some extend</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>
        Improve child development in some settings
      </DataTable.Cell>
      <DataTable.Cell>Some extend</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Handwashing after using the toilet</DataTable.Cell>
      <DataTable.Cell>Only 19%!!</DataTable.Cell>
    </DataTable.Row>
  </DataTable>
);

export default DataAboutChildren;
