import React from 'react';
import { Meta } from '@storybook/react';
import Spacer from './index';
import useTheme from '../use-theme';

export default {
  title: 'Layout/Spacer',
  component: Spacer,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = ({ children, vertical }: any) => (
  <div
    style={{
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '50%',
      minWidth: '50%',
    }}
  >
    {children}
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpacerContainer = ({ children }: any) => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: '100%',
        background: theme.palette.primary,
        borderRadius: '8px',
      }}
    >
      {children}
    </div>
  );
};

export const Vertical = () => (
  <Container vertical>
    <SpacerContainer>
      <Spacer y={1} />
    </SpacerContainer>
    <Spacer y={1} />
    <SpacerContainer>
      <Spacer y={2} />
    </SpacerContainer>
    <Spacer y={1} />
    <SpacerContainer>
      <Spacer y={3} />
    </SpacerContainer>
  </Container>
);

export const Horizontal = () => (
  <Container>
    <SpacerContainer>
      <Spacer x={5} />
    </SpacerContainer>
    <Spacer x={2} />
    <SpacerContainer>
      <Spacer x={5} />
    </SpacerContainer>
    <Spacer x={2} />
    <SpacerContainer>
      <Spacer x={5} />
    </SpacerContainer>
  </Container>
);
