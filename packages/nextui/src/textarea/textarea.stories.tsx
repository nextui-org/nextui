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
    <Textarea
      label="Write your thoughts"
      placeholder="Enter your amazing thoughts."
    />
    <Spacer y={1.5} />
    <Textarea labelPlaceholder="Write your thoughts" />
  </>
);

export const Types = () => (
  <>
    <Spacer y={1} />
    <Textarea label="Default" placeholder="Default Textarea" />
    <Spacer y={2} />
    <Textarea underlined color="primary" placeholder="Underlined Textarea" />
  </>
);
