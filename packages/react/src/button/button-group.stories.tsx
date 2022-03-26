import React from 'react';
import { Meta } from '@storybook/react';
import Button from './index';
import { Grid } from '../index';

export default {
  title: 'General/ButtonGroup',
  component: Button,
  decorators: [
    (Story) => (
      <Grid.Container gap={2} justify="center" direction="column">
        <Story />
      </Grid.Container>
    )
  ]
} as Meta;

export const Default = () => (
  <Button.Group>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </Button.Group>
);

export const Loading = () => (
  <Button.Group>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </Button.Group>
);

export const Variants = () => (
  <>
    <Button.Group color="success">
      <Button>One</Button>
      <Button disabled>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group color="gradient">
      <Button>One</Button>
      <Button disabled>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group color="error">
      <Button>One</Button>
      <Button>Two</Button>
      <Button disabled>Three</Button>
    </Button.Group>
    <Button.Group color="primary" bordered>
      <Button disabled>Action1</Button>
      <Button>Action2</Button>
      <Button>Action3</Button>
    </Button.Group>
    <Button.Group color="gradient" bordered>
      <Button disabled>Action1</Button>
      <Button>Action2</Button>
      <Button>Action3</Button>
    </Button.Group>
    <Button.Group color="warning" flat>
      <Button>Action1</Button>
      <Button disabled>Action2</Button>
      <Button>Action2</Button>
    </Button.Group>
    <Button.Group color="secondary" size="sm">
      <Button disabled>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group color="secondary" light>
      <Button>One</Button>
      <Button disabled>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group color="gradient" ghost>
      <Button>One</Button>
      <Button disabled>Two</Button>
      <Button>Three</Button>
    </Button.Group>
  </>
);

export const Sizes = () => (
  <>
    <Button.Group size="xs">
      <Button>One</Button>
      <Button>Two</Button>
    </Button.Group>
    <Button.Group size="sm">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group size="md">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group size="lg">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group size="xl">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
  </>
);

export const Vertical = () => (
  <>
    <Button.Group size="sm" vertical>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </Button.Group>
  </>
);

export const Disabled = () => (
  <>
    <Button.Group size="sm" disabled>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
  </>
);
