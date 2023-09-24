import React from "react";
import {Meta} from "@storybook/react";
import {slider} from "@nextui-org/theme";

import {Slider, SliderProps} from "../src";

export default {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    label: {
      control: {type: "text"},
    },
    fillOffset: {
      control: {type: "number"},
    },
    color: {
      control: {type: "select"},
      options: ["foreground", "primary", "secondary", "success", "warning", "danger"],
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
  decorators: [
    (Story) => (
      <div className="flex max-w-md items-center justify-start">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Slider>;

const defaultProps = {
  ...slider.defaultVariants,
};

const Template = (args: SliderProps) => <Slider {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    label: "Select a number",
  },
};

export const Range = {
  render: Template,
  args: {
    ...defaultProps,
    label: "Select a range",
    formatOptions: {style: "currency", currency: "USD"},
    defaultValue: [20, 80],
  },
};

export const FillOffset = {
  render: Template,
  args: {
    ...defaultProps,
    label: "Select a value",
    maxValue: 50,
    minValue: -50,
    fillOffset: 0,
    defaultValue: 20,
  },
};
