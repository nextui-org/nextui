import React from 'react';
import { Meta } from '@storybook/react';
import Button from './index';

export default {
  title: 'General/ButtonGroup',
  component: Button,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = () => (
  <Button.Group>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </Button.Group>
);

export const Outline = () => (
  <Button.Group outline>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </Button.Group>
);

export const Loading = () => (
  <Button.Group>
    <Button loading>One</Button>
    <Button loading loaderType="points">
      Two
    </Button>
    <Button loading loaderType="points-opacity">
      Three
    </Button>
  </Button.Group>
);

export const Variants = () => (
  <>
    <Button.Group color="success">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group color="error" rounded>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group bordered>
      <Button>Action1</Button>
      <Button>Action2</Button>
      <Button>Action3</Button>
    </Button.Group>
    <Button.Group color="warning" flattened>
      <Button>Action1</Button>
      <Button>Action2</Button>
    </Button.Group>
    <Button.Group color="secondary" size="small">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group color="secondary" light>
      <Button>One</Button>
      <Button>Two</Button>
    </Button.Group>
  </>
);

export const Sizes = () => (
  <>
    <Button.Group size="mini">
      <Button>One</Button>
      <Button>Two</Button>
    </Button.Group>
    <Button.Group size="small">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group size="medium">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group size="large">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group size="xlarge">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
  </>
);

export const Vertical = () => (
  <>
    <Button.Group size="small" vertical>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </Button.Group>
  </>
);

export const Disabled = () => (
  <>
    <Button.Group size="small" disabled>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
  </>
);
