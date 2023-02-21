import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {chip} from "@nextui-org/theme";

import {Chip, ChipProps} from "../src";

export default {
  title: "Display/Chip",
  component: Chip,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["solid", "bordered", "light", "flat", "shadow"],
      },
    },
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
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Chip>;

const defaultProps = {
  ...chip.defaultVariants,
  children: "Chip",
};

const Template: ComponentStory<typeof Chip> = (args: ChipProps) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
