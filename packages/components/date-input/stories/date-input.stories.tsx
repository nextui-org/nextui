import React from "react";
import {Meta} from "@storybook/react";
import {dateInput} from "@nextui-org/theme";

import {DateInput, DateInputProps} from "../src";

export default {
  title: "Components/DateInput",
  component: DateInput,
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
} as Meta<typeof DateInput>;

const defaultProps = {
  label: "Birthday",
  ...dateInput.defaultVariants,
};

const Template = (args: DateInputProps) => <DateInput {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
