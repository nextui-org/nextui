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

const avatarSources = [
  {
    src: "https://i.pravatar.cc/300?u=a042581f4e29026705d",
    borderColor: "border-yellow-400",
  },
  {
    src: "https://i.pravatar.cc/300?u=a042581f4e29026706d",
    borderColor: "border-yellow-500",
  },
  {
    src: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
    borderColor: "border-yellow-600",
  },
  {
    src: "https://i.pravatar.cc/300?u=a042581f4e29026709d",
    borderColor: "border-yellow-700",
  },
  {
    src: "https://i.pravatar.cc/300?u=a042581f4f29026709d",
    borderColor: "border-yellow-500",
  },
  {
    src: "https://i.pravatar.cc/300?u=a042581f4e29026710d",
    borderColor: "border-yellow-500",
  },
  {
    src: "https://i.pravatar.cc/300?u=a042581f4e29026711d",
    borderColor: "border-yellow-500",
  },
  {
    src: "https://i.pravatar.cc/300?u=a042581f4e29026712d",
    borderColor: "border-yellow-500",
  },
  {
    src: "https://i.pravatar.cc/300?u=a042581f4e29026713d",
    borderColor: "border-yellow-500",
  },
];

const Template = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    {avatarSources.map((avatar) => (
      <Avatar key={avatar.src} src={avatar.src} />
    ))}
  </AvatarGroup>
);

const CustomSlotsTemplate = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    {avatarSources.map((avatar) => (
      <Avatar
        key={avatar.src}
        classNames={{base: `border-2 ${avatar.borderColor}`}}
        radius="sm"
        size="sm"
        src={avatar.src}
      />
    ))}
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
