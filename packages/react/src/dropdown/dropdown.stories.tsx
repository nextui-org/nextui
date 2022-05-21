import React from 'react';
import { Meta } from '@storybook/react';
import { Grid, Button } from '../index';
import Dropdown from './index';

export default {
  title: 'General/Dropdown',
  component: Dropdown,
  decorators: [
    (Story) => (
      <Grid.Container gap={1} justify="center" direction="column">
        <Story />
      </Grid.Container>
    )
  ]
} as Meta;

// desired API
// <Dropdown aria-label="Actions">
//   {/* <Dropdown.Trigger>
//     <button>Actions</button>
//   </Dropdown.Trigger> */}
//   <Dropdown.Content>
//     <Dropdown.Item key="one">One</Dropdown.Item>
//     <Dropdown.Item key="two">Two</Dropdown.Item>
//     {/* <Dropdown.Section title="Section 1">
//       <Dropdown.Item key="section1-item1">One</Dropdown.Item>
//       <Dropdown.Item key="section1-item2">Two</Dropdown.Item>
//       <Dropdown.Item key="section1-item3">Three</Dropdown.Item>
//     </Dropdown.Section>
//     <Dropdown.Section title="Section 2">
//       <Dropdown.Item key="section2-item1">One</Dropdown.Item>
//       <Dropdown.Item key="section2-item2">Two</Dropdown.Item>
//       <Dropdown.Item key="section2-item3">Three</Dropdown.Item>
//     </Dropdown.Section> */}
//   </Dropdown.Content>
// </Dropdown>

export const Default = () => (
  <Dropdown aria-label="Actions">
    <Dropdown.Trigger>
      <Button auto css={{ maxWidth: '200px' }}>
        Trigger
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Menu onAction={alert}>
      <Dropdown.Item>Cut</Dropdown.Item>
      <Dropdown.Item>Copy</Dropdown.Item>
      <Dropdown.Item>Paste</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
