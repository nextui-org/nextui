import React from "react";
import {Meta} from "@storybook/react";
import {dateInput} from "@nextui-org/theme";

import {DateRangePicker, DateRangePickerProps} from "../src";

export default {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
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
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-start max-w-sm">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof DateRangePicker>;

const defaultProps = {
  label: "Birth Date",
  className: "max-w-[256px]",
  ...dateInput.defaultVariants,
};

const Template = (args: DateRangePickerProps) => <DateRangePicker {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
