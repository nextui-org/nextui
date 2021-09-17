import React from 'react';
import { Meta } from '@storybook/react';
import Input from './index';
import Spacer from '../spacer';

export default {
  title: 'General/Input',
  component: Input,
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

export const Default = () => <Input placeholder="Next UI" />;

export const FullWidth = () => <Input placeholder="Next UI" width="100%" />;

export const ReadOnly = () => (
  <>
    <Input disabled placeholder="Disabled" />
    <Spacer y={0.5} />
    <Input readOnly initialValue="readOnly" />
  </>
);

export const Sizes = () => (
  <>
    <Input size="mini" placeholder="Mini" />
    <Spacer y={0.5} />
    <Input size="small" placeholder="Small" />
    <Spacer y={0.5} />
    <Input size="medium" placeholder="Medium" />
    <Spacer y={0.5} />
    <Input size="large" placeholder="Large" />
    <Spacer y={0.5} />
    <Input size="xlarge" placeholder="xLarge" />
  </>
);

export const WithInitLabel = () => (
  <>
    <Input label="username" placeholder="Next UI" />
    <Spacer y={0.5} />
    <Input labelRight=".com" placeholder="https://github/nextui-org/nextui" />
  </>
);
