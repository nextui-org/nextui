import React from 'react';
import { Meta } from '@storybook/react';
import { Grid } from '../index';
import Image from './index';

export default {
  title: 'Display/Image',
  component: Image,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '100%' }}>
        <Story />
      </div>
    )
  ]
} as Meta;

export const Default = () => (
  <Image
    width={320}
    height={180}
    src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
    alt="Default Image"
    objectFit="cover"
  />
);

export const Sizes = () => (
  <Grid.Container gap={2}>
    <Grid>
      <Image
        src="http://placehold.jp/50x50.png"
        alt="Default Image"
        width={50}
        height={50}
      />
    </Grid>
    <Grid>
      <Image
        src="http://placehold.jp/100x100.png"
        alt="Default Image"
        width={100}
        height={100}
      />
    </Grid>
    <Grid>
      <Image
        src="http://placehold.jp/150x150.png"
        alt="Default Image"
        width={150}
        height={150}
      />
    </Grid>
  </Grid.Container>
);

export const Skeleton = () => (
  <Image
    showSkeleton
    width={320}
    height={180}
    maxDelay={5000}
    src="http://www.deelay.me/5000/https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
    alt="Default Image"
  />
);

export const ObjectFit = () => (
  <Grid.Container gap={2}>
    <Grid>
      <Image
        width={320}
        height={180}
        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
        objectFit="contain"
        alt="Default Image"
      />
    </Grid>
    <Grid>
      <Image
        width={320}
        height={180}
        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
        objectFit="cover"
        alt="Default Image"
      />
    </Grid>
  </Grid.Container>
);
