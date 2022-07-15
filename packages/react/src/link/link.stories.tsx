import React from "react";
import {Meta} from "@storybook/react";

import {Spacer, Grid, Text} from "../index";

import Link from "./link";

export default {
  title: "Navigation/Link",
  component: Link,
} as Meta;

const text = `"First solve the problem. Then, write the code." - Jon Johnson.`;

export const Default = () => <Link href="#">{text}</Link>;

export const Underline = () => (
  <Link underline color="primary">
    {text}
  </Link>
);

export const Variants = () => (
  <>
    <Text>
      <Link href="#">{text}</Link>
    </Text>
    <Text>
      <Link color="secondary" href="#">
        {text}
      </Link>
    </Text>
    <Text>
      <Link color="success" href="#">
        {text}
      </Link>
    </Text>
    <Text>
      <Link color="error" href="#">
        {text}
      </Link>
    </Text>
  </>
);

export const Icon = () => (
  <>
    <Link icon href="#">
      {text}
    </Link>
    <Spacer y={0.5} />
    <Link icon color="primary" href="#">
      {text}
    </Link>
  </>
);

export const Block = () => (
  <Grid.Container gap={1}>
    <Grid xs={12}>
      <Link block color="primary" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link block color="text" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link block color="secondary" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link block color="success" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link block color="warning" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link block color="error" href="#">
        {text}
      </Link>
    </Grid>
  </Grid.Container>
);
