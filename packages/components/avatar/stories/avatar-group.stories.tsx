/* eslint-disable react/display-name */
import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";

import {Avatar, AvatarGroup, AvatarGroupProps} from "../src";

export default {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
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
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    spacing: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof AvatarGroup>;

const Template: ComponentStory<typeof AvatarGroup> = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026705d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026706d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026707d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4f29026709d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026710d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026711d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026712d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026713d" />
  </AvatarGroup>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  isBordered: true,
};

export const Grid = Template.bind({});
Grid.args = {
  color: "primary",
  isBordered: true,
  max: 7,
  isGrid: true,
};

export const isDisabled = Template.bind({});
isDisabled.args = {
  color: "warning",
  isBordered: true,
  isDisabled: true,
};

export const WithMaxCount = Template.bind({});
WithMaxCount.args = {
  color: "primary",
  isBordered: true,
  max: 3,
};

export const WithTotal = Template.bind({});
WithTotal.args = {
  color: "primary",
  isBordered: true,
  max: 3,
  total: 10,
};

export const CustomCount = Template.bind({});
CustomCount.args = {
  color: "primary",
  isBordered: true,
  max: 3,
  total: 10,
  renderCount: (count: number) => (
    <p className="text-sm text-black dark:text-white ml-2">+{count}</p>
  ),
};
