import React from 'react';
import { Meta } from '@storybook/react';
import Button from './index';
import { Spacer } from '../index';
import { Lock, Notification, User, Camera, Activity } from '../utils/icons';
import useTheme from '../use-theme';

export default {
  title: 'General/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
} as Meta;

export const Default = () => <Button>Action</Button>;

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
    <Button flat auto color="#f4a">
      Custom
    </Button>
  </>
);

export const Loading = () => (
  <>
    <Button loading loaderType="default">
      Action
    </Button>
    <Spacer y={0.5} />
    <Button loading loaderType="spinner">
      Action
    </Button>
    <Spacer y={0.5} />
    <Button loading loaderType="points">
      Action
    </Button>
    <Spacer y={0.5} />
    <Button loading loaderType="points-opacity">
      Action
    </Button>
    <Spacer y={0.5} />
    <Button loading loaderType="gradient">
      Action
    </Button>
  </>
);

export const Disabled = () => <Button disabled>Action</Button>;

export const Shadow = () => (
  <Button shadow color="secondary">
    Shadow
  </Button>
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
    <Button bordered color="#f4a">
      Custom
    </Button>
  </>
);

export const flat = () => (
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
    <Spacer y={0.5} />
    <Button color="#ab570a" flat>
      Custom
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

export const Sizes = () => (
  <>
    <Button size="xs">mini</Button>
    <Spacer y={0.5} />
    <Button size="sm">small</Button>
    <Spacer y={0.5} />
    <Button>medium</Button>
    <Spacer y={0.5} />
    <Button size="lg">large</Button>
    <Spacer y={0.5} />
    <Button size="xl">xlarge</Button>
    <Spacer y={0.5} />
    <Button auto>auto width</Button>
  </>
);

export const Icons = () => {
  const theme = useTheme();
  return (
    <>
      <Button auto iconRight={<Activity theme={theme} fill="white" />} />
      <Spacer y={0.5} />
      <Button icon={<Camera theme={theme} fill="white" />}>Action</Button>
      <Spacer y={0.5} />
      <Button icon={<Lock theme={theme} fill="white" />} color="success">
        Lock
      </Button>
      <Spacer y={0.5} />
      <Button
        icon={<Notification theme={theme} fill="white" />}
        color="secondary"
      >
        Notifications
      </Button>
      <Spacer y={0.5} />
      <Button
        icon={<User theme={theme} fill={theme.palette.error} />}
        color="error"
        flat
      >
        Delete User
      </Button>
      <Spacer y={0.5} />
      <Button
        icon={<User theme={theme} fill={theme.palette.accents_4} />}
        disabled
      >
        Delete User
      </Button>
    </>
  );
};
