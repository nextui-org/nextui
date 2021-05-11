import React from 'react';
import { Meta } from '@storybook/react';
import Row from './index';
import { Card, Grid, Spacer } from '@components';

export default {
  title: 'Layout/Row',
  component: Row,
  decorators: [
    (Story) => (
      <Grid.Container justify="center" direction="column">
        <Story />
      </Grid.Container>
    ),
  ],
} as Meta;

const MockItem = () => {
  return (
    <Card color="primary" shadow style={{ width: '100%', height: '40px' }} />
  );
};

export const Default = () => (
  <>
    <Row>
      <MockItem />
    </Row>
    <Spacer y={1} />
    <Row>
      <MockItem />
    </Row>
    <Spacer y={1} />
    <Row>
      <MockItem />
    </Row>
    <Spacer y={1} />
    <Row>
      <MockItem />
    </Row>
  </>
);
