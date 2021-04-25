import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NormalSizes, NormalTypes } from '@utils/prop-types';
import Checkbox, { CheckboxProps } from './checkbox';

const argTypes = {
  color: {
    name: 'color',
    type: { name: 'NormalTypes', required: false },
    control: {
      type: 'radio',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
  },
  size: {
    name: 'size',
    control: {
      type: 'radio',
      options: ['mini', 'small', 'medium', 'large', 'xlarge'],
    },
  },
};

export default {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  argTypes,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: true,
  label: 'Default',
  color: 'primary' as NormalTypes,
  size: 'large' as NormalSizes,
  style: { marginRight: '1rem' },
};

export const Color = Template.bind({});
Color.args = {
  checked: true,
  label: 'Label',
  color: 'warning' as NormalTypes,
  size: 'large' as NormalSizes,
};

export const Large = Template.bind({});
Large.args = {
  checked: true,
  label: 'Label',
  color: 'secondary' as NormalTypes,
  size: 'large' as NormalSizes,
};

export const Small = Template.bind({});
Small.args = {
  checked: true,
  label: 'Label',
  color: 'secondary' as NormalTypes,
  size: 'small' as NormalSizes,
};
