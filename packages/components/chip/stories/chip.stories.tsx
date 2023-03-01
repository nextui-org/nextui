import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {chip} from "@nextui-org/theme";
import {Avatar} from "@nextui-org/avatar";
import {CheckIcon} from "@nextui-org/shared-icons";

import {Chip, ChipProps} from "../src";

export default {
  title: "Display/Chip",
  component: Chip,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["solid", "bordered", "light", "flat", "faded", "shadow", "dot"],
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

export const Closeable = Template.bind({});
Closeable.args = {
  ...defaultProps,
  // eslint-disable-next-line
  onClose: () => console.log("Close"),
};

export const CustomCloseIcon = Template.bind({});
CustomCloseIcon.args = {
  ...defaultProps,
  rightContent: <CheckIcon />,
  // eslint-disable-next-line
  onClose: () => console.log("Close"),
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  ...defaultProps,
  variant: "flat",
  color: "secondary",
  leftContent: <Avatar name="JW" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />,
};
