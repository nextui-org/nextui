import React from "react";
import {Meta} from "@storybook/react";

import {Grid} from "../index";

import Pagination from "./pagination";

export default {
  title: "Navigation/Pagination",
  component: Pagination,
  decorators: [
    (Story) => (
      <Grid.Container gap={2} sm={12}>
        <Story />
      </Grid.Container>
    ),
  ],
} as Meta;

export const Default = () => <Pagination initialPage={1} total={20} />;

export const Colors = () => (
  <>
    <Grid xs={12}>
      <Pagination color="primary" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination color="secondary" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination color="success" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination color="warning" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination color="error" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination color="gradient" total={10} />
    </Grid>
  </>
);

export const Sizes = () => (
  <>
    <Grid xs={12}>
      <Pagination size="xs" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination size="sm" total={5} />
    </Grid>
    <Grid xs={12}>
      <Pagination initialPage={6} size="md" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination initialPage={6} size="lg" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination initialPage={6} size="xl" total={30} />
    </Grid>
  </>
);

export const Rounded = () => (
  <>
    <Grid xs={12}>
      <Pagination rounded size="xs" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination rounded size="sm" total={5} />
    </Grid>
    <Grid xs={12}>
      <Pagination rounded initialPage={6} size="md" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination rounded initialPage={6} size="lg" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination rounded initialPage={6} size="xl" total={30} />
    </Grid>
  </>
);

export const Bordered = () => (
  <>
    <Grid xs={12}>
      <Pagination bordered initialPage={1} total={20} />
    </Grid>
    <Grid xs={12}>
      <Pagination bordered rounded initialPage={1} total={20} />
    </Grid>
  </>
);

export const Shadow = () => (
  <>
    <Grid xs={12}>
      <Pagination shadow color="primary" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination rounded shadow color="secondary" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination shadow color="success" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination rounded shadow color="warning" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination shadow color="error" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination rounded shadow color="gradient" total={10} />
    </Grid>
  </>
);

export const OnlyDots = () => (
  <>
    <Grid xs={12}>
      <Pagination onlyDots color="primary" size="xs" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination onlyDots shadow color="secondary" size="sm" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination onlyDots color="success" size="md" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination onlyDots shadow color="warning" size="lg" total={10} />
    </Grid>
    <Grid xs={12}>
      <Pagination onlyDots color="error" size="xl" total={10} />
    </Grid>
  </>
);

export const Loop = () => (
  <>
    <Grid xs={12}>
      <Pagination loop initialPage={1} total={6} />
    </Grid>
  </>
);

export const NoMargin = () => (
  <>
    <Grid xs={12}>
      <Pagination noMargin shadow color="secondary" initialPage={1} total={6} />
    </Grid>
  </>
);

export const NoControls = () => (
  <>
    <Grid xs={12}>
      <Pagination shadow color="success" controls={false} initialPage={1} total={20} />
    </Grid>
  </>
);

export const NoAnimated = () => (
  <>
    <Grid xs={12}>
      <Pagination animated={false} initialPage={1} total={6} />
    </Grid>
  </>
);
