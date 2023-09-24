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
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
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
} as Meta<typeof Slider>;

const defaultProps = {
  ...slider.defaultVariants,
};

const Template = (args: SliderProps) => <Slider {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Range = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: [20, 80],
  },
};
