import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NormalSizes, NormalColors } from '@utils/prop-types';
import Checkbox, { Props } from './index';

const argTypes = {
  color: {
    name: 'color',
    type: { name: 'NormalTypes', required: false },
    control: {
      type: 'radio',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
  },
  textColor: {
    name: 'textColor',
    type: { name: 'NormalTypes', required: false },
    control: {
      type: 'radio',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
      ],
    },
  },
  size: {
    name: 'size',
    control: {
      type: 'radio',
      options: ['mini', 'small', 'medium', 'large', 'xlarge'],
    },
  },
  disabled: {
    name: 'disabled',
    type: { name: 'boolean', required: false },
    control: {
      type: 'boolean',
    },
  },
};

export default {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  argTypes,
} as Meta;

const Template: Story<Props> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Option',
  color: 'primary' as NormalColors,
  textColor: 'default' as NormalColors,
  size: 'medium' as NormalSizes,
};

export const Colors = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox color="primary" checked={true}>
      Primary
    </Checkbox>
    <br />
    <Checkbox color="secondary" checked={true}>
      Secondary
    </Checkbox>
    <br />
    <Checkbox color="success" checked={true}>
      Success
    </Checkbox>
    <br />
    <Checkbox color="warning" checked={true}>
      Warning
    </Checkbox>
    <br />
    <Checkbox color="error" checked={true}>
      Error
    </Checkbox>
  </div>
);

export const TextColors = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox color="primary" textColor="primary" checked={true}>
      Primary
    </Checkbox>
    <br />
    <Checkbox color="secondary" textColor="secondary" checked={true}>
      Secondary
    </Checkbox>
    <br />
    <Checkbox color="success" textColor="success" checked={true}>
      Success
    </Checkbox>
    <br />
    <Checkbox color="warning" textColor="warning" checked={true}>
      Warning
    </Checkbox>
    <br />
    <Checkbox color="error" textColor="error" checked={true}>
      Error
    </Checkbox>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox checked={true} size="mini">
      mini
    </Checkbox>
    <br />
    <Checkbox checked={true} size="small">
      small
    </Checkbox>
    <br />
    <Checkbox checked={true} size="medium">
      medium
    </Checkbox>
    <br />
    <Checkbox checked={true} size="large">
      large
    </Checkbox>
    <br />
    <Checkbox checked={true} size="xlarge">
      xlarge
    </Checkbox>
  </div>
);

export const Disabled = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox checked={true} size="xlarge">
      Enabled
    </Checkbox>
    <br />
    <Checkbox disabled checked={true} size="xlarge">
      Disabled
    </Checkbox>
  </div>
);

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  checked: true,
  indeterminate: true,
  label: 'Option',
  color: 'primary' as NormalColors,
  size: 'large' as NormalSizes,
};

export const LineThrough = Template.bind({});
LineThrough.args = {
  checked: true,
  line: true,
  label: 'Option',
  color: 'primary' as NormalColors,
  size: 'large' as NormalSizes,
};

export const Group: React.VFC<{}> = (args) => (
  <Checkbox.Group color="warning" value={['buenos-aires']} {...args}>
    <Checkbox value="buenos-aires" {...Default.args}>
      Buenos Aires
    </Checkbox>
    <Checkbox value="sydney" {...Default.args}>
      Sydney
    </Checkbox>
    <Checkbox value="london" {...Default.args}>
      London
    </Checkbox>
    <Checkbox value="tokyo" {...Default.args}>
      Tokyo
    </Checkbox>
  </Checkbox.Group>
);

export const Row = () => (
  <Checkbox.Group value={['1']} row>
    <Checkbox value="1" {...Default.args}>
      Buenos Aires
    </Checkbox>
    <Checkbox value="2" {...Default.args}>
      Sydney
    </Checkbox>
    <Checkbox value="3" {...Default.args}>
      London
    </Checkbox>
    <Checkbox value="4" {...Default.args}>
      Tokyo
    </Checkbox>
  </Checkbox.Group>
);
