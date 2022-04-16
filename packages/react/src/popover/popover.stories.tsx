import React from 'react';
import { Meta } from '@storybook/react';
import { Text } from '../index';
import Popover from './index';

export default {
  title: 'Display/Popover',
  component: Popover
} as Meta;

export const Default = () => (
  <Popover placement="bottom">
    <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
  </Popover>
);
