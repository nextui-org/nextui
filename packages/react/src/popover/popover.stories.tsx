import * as React from 'react';
import { Meta } from '@storybook/react';
import { Text, Grid } from '../index';
import Popover from './index';

export default {
  title: 'Display/Popover',
  component: Popover
} as Meta;

export const Default = () => (
  <Grid.Container justify="center" gap={2} css={{ maxW: '600px' }}>
    <Grid>
      <Popover disableAnimation placement="top">
        <Popover.Trigger>
          <button>top</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="right">
        <Popover.Trigger>
          <button>right</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="bottom">
        <Popover.Trigger>
          <button>bottom</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="left">
        <Popover.Trigger>
          <button>left</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="top-right">
        <Popover.Trigger>
          <button>top-right</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="top-left">
        <Popover.Trigger>
          <button>top-left</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="top-left">
        <Popover.Trigger>
          <button>top-left</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="bottom-left">
        <Popover.Trigger>
          <button>bottom-left</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="bottom-right">
        <Popover.Trigger>
          <button>bottom-right</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="left-top">
        <Popover.Trigger>
          <button>left-top</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="left-bottom">
        <Popover.Trigger>
          <button>left-bottom</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="right-top">
        <Popover.Trigger>
          <button>right-top</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>

    <Grid>
      <Popover placement="right-bottom">
        <Popover.Trigger>
          <button>right-bottom</button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>
  </Grid.Container>
);
