import React from 'react';
import { Meta } from '@storybook/react';
import Button from './index';
import { Spacer, Grid, Loading } from '../index';
import { Lock, Notification, User, Camera, Activity } from '../utils/icons';

export default {
  title: 'General/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{}}>
        <Story />
      </div>
    )
  ]
} as Meta;

export const Default = () => <Button>Action</Button>;

export const Sizes = () => (
  <div>
    <Button size="xs">Mini</Button>
    <Spacer y={0.5} />
    <Button color="secondary" size="sm">
      Small
    </Button>
    <Spacer y={0.5} />
    <Button color="success" size="md">
      Medium
    </Button>
    <Spacer y={0.5} />
    <Button color="warning" size="lg">
      Large
    </Button>
    <Spacer y={0.5} />
    <Button color="error" size="xl">
      Extra Large
    </Button>
    <Spacer y={0.5} />
    <Button auto color="gradient">
      Auto width
    </Button>
  </div>
);

export const Loadings = () => (
  <Grid.Container gap={2}>
    <Grid>
      <Button auto clickable={false} color="primary" css={{ px: '$13' }}>
        <Loading color="white" size="sm" />
      </Button>
    </Grid>
    <Grid>
      <Button auto clickable={false} color="secondary" css={{ px: '$13' }}>
        <Loading type="spinner" color="white" size="sm" />
      </Button>
    </Grid>
    <Grid>
      <Button auto clickable={false} color="success" css={{ px: '$13' }}>
        <Loading type="points" color="white" size="sm" />
      </Button>
    </Grid>
    <Grid>
      <Button auto clickable={false} color="warning" css={{ px: '$13' }}>
        <Loading type="points-opacity" color="white" size="sm" />
      </Button>
    </Grid>
    <Grid>
      <Button auto clickable={false} color="error" css={{ px: '$13' }}>
        <Loading type="spinner" color="white" size="sm" />
      </Button>
    </Grid>
  </Grid.Container>
);

export const Colors = () => (
  <>
    <Button color="primary">Primary</Button>
    <Spacer y={0.5} />
    <Button color="secondary">Secondary</Button>
    <Spacer y={0.5} />
    <Button color="success">Success</Button>
    <Spacer y={0.5} />
    <Button color="warning">Warning</Button>
    <Spacer y={0.5} />
    <Button color="error">Error</Button>
    <Spacer y={0.5} />
    <Button color="gradient">Gradient</Button>
    <Spacer y={0.5} />
  </>
);

export const Ghost = () => (
  <>
    <Button color="primary" ghost>
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button color="secondary" ghost>
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button color="success" ghost>
      Success
    </Button>
    <Spacer y={0.5} />
    <Button color="warning" ghost>
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button color="error" ghost>
      Error
    </Button>
    <Spacer y={0.5} />
    <Button ghost color="gradient">
      Gradient
    </Button>
    <Spacer y={0.5} />
  </>
);

export const Disabled = () => <Button disabled>Action</Button>;

export const Shadow = () => (
  <>
    <Button shadow color="primary">
      Primary
    </Button>
    <Spacer y={1} />
    <Button shadow color="secondary">
      Secondary
    </Button>
    <Spacer y={1} />
    <Button shadow color="success">
      Success
    </Button>
    <Spacer y={1} />
    <Button shadow color="warning">
      Warning
    </Button>
    <Spacer y={1} />
    <Button shadow color="error">
      Error
    </Button>
    <Spacer y={1} />
    <Button shadow color="gradient">
      Gradient
    </Button>
  </>
);

export const Bordered = () => (
  <>
    <Button color="primary" bordered>
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button color="secondary" bordered>
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button color="success" bordered>
      Success
    </Button>
    <Spacer y={0.5} />
    <Button color="warning" bordered>
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button color="error" bordered>
      Error
    </Button>
    <Spacer y={0.5} />
    <Button color="gradient" bordered>
      Gradient
    </Button>
  </>
);

export const Flat = () => (
  <>
    <Button color="primary" flat>
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button color="secondary" flat>
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button color="success" flat>
      Success
    </Button>
    <Spacer y={0.5} />
    <Button color="warning" flat>
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button color="error" flat>
      Error
    </Button>
  </>
);

export const Rounded = () => (
  <>
    <Button color="primary" rounded>
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button color="secondary" rounded>
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button color="success" rounded>
      Success
    </Button>
    <Spacer y={0.5} />
    <Button color="warning" rounded>
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button color="error" rounded>
      Error
    </Button>
    <Spacer y={0.5} />
    <Button color="gradient" rounded>
      Action
    </Button>
  </>
);

export const Light = () => (
  <>
    <Button light>Default</Button>
    <Spacer y={0.5} />
    <Button color="primary" light>
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button color="secondary" light>
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button color="success" light>
      Success
    </Button>
    <Spacer y={0.5} />
    <Button color="warning" light>
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button color="error" light>
      Error
    </Button>
  </>
);

export const Icons = () => {
  return (
    <>
      <Button auto iconRight={<Activity fill="currentColor" />} />
      <Spacer y={0.5} />
      <Button auto iconRight={<Camera fill="currentColor" />}>
        Right Icon
      </Button>
      <Spacer y={0.5} />
      <Button auto icon={<Camera fill="currentColor" />}>
        Left Icon
      </Button>
      <Spacer y={0.5} />
      <Button icon={<Lock fill="currentColor" />} color="success">
        Lock
      </Button>
      <Spacer y={0.5} />
      <Button icon={<Notification fill="currentColor" />} color="secondary">
        Notifications
      </Button>
      <Spacer y={0.5} />
      <Button icon={<User fill="currentColor" />} color="error" flat>
        Delete User
      </Button>
      <Spacer y={0.5} />
      <Button icon={<User fill="currentColor" />} disabled>
        Delete User
      </Button>
    </>
  );
};
