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
  records: Array<{ date: string }>;
};

const data: User[] = [
  { name: 'Zoey Lang', role: 'developer', records: [{ date: '2022-29-01' }] }
];

export const Default = () => <Table data={data} />;
