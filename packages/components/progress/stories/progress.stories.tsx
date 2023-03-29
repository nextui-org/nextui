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
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
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

export const WithValueLabel = Template.bind({});
WithValueLabel.args = {
  ...defaultProps,
  label: "Loading...",
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
  isIndeterminate: true,
};

export const Striped = Template.bind({});
Striped.args = {
  ...defaultProps,
  isStriped: true,
};
