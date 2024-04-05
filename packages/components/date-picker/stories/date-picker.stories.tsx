import React from "react";
import {Meta} from "@storybook/react";
import {datePicker} from "@nextui-org/theme";

import {DatePicker, DatePickerProps} from "../src";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-start">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof DatePicker>;

const defaultProps = {
  label: "Birth Date",
  className: "max-w-[256px]",
  ...datePicker.defaultVariants,
};

const Template = (args: DatePickerProps) => <DatePicker {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
