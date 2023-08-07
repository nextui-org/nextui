import React, {Key} from "react";
import {Meta} from "@storybook/react";
import {menuItem} from "@nextui-org/theme";
import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@nextui-org/shared-icons";
import {clsx} from "@nextui-org/shared-utils";

import {Listbox, ListboxItem, ListboxSection, ListboxProps} from "../src";

export default {
  title: "Components/Listbox",
  component: Listbox,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light", "flat", "faded", "shadow"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
          <Story />
        </div>
      </div>
    ),
  ],
} as Meta<typeof Listbox>;

const defaultProps = {
  ...menuItem.defaultVariants,
};

const Template = ({color, variant, ...args}: ListboxProps) => (
  <Listbox
    aria-label="Actions"
    color={color}
    variant={variant}
    onAction={(key: Key) => alert(key)}
    {...args}
  >
    <ListboxItem key="new">New file</ListboxItem>
    <ListboxItem key="copy">Copy link</ListboxItem>
    <ListboxItem key="edit">Edit file</ListboxItem>
    <ListboxItem key="delete" className="text-danger" color="danger">
      Delete file
    </ListboxItem>
  </Listbox>
);

const DisabledKeysTemplate = ({color, variant, ...args}: ListboxProps) => (
  <Listbox
    aria-label="Actions"
    color={color}
    disabledKeys={["edit", "delete"]}
    variant={variant}
    onAction={(key: Key) => alert(key)}
    {...args}
  >
    <ListboxItem key="new">New file</ListboxItem>
    <ListboxItem key="copy">Copy link</ListboxItem>
    <ListboxItem key="edit">Edit file</ListboxItem>
    <ListboxItem key="delete" className="text-danger" color="danger">
      Delete file
    </ListboxItem>
  </Listbox>
);

const SingleSelectionTemplate = ({color, variant, ...args}: ListboxProps) => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(new Set(["text"]));

  return (
    <Listbox
      disallowEmptySelection
      aria-label="Actions"
      color={color}
      selectedKeys={selected}
      selectionMode="single"
      variant={variant}
      onSelectionChange={setSelected}
      {...args}
    >
      <ListboxItem key="text">Text</ListboxItem>
      <ListboxItem key="number">Number</ListboxItem>
      <ListboxItem key="date">Date</ListboxItem>
      <ListboxItem key="single_date">Single Date</ListboxItem>
      <ListboxItem key="iteration">Iteration</ListboxItem>
    </Listbox>
  );
};

const MultipleSelectionTemplate = ({color, variant, ...args}: ListboxProps) => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(new Set(["text"]));

  return (
    <Listbox
      disallowEmptySelection
      aria-label="Actions"
      closeOnSelect={false}
      color={color}
      selectedKeys={selected}
      selectionMode="multiple"
      variant={variant}
      onSelectionChange={setSelected}
      {...args}
    >
      <ListboxItem key="text">Text</ListboxItem>
      <ListboxItem key="number">Number</ListboxItem>
      <ListboxItem key="date">Date</ListboxItem>
      <ListboxItem key="single_date">Single Date</ListboxItem>
      <ListboxItem key="iteration">Iteration</ListboxItem>
    </Listbox>
  );
};

const WithStartContentTemplate = ({color, variant, disableAnimation, ...args}: ListboxProps) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Listbox
      aria-label="Actions"
      color={color}
      disableAnimation={disableAnimation}
      variant={variant}
      onAction={(key: Key) => alert(key)}
      {...args}
    >
      <ListboxItem key="new" startContent={<AddNoteBulkIcon className={iconClasses} />}>
        New file
      </ListboxItem>
      <ListboxItem key="copy" startContent={<CopyDocumentBulkIcon className={iconClasses} />}>
        Copy link
      </ListboxItem>
      <ListboxItem key="edit" startContent={<EditDocumentBulkIcon className={iconClasses} />}>
        Edit file
      </ListboxItem>
      <ListboxItem
        key="delete"
        className="text-danger"
        color="danger"
        startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
      >
        Delete file
      </ListboxItem>
    </Listbox>
  );
};

const WithEndContentTemplate = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Listbox
      aria-label="Actions"
      color={color}
      disableAnimation={disableAnimation}
      variant={variant}
      onAction={(key: Key) => alert(key)}
      {...args}
    >
      <ListboxItem key="new" endContent={<AddNoteBulkIcon className={iconClasses} />}>
        New file
      </ListboxItem>
      <ListboxItem key="copy" endContent={<CopyDocumentBulkIcon className={iconClasses} />}>
        Copy link
      </ListboxItem>
      <ListboxItem key="edit" endContent={<EditDocumentBulkIcon className={iconClasses} />}>
        Edit file
      </ListboxItem>
      <ListboxItem
        key="delete"
        className="text-danger"
        color="danger"
        endContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
      >
        Delete file
      </ListboxItem>
    </Listbox>
  );
};

const WithDescriptionTemplate = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Listbox
      aria-label="Actions"
      color={color}
      disableAnimation={disableAnimation}
      variant={variant}
      onAction={(key: Key) => alert(key)}
      {...args}
    >
      <ListboxItem
        key="new"
        description="Create a new file"
        startContent={<AddNoteBulkIcon className={iconClasses} />}
      >
        New file
      </ListboxItem>
      <ListboxItem
        key="copy"
        description="Copy the file link"
        startContent={<CopyDocumentBulkIcon className={iconClasses} />}
      >
        Copy link
      </ListboxItem>
      <ListboxItem
        key="edit"
        description="Allows you to edit the file"
        startContent={<EditDocumentBulkIcon className={iconClasses} />}
      >
        Edit file
      </ListboxItem>
      <ListboxItem
        key="delete"
        className="text-danger"
        color="danger"
        description="Permanently delete the file"
        startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
      >
        Delete file
      </ListboxItem>
    </Listbox>
  );
};

const WithSectionsTemplate = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Listbox
      aria-label="Actions"
      color={color}
      disableAnimation={disableAnimation}
      variant={variant}
      onAction={(key: Key) => alert(key)}
      {...args}
    >
      <ListboxSection title="Actions">
        <ListboxItem
          key="new"
          description="Create a new file"
          startContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </ListboxItem>
        <ListboxItem
          key="copy"
          description="Copy the file link"
          startContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </ListboxItem>
        <ListboxItem
          key="edit"
          description="Allows you to edit the file"
          startContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </ListboxItem>
      </ListboxSection>
      <ListboxSection title="Danger zone">
        <ListboxItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
        >
          Delete file
        </ListboxItem>
      </ListboxSection>
    </Listbox>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const DisabledKeys = {
  render: DisabledKeysTemplate,

  args: {
    ...defaultProps,
  },
};

export const SingleSelection = {
  render: SingleSelectionTemplate,

  args: {
    ...defaultProps,
  },
};

export const MultipleSelection = {
  render: MultipleSelectionTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithStartContent = {
  render: WithStartContentTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
  },
};

export const WithEndContent = {
  render: WithEndContentTemplate,

  args: {
    ...defaultProps,
    variant: "faded",
    color: "success",
  },
};

export const WithDescription = {
  render: WithDescriptionTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
    className: "min-w-[240px]",
  },
};

export const WithSections = {
  render: WithSectionsTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
    className: "min-w-[240px]",
  },
};
