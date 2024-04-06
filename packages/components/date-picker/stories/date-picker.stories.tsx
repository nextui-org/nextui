import React from "react";
import {Meta} from "@storybook/react";
import {datePicker, dateInput} from "@nextui-org/theme";

import {DatePicker, DatePickerProps} from "../src";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
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
      <div className="flex items-center justify-start">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof DatePicker>;

const defaultProps = {
  label: "Birth Date",
  className: "max-w-[256px]",
  ...dateInput.defaultVariants,
  ...datePicker.defaultVariants,
};

const Template = (args: DatePickerProps) => <DatePicker {...args} />;

const LabelPlacementTemplate = (args: DatePickerProps) => (
  <div className="w-full max-w-xl flex flex-col items-end gap-4">
    <DatePicker {...args} description="inside" />
    <DatePicker {...args} description="outside" labelPlacement="outside" />
    <DatePicker {...args} description="outside-left" labelPlacement="outside-left" />
  </div>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithMonthAndYearPickers = {
  render: Template,
  args: {
    ...defaultProps,
    variant: "bordered",
    calendarProps: {
      showMonthAndYearPickers: true,
    },
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};
