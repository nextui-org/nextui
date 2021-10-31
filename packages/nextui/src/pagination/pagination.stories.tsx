import React from 'react';
import { Meta } from '@storybook/react';
import Pagination from './pagination';
import { Grid } from '../index';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <Grid.Container gap={2} xs={6}>
        <Story />
      </Grid.Container>
    )
  ]
} as Meta;

export const Default = () => <Pagination total={20} initialPage={3} />;

export const Limit = () => (
  <>
    <Grid xs={12}>
      <Pagination total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination total={5} />
    </Grid>
    <Grid xs={12}>
      <Pagination total={10} initialPage={6} />
    </Grid>
    <Grid xs={12}>
      <Pagination total={10} initialPage={6} />
    </Grid>
    <Grid xs={12}>
      <Pagination total={30} initialPage={6} />
    </Grid>
  </>
);
