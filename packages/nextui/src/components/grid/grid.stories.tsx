import React from 'react';
import { Meta } from '@storybook/react';
import Grid from './index';
import { Card, Spacer } from '@components';

export default {
  title: 'Layout/Grid',
  component: Grid,
} as Meta;

const MockItem = () => {
  return (
    <Card color="primary" shadow style={{ width: '100%', height: '100px' }} />
  );
};

export const Default = () => (
  <Grid.Container gap={2} justify="center">
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
  </Grid.Container>
);

export const Fluid = () => (
  <Grid.Container gap={2} justify="center">
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
  </Grid.Container>
);

export const Responsive = () => (
  <Grid.Container gap={2} justify="center">
    <Grid xs={12} md={6}>
      <MockItem />
    </Grid>
    <Grid xs={12} md={6}>
      <MockItem />
    </Grid>
    <Grid xs={6} md={3}>
      <MockItem />
    </Grid>
    <Grid xs={6} md={2}>
      <MockItem />
    </Grid>
    <Grid xs={6} md={3}>
      <MockItem />
    </Grid>
  </Grid.Container>
);

export const HideElements = () => (
  <Grid.Container gap={2} justify="center">
    <Grid xs={0} md={6}>
      <MockItem />
    </Grid>
    <Grid xs={0} md={6}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
  </Grid.Container>
);

export const AutoWidth = () => (
  <>
    <Grid.Container gap={2} justify="center">
      <Grid xs>
        <MockItem />
      </Grid>
      <Grid xs>
        <MockItem />
      </Grid>
      <Grid xs>
        <MockItem />
      </Grid>
    </Grid.Container>
    <Spacer y={1} />
    <Grid.Container gap={2} justify="center">
      <Grid xs>
        <MockItem />
      </Grid>
      <Grid xs={12}>
        <MockItem />
      </Grid>
      <Grid xs>
        <MockItem />
      </Grid>
    </Grid.Container>
  </>
);
