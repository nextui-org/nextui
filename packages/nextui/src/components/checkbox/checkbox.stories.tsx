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
  label: 'Option',
  color: 'primary' as NormalTypes,
  size: 'medium' as NormalSizes,
  style: { marginRight: '1rem' },
};

export const Color = Template.bind({});
Color.args = {
  lineThrough: false,
  label: 'Option',
  color: 'warning' as NormalTypes,
  size: 'medium' as NormalSizes,
};

export const Large = Template.bind({});
Large.args = {
  lineThrough: false,
  label: 'Option',
  color: 'secondary' as NormalTypes,
  size: 'large' as NormalSizes,
};

export const Small = Template.bind({});
Small.args = {
  lineThrough: false,
  label: 'Option',
  color: 'secondary' as NormalTypes,
  size: 'small' as NormalSizes,
};

export const Line = Template.bind({});
Line.args = {
  line: true,
  label: 'Option',
  color: 'primary' as NormalTypes,
  size: 'large' as NormalSizes,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  checked: true,
  indeterminate: true,
  label: 'Option',
  color: 'primary' as NormalTypes,
  size: 'large' as NormalSizes,
};
