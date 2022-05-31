import React from 'react';
import { Meta } from '@storybook/react';
import { Button, Grid, Text, Avatar, User } from '../index';
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

export const SingleSelection = () => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(
    new Set(['text'])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(', ').replaceAll('_', ' '),
    [selected]
  );

  return (
    <Dropdown>
      <Dropdown.Button flat color="secondary" css={{ tt: 'capitalize' }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Dropdown.Item key="text">Text</Dropdown.Item>
        <Dropdown.Item key="number">Number</Dropdown.Item>
        <Dropdown.Item key="date">Date</Dropdown.Item>
        <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
        <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const MultipleSelection = () => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(
    new Set(['text'])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(', ').replaceAll('_', ' '),
    [selected]
  );

  return (
    <Dropdown>
      <Dropdown.Button flat color="secondary" css={{ tt: 'capitalize' }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Dropdown.Item key="text">Text</Dropdown.Item>
        <Dropdown.Item key="number">Number</Dropdown.Item>
        <Dropdown.Item key="date">Date</Dropdown.Item>
        <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
        <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

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

export const Sections = () => (
  <Dropdown>
    <Dropdown.Button flat color="secondary" size="sm" />
    <Dropdown.Menu color="secondary" aria-label="Actions" onAction={alert}>
      <Dropdown.Section title="Actions">
        <Dropdown.Item
          key="new"
          command="⌘N"
          description="Create a new fil"
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
      </Dropdown.Section>
      <Dropdown.Section title="Danger zone">
        <Dropdown.Item
          key="delete"
          color="error"
          command="⌘⇧D"
          description="Delete the file"
          icon={<DeleteDocumentBulk size={22} fill="currentColor" />}
        >
          Delete file
        </Dropdown.Item>
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown>
);

export const CustomTrigger = () => (
  <Grid.Container justify="center" gap={2}>
    <Grid>
      <Dropdown placement="bottom-right">
        <Dropdown.Trigger>
          <Avatar
            bordered
            size="lg"
            as="button"
            color="secondary"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </Dropdown.Trigger>
        <Dropdown.Menu
          color="secondary"
          aria-label="Avatar Actions"
          onAction={alert}
        >
          <Dropdown.Item key="profile" css={{ height: '$18' }}>
            <Text b color="inherit" css={{ d: 'flex' }}>
              Signed in as
            </Text>
            <Text b color="inherit" css={{ d: 'flex' }}>
              zoey@example.com
            </Text>
          </Dropdown.Item>
          <Dropdown.Item key="settings" withDivider>
            My Settings
          </Dropdown.Item>
          <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
          <Dropdown.Item key="analytics" withDivider>
            Analytics
          </Dropdown.Item>
          <Dropdown.Item key="system">System</Dropdown.Item>
          <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
          <Dropdown.Item key="help_and_feedback" withDivider>
            Help & Feedback
          </Dropdown.Item>
          <Dropdown.Item key="logout" color="error" withDivider>
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Grid>
    <Grid>
      <Dropdown placement="bottom-right">
        <Dropdown.Trigger>
          <User
            bordered
            as="button"
            name="Zoey Lang"
            description="@zoey"
            size="lg"
            color="primary"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </Dropdown.Trigger>
        <Dropdown.Menu
          color="primary"
          aria-label="User Actions"
          onAction={alert}
        >
          <Dropdown.Item key="profile" css={{ height: '$18' }}>
            <Text b color="inherit" css={{ d: 'flex' }}>
              Signed in as
            </Text>
            <Text b color="inherit" css={{ d: 'flex' }}>
              zoey@example.com
            </Text>
          </Dropdown.Item>
          <Dropdown.Item key="settings" withDivider>
            My Settings
          </Dropdown.Item>
          <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
          <Dropdown.Item key="analytics" withDivider>
            Analytics
          </Dropdown.Item>
          <Dropdown.Item key="system">System</Dropdown.Item>
          <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
          <Dropdown.Item key="help_and_feedback" withDivider>
            Help & Feedback
          </Dropdown.Item>
          <Dropdown.Item key="logout" color="error" withDivider>
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Grid>
  </Grid.Container>
);

export const DisableAnimation = () => (
  <Dropdown disableAnimation>
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
