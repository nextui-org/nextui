import React from 'react';
import { Meta } from '@storybook/react';
import CheckboxGroup from './checkbox-group';
import Checkbox from './checkbox';
import * as CheckboxStories from './checkbox.stories';

export default {
  title: 'Inputs/Checkbox',
  component: CheckboxGroup,
  subcomponents: { Checkbox },
  argTypes: {
    ...CheckboxStories.argTypes,
    disabled: {
      name: 'disabled',
      type: { name: 'boolean', required: false },
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Group: React.VFC<{}> = (args) => (
  <CheckboxGroup color="warning" value={['buenos-aires']} {...args}>
    <Checkbox
      style={{ marginRight: '1rem' }}
      value="buenos-aires"
      {...CheckboxStories.Default.args}
    >
      Buenos Aires
    </Checkbox>
    <Checkbox
      style={{ marginRight: '1rem' }}
      value="sydney"
      {...CheckboxStories.Default.args}
    >
      Sydney
    </Checkbox>
    <Checkbox
      style={{ marginRight: '1rem' }}
      value="london"
      {...CheckboxStories.Default.args}
    >
      London
    </Checkbox>
    <Checkbox
      style={{ marginRight: '1rem' }}
      value="tokyo"
      {...CheckboxStories.Default.args}
    >
      Tokyo
    </Checkbox>
  </CheckboxGroup>
);
