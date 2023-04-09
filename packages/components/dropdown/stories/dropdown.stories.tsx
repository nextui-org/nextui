import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {dropdown, popover} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";
import {Avatar} from "@nextui-org/avatar";
import {User} from "@nextui-org/user";
import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@nextui-org/shared-icons";
import {clsx} from "@nextui-org/shared-utils";

import {
  Dropdown,
  DropdownSection,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownProps,
  DropdownMenuProps,
} from "../src";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["solid", "bordered", "light", "flat", "faded", "shadow"],
      },
    },
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    placement: {
      control: {
        type: "select",
        options: [
          "top",
          "bottom",
          "right",
          "left",
          "top-start",
          "top-end",
          "bottom-start",
          "bottom-end",
          "left-start",
          "left-end",
          "right-start",
          "right-end",
        ],
      },
    },
    backdropVariant: {
      control: {
        type: "select",
        options: ["transparent", "blur", "opaque"],
      },
    },
    offset: {
      control: {
        type: "number",
      },
    },
    defaultOpen: {
      control: {
        type: "boolean",
      },
    },
    showArrow: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const defaultProps = {
  ...popover.defaultVariants,
  ...dropdown.defaultVariants,
  placement: "bottom",
  offset: 7,
  defaultOpen: false,
  disableAnimation: false,
};

const Template: ComponentStory<any> = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
      <DropdownItem key="new">New file</DropdownItem>
      <DropdownItem key="copy">Copy link</DropdownItem>
      <DropdownItem key="edit">Edit file</DropdownItem>
      <DropdownItem key="delete" className="text-danger" color="danger">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const DividerTemplate: ComponentStory<any> = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
      <DropdownItem key="new">New file</DropdownItem>
      <DropdownItem key="copy">Copy link</DropdownItem>
      <DropdownItem key="edit">Edit file</DropdownItem>
      <DropdownItem key="delete" showDivider className="text-danger" color="danger">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const DisabledKeysTemplate: ComponentStory<any> = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Actions"
      color={color}
      disabledKeys={["edit", "delete"]}
      variant={variant}
      onAction={alert}
    >
      <DropdownItem key="new">New file</DropdownItem>
      <DropdownItem key="copy">Copy link</DropdownItem>
      <DropdownItem key="edit">Edit file</DropdownItem>
      <DropdownItem key="delete" showDivider className="text-danger" color="danger">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const SingleSelectionTemplate: ComponentStory<any> = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(new Set(["text"]));

  const selectedValue = React.useMemo(
    () =>
      Array.from(selected)
        .map((key) => key.toString().replace("_", " "))
        .join(", "),
    [selected],
  );

  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>{selectedValue}</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Actions"
        color={color}
        selectedKeys={selected}
        selectionMode="single"
        variant={variant}
        onSelectionChange={setSelected}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const MultipleSelectionTemplate: ComponentStory<any> = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(new Set(["text"]));

  const selectedValue = React.useMemo(
    () =>
      Array.from(selected)
        .map((key) => key.toString().replace("_", " "))
        .join(", "),
    [selected],
  );

  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>{selectedValue}</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Actions"
        closeOnSelect={false}
        color={color}
        selectedKeys={selected}
        selectionMode="multiple"
        variant={variant}
        onSelectionChange={setSelected}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithShortcutTemplate: ComponentStory<any> = ({color, variant, ...args}) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
      <DropdownItem key="new" shortcut="⌘N">
        New file
      </DropdownItem>
      <DropdownItem key="copy" shortcut="⌘C">
        Copy link
      </DropdownItem>
      <DropdownItem key="edit" shortcut="⌘⇧E">
        Edit file
      </DropdownItem>
      <DropdownItem key="delete" showDivider className="text-danger" color="danger" shortcut="⌘⇧D">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const WithStartContentTemplate: ComponentStory<any> = ({
  color,
  variant,
  disableAnimation,
  ...args
}) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button color="secondary" disableAnimation={disableAnimation} variant="flat">
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
        <DropdownItem
          key="new"
          shortcut="⌘N"
          startContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
          startContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
          startContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          showDivider
          className="text-danger"
          color="danger"
          shortcut="⌘⇧D"
          startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithDescriptionTemplate: ComponentStory<any> = ({
  color,
  variant,
  disableAnimation,
  ...args
}) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button color="secondary" disableAnimation={disableAnimation} variant="flat">
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
        <DropdownItem
          key="new"
          description="Create a new file"
          shortcut="⌘N"
          startContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          description="Copy the file link"
          shortcut="⌘C"
          startContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          description="Allows you to edit the file"
          shortcut="⌘⇧E"
          startContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          showDivider
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          shortcut="⌘⇧D"
          startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithSectionsTemplate: ComponentStory<any> = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none flex-shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button color="secondary" disableAnimation={disableAnimation} variant="flat">
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Actions"
        closeOnSelect={false}
        color={color}
        variant={variant}
        onAction={alert}
      >
        <DropdownSection title="Actions">
          <DropdownItem
            key="new"
            description="Create a new file"
            shortcut="⌘N"
            startContent={<AddNoteBulkIcon className={iconClasses} />}
          >
            New file
          </DropdownItem>
          <DropdownItem
            key="copy"
            description="Copy the file link"
            shortcut="⌘C"
            startContent={<CopyDocumentBulkIcon className={iconClasses} />}
          >
            Copy link
          </DropdownItem>
          <DropdownItem
            key="edit"
            description="Allows you to edit the file"
            shortcut="⌘⇧E"
            startContent={<EditDocumentBulkIcon className={iconClasses} />}
          >
            Edit file
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the file"
            shortcut="⌘⇧D"
            startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

