import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {dropdown, popover} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";

import {
  Dropdown,
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
