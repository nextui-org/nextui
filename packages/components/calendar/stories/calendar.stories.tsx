import React from "react";
import {Meta} from "@storybook/react";
import {calendar} from "@nextui-org/theme";

import {Calendar, CalendarProps} from "../src";

export default {
  title: "Components/Calendar",
  component: Calendar,
  argTypes: {
    visibleMonths: {
      control: {type: "number", min: 1, max: 3},
    },
    color: {
      control: {
        type: "select",
      },
      options: ["foreground", "primary", "secondary", "success", "warning", "danger"],
    },
  },
} as Meta<typeof Calendar>;

const defaultProps = {
  ...calendar.defaultVariants,
  visibleMonths: 1,
};

const Template = (args: CalendarProps) => <Calendar {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
