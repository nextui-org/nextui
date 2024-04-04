import React from "react";
import {Meta} from "@storybook/react";
import {dateField} from "@nextui-org/theme";

import {DateField, DateFieldProps} from "../src";

export default {
  title: "Components/DateField",
  component: DateField,
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
} as Meta<typeof DateField>;

const defaultProps = {
  label: "Birthday",
  ...dateField.defaultVariants,
};

const Template = (args: DateFieldProps) => <DateField {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
