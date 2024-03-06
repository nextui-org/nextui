import React from "react";
import {Meta} from "@storybook/react";
import {calendar} from "@nextui-org/theme";

import {Calendar, CalendarProps} from "../src";

export default {
  title: "Components/Calendar",
  component: Calendar,
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
} as Meta<typeof Calendar>;

const defaultProps = {
  ...calendar.defaultVariants,
};

const Template = (args: CalendarProps) => <Calendar {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
