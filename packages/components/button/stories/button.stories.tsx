import React from "react";
import {Meta} from "@storybook/react";
import {Spacer} from "@nextui-org/spacer";
import {Grid} from "@nextui-org/grid";
import {Loading} from "@nextui-org/loading";
import {Lock, Notification, User, Camera, Activity} from "@nextui-org/icons-utils";

import {Button} from "../src";

export default {
  title: "General/Button",
  component: Button,
  decorators: [
    (Story) => (
      <div style={{}}>
        <Story />
      </div>
    ),
  ],
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
      <Button auto disabled color="primary" css={{px: "$13"}}>
        <Loading color="currentColor" size="sm" />
      </Button>
    </Grid>
    <Grid>
      <Button auto disabled color="secondary" css={{px: "$13"}}>
        <Loading color="currentColor" size="sm" type="spinner" />
      </Button>
    </Grid>
    <Grid>
      <Button auto disabled color="success" css={{px: "$13"}}>
        <Loading color="currentColor" size="sm" type="points" />
      </Button>
    </Grid>
    <Grid>
      <Button auto disabled color="warning" css={{px: "$13"}}>
        <Loading color="currentColor" size="sm" type="points-opacity" />
      </Button>
    </Grid>
    <Grid>
      <Button auto disabled color="error" css={{px: "$13"}}>
        <Loading color="currentColor" size="sm" type="spinner" />
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
    <Button ghost color="primary">
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button ghost color="secondary">
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button ghost color="success">
      Success
    </Button>
    <Spacer y={0.5} />
    <Button ghost color="warning">
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button ghost color="error">
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
    <Button bordered color="primary">
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button bordered color="secondary">
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button bordered color="success">
      Success
    </Button>
    <Spacer y={0.5} />
    <Button bordered color="warning">
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button bordered color="error">
      Error
    </Button>
    <Spacer y={0.5} />
    <Button bordered color="gradient">
      Gradient
    </Button>
  </>
);

export const Flat = () => (
  <>
    <Button flat color="primary">
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button flat color="secondary">
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button flat color="success">
      Success
    </Button>
    <Spacer y={0.5} />
    <Button flat color="warning">
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button flat color="error">
      Error
    </Button>
  </>
);

export const Rounded = () => (
  <>
    <Button rounded color="primary">
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button rounded color="secondary">
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button rounded color="success">
      Success
    </Button>
    <Spacer y={0.5} />
    <Button rounded color="warning">
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button rounded color="error">
      Error
    </Button>
    <Spacer y={0.5} />
    <Button rounded color="gradient">
      Action
    </Button>
  </>
);

export const Light = () => (
  <>
    <Button light>Default</Button>
    <Spacer y={0.5} />
    <Button light color="primary">
      Primary
    </Button>
    <Spacer y={0.5} />
    <Button light color="secondary">
      Secondary
    </Button>
    <Spacer y={0.5} />
    <Button light color="success">
      Success
    </Button>
    <Spacer y={0.5} />
    <Button light color="warning">
      Warning
    </Button>
    <Spacer y={0.5} />
    <Button light color="error">
      Error
    </Button>
  </>
);

export const Icons = () => {
  return (
    <>
      <Button auto color="secondary" icon={<Activity fill="currentColor" />} />
      <Spacer y={0.5} />
      <Button auto iconRight={<Camera fill="currentColor" />}>
        Right Icon
      </Button>
      <Spacer y={0.5} />
      <Button auto bordered color="gradient" icon={<Camera fill="currentColor" />}>
        Left Icon
      </Button>
      <Spacer y={0.5} />
      <Button color="success" icon={<Lock fill="currentColor" />}>
        Lock
      </Button>
      <Spacer y={0.5} />
      <Button color="secondary" icon={<Notification fill="currentColor" />}>
        Notifications
      </Button>
      <Spacer y={0.5} />
      <Button flat color="error" icon={<User fill="currentColor" />}>
        Delete User
      </Button>
      <Spacer y={0.5} />
      <Button disabled icon={<User fill="currentColor" />}>
        Delete User
      </Button>
    </>
  );
};
