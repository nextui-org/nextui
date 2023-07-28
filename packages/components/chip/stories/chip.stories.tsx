import React from "react";
import {ComponentMeta} from "@storybook/react";
import {chip} from "@nextui-org/theme";
import {Avatar} from "@nextui-org/avatar";
import {CheckIcon} from "@nextui-org/shared-icons";

import {Chip, ChipProps} from "../src";

export default {
  title: "Components/Chip",
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
} as ComponentMeta<typeof Chip>;

const defaultProps = {
  ...chip.defaultVariants,
  children: "Chip",
};

const Template = (args: ChipProps) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const StartContent = Template.bind({});
StartContent.args = {
  ...defaultProps,
  startContent: (
    <span aria-label="celebration" className="ml-1" role="img">
      🎉
    </span>
  ),
};

export const EndContent = Template.bind({});
EndContent.args = {
  ...defaultProps,
  endContent: (
    <span aria-label="rocket" className="mr-1" role="img">
      🚀
    </span>
  ),
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
  endContent: <CheckIcon />,
  // eslint-disable-next-line
  onClose: () => console.log("Close"),
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  ...defaultProps,
  variant: "flat",
  color: "secondary",
  avatar: <Avatar name="JW" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />,
};
