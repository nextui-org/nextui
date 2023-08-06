import React from "react";
import {Meta} from "@storybook/react";
import {menuItem} from "@nextui-org/theme";

import {Menu, MenuItem, MenuProps} from "../src";

export default {
  title: "Components/Menu",
  component: Menu,
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
} as Meta<typeof Menu>;

const defaultProps = {
  ...menuItem.defaultVariants,
};

const Template = ({color, variant, ...args}: MenuProps) => (
  <Menu aria-label="Actions" color={color} variant={variant} onAction={alert} {...args}>
    <MenuItem key="new">New file</MenuItem>
    <MenuItem key="copy">Copy link</MenuItem>
    <MenuItem key="edit">Edit file</MenuItem>
    <MenuItem key="delete" className="text-danger" color="danger">
      Delete file
    </MenuItem>
  </Menu>
);

const DisabledKeysTemplate = ({color, variant, ...args}: MenuProps) => (
  <Menu
    aria-label="Actions"
    color={color}
    disabledKeys={["edit", "delete"]}
    variant={variant}
    onAction={alert}
    {...args}
  >
    <MenuItem key="new">New file</MenuItem>
    <MenuItem key="copy">Copy link</MenuItem>
    <MenuItem key="edit">Edit file</MenuItem>
    <MenuItem key="delete" className="text-danger" color="danger">
      Delete file
    </MenuItem>
  </Menu>
);

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
