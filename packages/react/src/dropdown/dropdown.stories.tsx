import React from 'react';
import { Meta } from '@storybook/react';
import { Button, Grid } from '../index';
import {
  AddNoteBulk,
  CopyDocumentBulk,
  DeleteDocumentBulk,
  EditDocumentBulk
} from '../utils/icons';
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

export const DisabledKeys = () => (
  <Dropdown>
    <Dropdown.Button color="secondary" flat>
      Trigger
    </Dropdown.Button>
    <Dropdown.Menu
      color="secondary"
      aria-label="Actions"
      onAction={alert}
      disabledKeys={['edit', 'delete']}
    >
      <Dropdown.Item key="new">New file</Dropdown.Item>
      <Dropdown.Item key="copy">Copy link</Dropdown.Item>
      <Dropdown.Item key="edit">Edit file</Dropdown.Item>
      <Dropdown.Item key="delete" color="error" withDivider>
        Delete file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const Variants = () => (
  <Grid.Container gap={1.5} justify="center">
    <Grid>
      <Dropdown>
        <Dropdown.Button flat>Flat</Dropdown.Button>
        <Dropdown.Menu aria-label="Actions" onAction={alert}>
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error" withDivider>
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Grid>
    <Grid>
      <Dropdown>
        <Dropdown.Button color="primary">Solid</Dropdown.Button>
        <Dropdown.Menu
          color="primary"
          variant="solid"
          aria-label="Actions"
          onAction={alert}
        >
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error" withDivider>
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Grid>
    <Grid>
      <Dropdown>
        <Dropdown.Button color="primary" shadow>
          Shadow
        </Dropdown.Button>
        <Dropdown.Menu
          color="primary"
          variant="shadow"
          aria-label="Actions"
          onAction={alert}
        >
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error" withDivider>
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Grid>
    <Grid>
      <Dropdown>
        <Dropdown.Button color="primary" light>
          Light
        </Dropdown.Button>
        <Dropdown.Menu
          color="primary"
          variant="light"
          aria-label="Actions"
          onAction={alert}
        >
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error" withDivider>
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Grid>
  </Grid.Container>
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

export const WithCommand = () => (
  <Dropdown>
    <Dropdown.Button flat color="secondary" size="sm" />
    <Dropdown.Menu color="secondary" aria-label="Actions" onAction={alert}>
      <Dropdown.Item key="new" command="⌘N">
        New file
      </Dropdown.Item>
      <Dropdown.Item key="copy" command="⌘C">
        Copy link
      </Dropdown.Item>
      <Dropdown.Item key="edit" command="⌘⇧E">
        Edit file
      </Dropdown.Item>
      <Dropdown.Item withDivider key="delete" color="error" command="⌘⇧D">
        Delete file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const WithIcon = () => (
  <Dropdown>
    <Dropdown.Button flat color="primary" size="sm" />
    <Dropdown.Menu color="primary" aria-label="Actions" onAction={alert}>
      <Dropdown.Item
        key="new"
        command="⌘N"
        icon={<AddNoteBulk size={22} fill="var(--nextui-colors-primary)" />}
      >
        New file
      </Dropdown.Item>
      <Dropdown.Item
        key="copy"
        command="⌘C"
        icon={
          <CopyDocumentBulk size={22} fill="var(--nextui-colors-primary)" />
        }
      >
        Copy link
      </Dropdown.Item>
      <Dropdown.Item
        key="edit"
        command="⌘⇧E"
        icon={
          <EditDocumentBulk size={22} fill="var(--nextui-colors-primary)" />
        }
      >
        Edit file
      </Dropdown.Item>
      <Dropdown.Item
        withDivider
        key="delete"
        color="error"
        command="⌘⇧D"
        icon={<DeleteDocumentBulk size={22} fill="currentColor" />}
      >
        Delete file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const WithDescription = () => (
  <Dropdown>
    <Dropdown.Button flat color="secondary" size="sm" />
    <Dropdown.Menu color="secondary" aria-label="Actions" onAction={alert}>
      <Dropdown.Item
        key="new"
        command="⌘N"
        description="Create a new file"
        icon={<AddNoteBulk size={22} fill="var(--nextui-colors-secondary)" />}
      >
        New file
      </Dropdown.Item>
      <Dropdown.Item
        key="copy"
        command="⌘C"
        description="Copy the link"
        icon={
          <CopyDocumentBulk size={22} fill="var(--nextui-colors-secondary)" />
        }
      >
        Copy link
      </Dropdown.Item>
      <Dropdown.Item
        key="edit"
        command="⌘⇧E"
        description="Edit the file"
        icon={
          <EditDocumentBulk size={22} fill="var(--nextui-colors-secondary)" />
        }
      >
        Edit file
      </Dropdown.Item>
      <Dropdown.Item
        withDivider
        key="delete"
        color="error"
        command="⌘⇧D"
        description="Delete the file"
        icon={<DeleteDocumentBulk size={22} fill="currentColor" />}
      >
        Delete file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
