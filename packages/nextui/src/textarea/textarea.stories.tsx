import React, { useEffect, useMemo } from 'react';
import { Meta } from '@storybook/react';
import Textarea from './index';

export default {
  title: 'General/Textarea',
  component: Textarea,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = () => (
  <Textarea placeholder="Enter your amazing thoughts." />
);
