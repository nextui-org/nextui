import React from "react";
import {Meta} from "@storybook/react";
import {Spacer} from "@nextui-org/spacer";
import {Grid} from "@nextui-org/grid";
import {Text} from "@nextui-org/text";

import {Link} from "../src";

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
  <Grid.Container gap={1}>
    <Grid xs={12}>
      <Link href="#">{text}</Link>
    </Grid>
    <Grid xs={12}>
      <Link color="secondary" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="success" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="warning" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="error" href="#">
        {text}
      </Link>
    </Grid>
  </Grid.Container>
);

export const isExternal = () => (
  <Grid.Container gap={1}>
    <Grid xs={12}>
      <Link isExternal href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link isExternal color="secondary" href="#">
        {text}
      </Link>
    </Grid>
  </Grid.Container>
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
    <Grid xs={12}>
      <Link block color="$pink600" href="#">
        {text}
      </Link>
    </Grid>
  </Grid.Container>
);
