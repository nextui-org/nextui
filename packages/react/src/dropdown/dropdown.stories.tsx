import React from 'react';
import { Meta } from '@storybook/react';
import { Item as DropdownMenuItem } from '@react-stately/collections';
import DropdownTrigger from './dropdown-trigger';
import { Grid, Button } from '../index';
import DropdownMenu from './dropdown';

export default {
  title: 'General/Dropdown',
  component: DropdownMenu,
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
  <DropdownTrigger>
    <Button auto css={{ maxWidth: '200px' }}>
      Trigger
    </Button>
    <DropdownMenu onAction={alert}>
      <DropdownMenuItem>Cut</DropdownMenuItem>
      <DropdownMenuItem>Copy</DropdownMenuItem>
      <DropdownMenuItem>Paste</DropdownMenuItem>
    </DropdownMenu>
  </DropdownTrigger>
);
