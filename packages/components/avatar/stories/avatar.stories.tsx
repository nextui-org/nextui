import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {Activity} from "@nextui-org/shared-icons";

import {Avatar, AvatarProps} from "../src";

export default {
  title: "Display/Avatar",
  component: Avatar,
  argTypes: {
    color: {
      control: {
        type: "radio",
        options: ["neutral", "primary", "secondary", "success", "warning", "error"],
      },
    },
    radius: {
      control: {
        type: "radio",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args: AvatarProps) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Junior",
};

export const InitialsColor = Template.bind({});
InitialsColor.args = {
  color: "warning",
  name: "Junior",
  classes: {
    name: "text-yellow-50 dark:text-yellow-900 text-sm",
  },
};

export const WithImage = Template.bind({});
WithImage.args = {
  src: "https://i.pravatar.cc/300?u=a042581f4e29026705d",
};

export const isBordered = Template.bind({});
isBordered.args = {
  src: "https://i.pravatar.cc/300?u=a042581f4e29026709d",
  color: "secondary",
  isBordered: true,
};

export const isFocusable = Template.bind({});
isFocusable.args = {
  src: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
  isFocusable: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <Activity fill="currentColor" size={20} />,
  radius: "xl",
};

export const CustomAvatar = Template.bind({});
CustomAvatar.args = {
  icon: <Activity fill="currentColor" size={20} />,
  radius: "xl",
  classes: {
    base: "shadow-lg bg-cyan-200 dark:bg-cyan-800",
  },
};

export const DefaultIcon = Template.bind({});
DefaultIcon.args = {
  classes: {
    icon: "text-neutral-600",
  },
};

export const IconFallback = Template.bind({});
IconFallback.args = {
  src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  showFallback: true,
};

export const InitialsFallback = Template.bind({});
InitialsFallback.args = {
  src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
  name: "Junior",
  showFallback: true,
};
