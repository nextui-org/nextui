import React from "react";
import {Meta} from "@storybook/react";
import {Spacer} from "@nextui-org/spacer";
import {Grid} from "@nextui-org/grid";

import {Loading} from "../src";

export default {
  title: "Feedback/Loading",
  component: Loading,
} as Meta;

export const Default = () => <Loading />;

export const Text = () => (
  <>
    <Loading size="xs">Loading</Loading>
    <Spacer x={1} />
    <Loading size="sm">Loading</Loading>
    <Spacer x={1} />
    <Loading size="md">Loading</Loading>
    <Spacer x={1} />
    <Loading size="lg">Loading</Loading>
    <Spacer x={1} />
    <Loading size="xl">Loading</Loading>
    <Spacer x={1} />
  </>
);

export const Colors = () => (
  <>
    <Loading color="primary">Primary</Loading>
    <Spacer x={1} />
    <Loading color="secondary">Secondary</Loading>
    <Spacer x={1} />
    <Loading color="success">Success</Loading>
    <Spacer x={1} />
    <Loading color="warning">Warning</Loading>
    <Spacer x={1} />
    <Loading color="error">Error</Loading>
    <Spacer x={1} />
  </>
);

export const TextColors = () => (
  <>
    <Loading textColor="primary">Primary</Loading>
    <Spacer x={1} />
    <Loading textColor="secondary">Secondary</Loading>
    <Spacer x={1} />
    <Loading textColor="success">Success</Loading>
    <Spacer x={1} />
    <Loading textColor="warning">Warning</Loading>
    <Spacer x={1} />
    <Loading textColor="error">Error</Loading>
    <Spacer x={1} />
  </>
);

export const Sizes = () => (
  <>
    <Loading size="xs">mini</Loading>
    <Spacer y={2} />
    <Loading size="sm">small</Loading>
    <Spacer y={2} />
    <Loading size="md">medium</Loading>
    <Spacer y={2} />
    <Loading size="lg">large</Loading>
    <Spacer y={2} />
    <Loading size="xl">xlarge</Loading>
    <Spacer y={2} />
  </>
);

export const Types = () => (
  <Grid.Container gap={4} justify="center">
    <Grid>
      <Loading type="default">default</Loading>
    </Grid>
    <Grid>
      <Loading type="spinner">spinner</Loading>
    </Grid>
    <Grid>
      <Loading style={{marginLeft: "-0.5rem"}} type="points">
        points
      </Loading>
    </Grid>
    <Grid>
      <Loading style={{marginLeft: "-0.5rem"}} type="points-opacity">
        points-opacity
      </Loading>
    </Grid>
    <Grid>
      <Loading style={{marginLeft: "-0.5rem"}} type="gradient">
        gradient
      </Loading>
    </Grid>
  </Grid.Container>
);
