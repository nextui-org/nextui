import React from "react";
import {Meta} from "@storybook/react";

import {Spacer, Grid} from "../index";

import Progress from "./index";

export default {
  title: "General/Progress",
  component: Progress,
  decorators: [
    (Story) => (
      <Grid.Container xs={4}>
        <Story />
      </Grid.Container>
    ),
  ],
} as Meta;

export const Default = () => {
  return <Progress value={70} />;
};

export const Colors = () => (
  <>
    <Progress color="primary" value={50} />
    <Spacer y={0.5} />
    <Progress color="secondary" value={30} />
    <Spacer y={0.5} />
    <Progress color="success" value={70} />
    <Spacer y={0.5} />
    <Progress color="warning" value={90} />
    <Spacer y={0.5} />
    <Progress color="error" value={30} />
    <Spacer y={0.5} />
    <Progress color="gradient" value={70} />
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
    <Progress color="primary" status="primary" value={50} />
    <Spacer y={0.5} />
    <Progress color="secondary" status="secondary" value={30} />
    <Spacer y={0.5} />
    <Progress color="success" status="success" value={70} />
    <Spacer y={0.5} />
    <Progress color="warning" status="warning" value={90} />
    <Spacer y={0.5} />
    <Progress color="error" status="error" value={10} />
  </>
);

export const Shadow = () => (
  <>
    <Progress shadow color="primary" status="primary" value={50} />
    <Spacer y={0.5} />
    <Progress shadow color="secondary" status="secondary" value={30} />
    <Spacer y={0.5} />
    <Progress shadow color="success" status="success" value={70} />
    <Spacer y={0.5} />
    <Progress shadow color="warning" status="warning" value={90} />
    <Spacer y={0.5} />
    <Progress shadow color="error" status="error" value={10} />
  </>
);

export const Striped = () => {
  return (
    <>
      <Progress striped max={250} value={200} />
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
      <Progress squared max={250} value={200} />
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
      <Progress indeterminated color="primary" value={50} />
    </>
  );
};

export const NoAnimated = () => {
  return (
    <>
      <Progress animated={false} max={250} value={200} />
      <Spacer y={0.5} />
      <Progress animated={false} value={45} />
      <Spacer y={0.5} />
      <Progress animated={false} value={29} />
    </>
  );
};
