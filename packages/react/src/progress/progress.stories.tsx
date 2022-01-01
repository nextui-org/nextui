import React from 'react';
import { Meta } from '@storybook/react';
import Progress from './index';
import { Spacer, Grid } from '../index';

export default {
  title: 'General/Progress',
  component: Progress,
  decorators: [
    (Story) => (
      <Grid.Container xs={4}>
        <Story />
      </Grid.Container>
    )
  ]
} as Meta;

export const Default = () => {
  return <Progress value={70} />;
};

export const Colors = () => (
  <>
    <Progress value={50} color="primary" />
    <Spacer y={0.5} />
    <Progress value={30} color="secondary" />
    <Spacer y={0.5} />
    <Progress value={70} color="success" />
    <Spacer y={0.5} />
    <Progress value={90} color="warning" />
    <Spacer y={0.5} />
    <Progress value={30} color="error" />
    <Spacer y={0.5} />
    <Progress value={70} color="gradient" />
  </>
);

export const Sizes = () => (
  <>
    <Progress size="xs" value={10} />
    <Spacer y={1} />
    <Progress size="sm" value={20} />
    <Spacer y={1} />
    <Progress size="md" value={40} />
    <Spacer y={1} />
    <Progress size="lg" value={60} />
    <Spacer y={1} />
    <Progress size="xl" value={80} />
  </>
);

export const Status = () => (
  <>
    <Progress value={50} color="primary" status="primary" />
    <Spacer y={0.5} />
    <Progress value={30} color="secondary" status="secondary" />
    <Spacer y={0.5} />
    <Progress value={70} color="success" status="success" />
    <Spacer y={0.5} />
    <Progress value={90} color="warning" status="warning" />
    <Spacer y={0.5} />
    <Progress value={10} color="error" status="error" />
  </>
);

export const Shadow = () => (
  <>
    <Progress shadow value={50} color="primary" status="primary" />
    <Spacer y={0.5} />
    <Progress shadow value={30} color="secondary" status="secondary" />
    <Spacer y={0.5} />
    <Progress shadow value={70} color="success" status="success" />
    <Spacer y={0.5} />
    <Progress shadow value={90} color="warning" status="warning" />
    <Spacer y={0.5} />
    <Progress shadow value={10} color="error" status="error" />
  </>
);

export const Striped = () => {
  return (
    <>
      <Progress striped value={200} max={250} />
      <Spacer y={0.5} />
      <Progress striped value={45} />
      <Spacer y={0.5} />
      <Progress striped value={29} />
    </>
  );
};

export const Squared = () => {
  return (
    <>
      <Progress squared value={200} max={250} />
      <Spacer y={0.5} />
      <Progress squared value={45} />
      <Spacer y={0.5} />
      <Progress squared value={29} />
    </>
  );
};

export const indeterminated = () => {
  return (
    <>
      <Progress indeterminated value={50} color="primary" />
    </>
  );
};

export const NoAnimated = () => {
  return (
    <>
      <Progress animated={false} value={200} max={250} />
      <Spacer y={0.5} />
      <Progress animated={false} value={45} />
      <Spacer y={0.5} />
      <Progress animated={false} value={29} />
    </>
  );
};
