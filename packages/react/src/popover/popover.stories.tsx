import * as React from 'react';
import { Meta } from '@storybook/react';
import { Text, Grid, Button } from '../index';
import Popover, { PopoverPlacement } from './index';

export default {
  title: 'Display/Popover',
  component: Popover
} as Meta;

const placements = [
  'bottom',
  'bottom-left',
  'bottom-right',
  'top',
  'top-left',
  'top-right',
  'left',
  'left-top',
  'left-bottom',
  'right',
  'right-top',
  'right-bottom'
];

export const Default = () => (
  <Grid.Container justify="center" gap={2} css={{ maxW: '600px' }}>
    <Grid>
      <Popover placement="top">
        <Popover.Trigger>
          <Button auto>Open popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>
  </Grid.Container>
);

export const Placements = () => (
  <Grid.Container justify="center" gap={2} css={{ maxW: '600px' }}>
    {placements.map((placement: PopoverPlacement) => (
      <Grid key={placement}>
        <Popover placement={placement}>
          <Popover.Trigger>
            <Button auto>{placement}</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
          </Popover.Content>
        </Popover>
      </Grid>
    ))}
  </Grid.Container>
);

export const DisableAnimation = () => (
  <Grid.Container justify="center" gap={2} css={{ maxW: '600px' }}>
    <Grid>
      <Popover disableAnimation placement="top">
        <Popover.Trigger>
          <Button auto animated={false}>
            Open popover
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
        </Popover.Content>
      </Popover>
    </Grid>
  </Grid.Container>
);
