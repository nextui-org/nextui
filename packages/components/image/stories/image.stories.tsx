import React from "react";
import {Meta} from "@storybook/react";
import {Grid} from "@nextui-org/grid";

import {Image} from "../src";

export default {
  title: "Display/Image",
  component: Image,
} as Meta;

export const Default = () => (
  <Image
    alt="Default Image"
    height={180}
    objectFit="cover"
    src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
    width={320}
  />
);

export const Sizes = () => (
  <Grid.Container gap={2}>
    <Grid>
      <Image alt="Default Image" height={50} src="http://placehold.jp/50x50.png" width={50} />
    </Grid>
    <Grid>
      <Image alt="Default Image" height={100} src="http://placehold.jp/100x100.png" width={100} />
    </Grid>
    <Grid>
      <Image alt="Default Image" height={150} src="http://placehold.jp/150x150.png" width={150} />
    </Grid>
  </Grid.Container>
);

export const Skeleton = () => (
  <Image
    showSkeleton
    alt="Default Image"
    height={180}
    maxDelay={5000}
    src="http://www.deelay.me/5000/https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
    width={320}
  />
);

export const ObjectFit = () => (
  <Grid.Container gap={2}>
    <Grid>
      <Image
        alt="Default Image"
        height={180}
        objectFit="contain"
        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
        width={320}
      />
    </Grid>
    <Grid>
      <Image
        alt="Default Image"
        height={180}
        objectFit="cover"
        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
        width={320}
      />
    </Grid>
  </Grid.Container>
);
