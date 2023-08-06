import React from "react";
import {Meta} from "@storybook/react";
import {select} from "@nextui-org/theme";

import {Select, SelectItem, SelectProps} from "../src";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "sm", "md", "lg", "full"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
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
} as Meta<typeof Select>;

const defaultProps = {
  ...select.defaultVariants,
};

const Template = ({color, variant, ...args}: SelectProps) => (
  <Select
    aria-label="Favorite Animal"
    color={color}
    label="Favorite Animal"
    variant={variant}
    onSelectionChange={alert}
    {...args}
  >
    <SelectItem key="new">New file</SelectItem>
    <SelectItem key="copy">Copy link</SelectItem>
    <SelectItem key="edit">Edit file</SelectItem>
    <SelectItem key="delete" className="text-danger" color="danger">
      Delete file
    </SelectItem>
  </Select>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
