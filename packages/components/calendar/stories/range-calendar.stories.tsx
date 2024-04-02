import React from "react";
import {Meta} from "@storybook/react";
import {calendar} from "@nextui-org/theme";

import {RangeCalendar, RangeCalendarProps} from "../src";

export default {
  title: "Components/RangeCalendar",
  component: RangeCalendar,
  parameters: {
    layout: "centered",
  },
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
    weekdayStyle: {
      control: {
        type: "select",
      },
      options: ["narrow", "short", "long"],
    },
  },
} as Meta<typeof RangeCalendar>;

delete calendar.defaultVariants?.showMonthAndYearPickers;

const defaultProps = {
  ...calendar.defaultVariants,
  visibleMonths: 1,
};

const Template = (args: RangeCalendarProps) => <RangeCalendar {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
