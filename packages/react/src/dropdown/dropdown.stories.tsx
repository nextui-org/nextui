import React from 'react';
import { Meta } from '@storybook/react';
import { Button } from '../index';
import { ChevronDownBold } from '../utils/icons';
import Dropdown from './index';

export default {
  title: 'General/Dropdown',
  component: Dropdown
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
  <Dropdown>
    <Dropdown.Trigger>
      <Button auto>Trigger</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu aria-label="Actions" onAction={alert}>
      <Dropdown.Item key="new">New file</Dropdown.Item>
      <Dropdown.Item key="copy">Copy link</Dropdown.Item>
      <Dropdown.Item key="edit">Edit file</Dropdown.Item>
      <Dropdown.Item key="delete" color="error">
        Delete file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const WithDivider = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button auto>Trigger</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu aria-label="Actions" onAction={alert}>
      <Dropdown.Item key="new">New file</Dropdown.Item>
      <Dropdown.Item key="copy">Copy link</Dropdown.Item>
      <Dropdown.Item key="edit">Edit file</Dropdown.Item>
      <Dropdown.Item key="delete" color="error" withDivider>
        Delete file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const WithChevron = () => (
  <Dropdown>
    <Dropdown.Button>Trigger</Dropdown.Button>
    <Dropdown.Menu aria-label="Actions" onAction={alert}>
      <Dropdown.Item key="new">New file</Dropdown.Item>
      <Dropdown.Item key="copy">Copy link</Dropdown.Item>
      <Dropdown.Item key="edit">Edit file</Dropdown.Item>
      <Dropdown.Item key="delete" color="error" withDivider>
        Delete file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const Bordered = () => (
  <Dropdown isBordered disableShadow>
    <Dropdown.Button>Trigger</Dropdown.Button>
    <Dropdown.Menu aria-label="Actions" onAction={alert}>
      <Dropdown.Item key="new">New file</Dropdown.Item>
      <Dropdown.Item key="copy">Copy link</Dropdown.Item>
      <Dropdown.Item key="edit">Edit file</Dropdown.Item>
      <Dropdown.Item key="delete" color="error" withDivider>
        Delete file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const DisableAnimation = () => (
  <Dropdown disableAnimation>
    <Dropdown.Button>Trigger</Dropdown.Button>
    <Dropdown.Menu aria-label="Actions" onAction={alert}>
      <Dropdown.Item key="new">New file</Dropdown.Item>
      <Dropdown.Item key="copy">Copy link</Dropdown.Item>
      <Dropdown.Item key="edit">Edit file</Dropdown.Item>
      <Dropdown.Item key="delete" color="error" withDivider>
        Delete file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
