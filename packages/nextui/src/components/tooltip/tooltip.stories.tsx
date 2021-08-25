import React from 'react';
import { Meta } from '@storybook/react';
import { Tooltip, Button } from '../index';

export default {
  title: 'Display/Tooltip',
  component: Tooltip,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = ({ children }: any) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      width: '100%',
      position: 'absolute',
      left: 100,
      top: 80,
    }}
  >
    {children}
  </div>
);

export const Default = () => {
  return (
    <Container>
      <Tooltip text={'Developers love Next.js'}>Do hover here</Tooltip>
    </Container>
  );
};

export const Trigger = () => {
  return (
    <Container>
      <Tooltip text={'Developers love Next.js'} trigger="click" type="dark">
        <span>Click me</span>
      </Tooltip>
    </Container>
  );
};

export const WithComponents = () => {
  return (
    <Container>
      <Tooltip text={'Developers love Next.js'} type="dark">
        <Button auto>Button</Button>
      </Tooltip>
    </Container>
  );
};
