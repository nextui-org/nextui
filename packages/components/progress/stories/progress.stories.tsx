import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {progress} from "@nextui-org/theme";

import {Progress, ProgressProps} from "../src";

export default {
  title: "Components/Progress",
  component: Progress,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["default", "primary", "secondary", "success", "warning", "danger"],
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
} as ComponentMeta<typeof Progress>;

const defaultProps = {
  ...progress.defaultVariants,
  value: 55,
};

const Template: ComponentStory<typeof Progress> = (args: ProgressProps) => (
  <div className="max-w-[400px]">
    <Progress {...args} />
  </div>
);

const IntervalTemplate: ComponentStory<typeof Progress> = (args: ProgressProps) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[400px]">
      <Progress {...args} value={value} />
    </div>
  );
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
  label: "Downloading...",
  color: "success",
  showValueLabel: true,
};

export const WithValueFormatting = Template.bind({});
WithValueFormatting.args = {
  ...defaultProps,
  label: "Loading...",
  showValueLabel: true,
  formatOptions: {style: "currency", currency: "ARS"},
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  ...defaultProps,
  size: "xs",
  radius: "none",
  isIndeterminate: true,
};

export const Striped = Template.bind({});
Striped.args = {
  ...defaultProps,
  isStriped: true,
};
