/* eslint-disable react/display-name */
import React from "react";
import {Meta} from "@storybook/react";

import {Avatar, AvatarGroup, AvatarGroupProps} from "../src";

export default {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  argTypes: {
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
    spacing: {
      control: {
        disable: true,
      },
    },
  },
} as Meta<typeof AvatarGroup>;

const Template = (args: AvatarGroupProps) => (
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

const CustomSlotsTemplate = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar
      classNames={{base: "border-2 border-yellow-400"}}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    />
    <Avatar
      classNames={{base: "border-2 border-yellow-500"}}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
    />
    <Avatar
      classNames={{base: "border-2 border-yellow-600"}}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
    />
    <Avatar
      classNames={{base: "border-2 border-yellow-700"}}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a04258114e29026302d"
    />
    <Avatar
      classNames={{base: "border-2 border-yellow-500"}}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a04258114e29026702d"
    />
    <Avatar
      classNames={{base: "border-2 border-yellow-500"}}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a04258114e29026708c"
    />
  </AvatarGroup>
);

export const Default = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
  },
};

export const Grid = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
    max: 7,
    isGrid: true,
  },
};

export const isDisabled = {
  render: Template,

  args: {
    color: "warning",
    isBordered: true,
    isDisabled: true,
  },
};

export const WithMaxCount = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
    max: 3,
  },
};

export const WithTotal = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
    max: 3,
    total: 10,
  },
};

export const CustomCount = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
    max: 3,
    total: 10,
    renderCount: (count: number) => (
      <p className="text-sm text-black dark:text-white ms-2">+{count}</p>
    ),
  },
};

export const CustomSlots = {
  render: CustomSlotsTemplate,

  args: {
    classNames: {count: "border-2 border-yellow-400"},
    max: 3,
    radius: "sm",
    size: "sm",
  },
};
