import React from 'react';
import { Meta } from '@storybook/react';
import Button from './index';
import { Spacer } from '@components';

export default {
  title: 'General/Button',
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
  </>
);

export const Flattened = () => (
  <>
    <Button color="primary" flattened>
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button color="secondary" flattened>
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button color="success" flattened>
      Success
    </Button>
    <Spacer y={0.5} />
    <Button color="warning" flattened>
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button color="error" flattened>
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

export const Sizes = () => (
  <>
    <Button size="mini">mini</Button>
    <Spacer y={0.5} />
    <Button size="small">small</Button>
    <Spacer y={0.5} />
    <Button>medium</Button>
    <Spacer y={0.5} />
    <Button size="large">large</Button>
    <Spacer y={0.5} />
    <Button size="xlarge">xlarge</Button>
    <Spacer y={0.5} />
    <Button auto>auto width</Button>
  </>
);
