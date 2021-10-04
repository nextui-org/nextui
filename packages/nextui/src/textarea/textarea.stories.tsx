import React from 'react';
import { Meta } from '@storybook/react';
import Textarea from './index';
import Spacer from '../spacer';

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
  <>
    <Spacer y={2} />
    <Textarea labelPlaceholder="Enter your amazing thoughts." />
  </>
);
