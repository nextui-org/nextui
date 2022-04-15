import React from 'react';
import { Meta } from '@storybook/react';
import Popover from './index';

export default {
  title: 'Display/Popover',
  component: Popover
} as Meta;

export const Default = () => (
  <Popover>This is the content of the popover.</Popover>
);