const CustomTriggerTemplate: ComponentStory<any> = ({variant, ...args}) => {
  return (
    <div className="flex items-center gap-10">
      <Dropdown {...args} placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            size="lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" color="secondary" variant={variant}>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings" showDivider>
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics" showDivider>
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback" showDivider>
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" showDivider color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown {...args} placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              color: "primary",
              size: "lg",
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" color="primary" variant={variant}>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@tonyreichert</p>
          </DropdownItem>
          <DropdownItem key="settings" showDivider>
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics" showDivider>
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback" showDivider>
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" showDivider color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithArrow = Template.bind({});
WithArrow.args = {
  ...defaultProps,
  showArrow: true,
};

export const WithDivider = DividerTemplate.bind({});
WithDivider.args = {
  ...defaultProps,
};

export const DisabledKeys = DisabledKeysTemplate.bind({});
DisabledKeys.args = {
  ...defaultProps,
};

export const SingleSelection = SingleSelectionTemplate.bind({});
SingleSelection.args = {
  ...defaultProps,
};

export const MultipleSelection = MultipleSelectionTemplate.bind({});
MultipleSelection.args = {
  ...defaultProps,
};

export const WithShortcut = WithShortcutTemplate.bind({});
WithShortcut.args = {
  ...defaultProps,
};

export const WithStartContent = WithStartContentTemplate.bind({});
WithStartContent.args = {
  ...defaultProps,
  variant: "flat",
  color: "secondary",
};

export const WithDescription = WithDescriptionTemplate.bind({});
WithDescription.args = {
  ...defaultProps,
  variant: "flat",
  color: "secondary",
  className: "min-w-[240px]",
};

export const WithSections = WithSectionsTemplate.bind({});
WithSections.args = {
  ...defaultProps,
  variant: "flat",
  color: "secondary",
  className: "min-w-[240px]",
};

export const WithCustomTrigger = CustomTriggerTemplate.bind({});
WithCustomTrigger.args = {
  ...defaultProps,
  variant: "flat",
  offset: 14,
};

export const DisableAnimation = WithStartContentTemplate.bind({});
DisableAnimation.args = {
  ...defaultProps,
  showArrow: true,
  variant: "flat",
  color: "secondary",
  disableAnimation: true,
};
