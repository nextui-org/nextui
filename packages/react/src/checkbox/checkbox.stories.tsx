import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NormalSizes, NormalColors } from '../utils/prop-types';
import Checkbox, { CheckboxProps } from './index';

const argTypes = {
  color: {
    name: 'color',
    type: { name: 'NormalTypes', required: false },
    control: {
      type: 'radio',
      options: ['primary', 'secondary', 'success', 'warning', 'error']
    }
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
        'error'
      ]
    }
  },
  size: {
    name: 'size',
    control: {
      type: 'radio',
      options: ['mini', 'small', 'medium', 'large', 'xlarge']
    }
  },
  disabled: {
    name: 'disabled',
    type: { name: 'boolean', required: false },
    control: {
      type: 'boolean'
    }
  }
};

export default {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  argTypes
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Option',
  color: 'default' as NormalColors,
  textColor: 'default' as NormalColors,
  size: 'md' as NormalSizes
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
    <Checkbox color="primary" labelColor="primary" checked={true}>
      Primary
    </Checkbox>
    <br />
    <Checkbox color="secondary" labelColor="secondary" checked={true}>
      Secondary
    </Checkbox>
    <br />
    <Checkbox color="success" labelColor="success" checked={true}>
      Success
    </Checkbox>
    <br />
    <Checkbox color="warning" labelColor="warning" checked={true}>
      Warning
    </Checkbox>
    <br />
    <Checkbox color="error" labelColor="error" checked={true}>
      Error
    </Checkbox>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox checked={true} size="xs">
      mini
    </Checkbox>
    <br />
    <Checkbox checked={true} size="sm">
      small
    </Checkbox>
    <br />
    <Checkbox checked={true} size="md">
      medium
    </Checkbox>
    <br />
    <Checkbox checked={true} size="lg">
      large
    </Checkbox>
    <br />
    <Checkbox checked={true} size="xl">
      xlarge
    </Checkbox>
  </div>
);

export const Rounded = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox rounded color="primary" checked={true}>
      Primary
    </Checkbox>
    <br />
    <Checkbox rounded color="secondary" checked={true}>
      Secondary
    </Checkbox>
    <br />
    <Checkbox rounded color="success" checked={true}>
      Success
    </Checkbox>
    <br />
    <Checkbox rounded color="warning" checked={true}>
      Warning
    </Checkbox>
    <br />
    <Checkbox rounded color="error" checked={true}>
      Error
    </Checkbox>
  </div>
);

export const Disabled = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox checked={true} size="xl">
      Enabled
    </Checkbox>
    <br />
    <Checkbox disabled checked={true} size="xl">
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
  size: 'large' as NormalSizes
};

export const LineThrough = Template.bind({});
LineThrough.args = {
  checked: true,
  line: true,
  label: 'Option',
  color: 'primary' as NormalColors,
  size: 'large' as NormalSizes
};

export const Group = () => {
  const handleGroupChange = (value: string[]) => console.log(value);
  return (
    <Checkbox.Group
      color="warning"
      labelColor="primary"
      value={['buenos-aires']}
      aria-label="Select cities"
      onChange={handleGroupChange}
    >
      <Checkbox value="buenos-aires" color="primary">
        Buenos Aires
      </Checkbox>
      <Checkbox value="sydney" labelColor="warning">
        Sydney
      </Checkbox>
      <Checkbox value="london" labelColor="error">
        London
      </Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </Checkbox.Group>
  );
};

export const Row = () => (
  <Checkbox.Group value={['1']} color="success" aria-label="Select cities" row>
    <Checkbox value="1" color="primary">
      Buenos Aires
    </Checkbox>
    <Checkbox value="2">Sydney</Checkbox>
    <Checkbox value="3">London</Checkbox>
    <Checkbox value="4">Tokyo</Checkbox>
  </Checkbox.Group>
);
