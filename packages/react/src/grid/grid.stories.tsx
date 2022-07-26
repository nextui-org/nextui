import React from "react";
import {Meta} from "@storybook/react";

import {Card, Spacer} from "../index";

import Grid from "./index";

export default {
  title: "Layout/Grid",
  component: Grid,
} as Meta;

const MockItem = () => {
  return (
    <Card color="primary" style={{width: "100%", height: "100px"}}>
      <Card.Body />
    </Card>
  );
};

export const Default = () => (
  <Grid.Container gap={2} justify="center">
    <Grid sm={3} xs={6}>
      <MockItem />
    </Grid>
    <Grid sm={3} xs={6}>
      <MockItem />
    </Grid>
    <Grid sm={3} xs={6}>
      <MockItem />
    </Grid>
    <Grid sm={3} xs={6}>
      <MockItem />
    </Grid>
  </Grid.Container>
);

export const Fluid = () => (
  <Grid.Container gap={2} justify="center">
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={3}>
      <MockItem />
    </Grid>
  </Grid.Container>
);

export const Responsive = () => (
  <Grid.Container gap={2} justify="center">
    <Grid md={6} xs={12}>
      <MockItem />
    </Grid>
    <Grid md={6} xs={12}>
      <MockItem />
    </Grid>
    <Grid md={3} xs={6}>
      <MockItem />
    </Grid>
    <Grid md={2} xs={6}>
      <MockItem />
    </Grid>
    <Grid md={3} xs={6}>
      <MockItem />
    </Grid>
  </Grid.Container>
);

export const HideElements = () => (
  <Grid.Container gap={2} justify="center">
    <Grid md={6} xs={0}>
      <MockItem />
    </Grid>
    <Grid md={6} xs={0}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
    <Grid xs={12}>
      <MockItem />
    </Grid>
  </Grid.Container>
);

export const AutoWidth = () => (
  <>
    <Grid.Container gap={2} justify="center">
      <Grid xs>
        <MockItem />
      </Grid>
      <Grid xs>
        <MockItem />
      </Grid>
      <Grid xs>
        <MockItem />
      </Grid>
    </Grid.Container>
    <Spacer y={1} />
    <Grid.Container gap={2} justify="center">
      <Grid xs>
        <MockItem />
      </Grid>
      <Grid xs={12}>
        <MockItem />
      </Grid>
      <Grid xs>
        <MockItem />
      </Grid>
    </Grid.Container>
  </>
);
