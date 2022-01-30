import React from 'react';
import { Meta } from '@storybook/react';
import Table from './table';

export default {
  title: 'Display/Table',
  component: Table,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '90%' }}>
        <Story />
      </div>
    )
  ]
} as Meta;

type User = {
  name: string;
  role: string;
  status: string;
};

const rows: User[] = [
  {
    name: 'Zoey Lang',
    role: 'developer',
    status: 'active'
  },
  {
    name: 'Zoey Lang',
    role: 'developer',
    status: 'active'
  },
  {
    name: 'Zoey Lang',
    role: 'developer',
    status: 'active'
  },
  {
    name: 'Zoey Lang',
    role: 'developer',
    status: 'active'
  },
  {
    name: 'Zoey Lang',
    role: 'developer',
    status: 'active'
  },
  {
    name: 'Zoey Lang',
    role: 'developer',
    status: 'active'
  }
];

const columns = [
  {
    field: 'name',
    label: 'Name',
    width: 240,
    sortable: false,
    renderCell: (rowData: any) => {
      return (
        <a
          target="_blank"
          rel="noreferrer"
          href={rowData.formattedValue as string}
        >
          {rowData.formattedValue}
        </a>
      );
    }
  },
  {
    field: 'role',
    label: 'Role',
    width: 140,
    sortable: false,
    renderCell: (rowData: any) => {
      return (
        <a
          target="_blank"
          rel="noreferrer"
          href={rowData.formattedValue as string}
        >
          {rowData.formattedValue}
        </a>
      );
    }
  },
  {
    field: 'status',
    label: 'Status',
    width: 140,
    sortable: false,
    renderCell: (rowData: any) => {
      return (
        <a
          target="_blank"
          rel="noreferrer"
          href={rowData.formattedValue as string}
        >
          {rowData.formattedValue}
        </a>
      );
    }
  },
  {
    field: 'action',
    label: 'Action',
    width: 140,
    sortable: false,
    renderCell: (rowData: any) => {
      return (
        <a
          target="_blank"
          rel="noreferrer"
          href={rowData.formattedValue as string}
        >
          {rowData.formattedValue}
        </a>
      );
    }
  }
];

export const Default = () => <Table columns={columns} rows={rows} />;
