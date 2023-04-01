import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {circularProgress} from "@nextui-org/theme";

import {CircularProgress, CircularProgressProps} from "../src";

export default {
  title: "Components/CircularProgress",
  component: CircularProgress,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof CircularProgress>;

const defaultProps = {
  ...circularProgress.defaultVariants,
};

const Template: ComponentStory<typeof CircularProgress> = (args: CircularProgressProps) => (
  <CircularProgress {...args} />
);

const IntervalTemplate: ComponentStory<typeof CircularProgress> = (args: CircularProgressProps) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <CircularProgress {...args} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
  "aria-label": "Loading...",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...defaultProps,
  label: "Loading...",
};

export const WithValueLabel = IntervalTemplate.bind({});
WithValueLabel.args = {
  ...defaultProps,
  size: "lg",
  value: 70,
  color: "secondary",
  showValueLabel: true,
};

export const WithValueFormatting = Template.bind({});
WithValueFormatting.args = {
  ...defaultProps,
  label: "Loading...",
  size: "xl",
  value: 70,
  color: "warning",
  showValueLabel: true,
  formatOptions: {style: "unit", unit: "kilometer"},
};
