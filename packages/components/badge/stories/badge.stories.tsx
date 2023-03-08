import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {badge} from "@nextui-org/theme";
import {Avatar} from "@nextui-org/avatar";
import {CheckIcon} from "@nextui-org/shared-icons";

import {Badge, BadgeProps} from "../src";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    content: {
      control: {
        type: "text",
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["solid", "flat", "faded", "shadow"],
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
    shape: {
      control: {
        type: "select",
        options: ["rectangle", "circle"],
      },
    },
    placement: {
      control: {
        type: "select",
        options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      },
    },
  },
} as ComponentMeta<typeof Badge>;

const defaultProps = {
  ...badge.defaultVariants,
  content: 5,
};

const Template: ComponentStory<typeof Badge> = (args: BadgeProps) => (
  <Badge {...args}>
    <Avatar
      isBordered={args.styles?.badge?.includes("bottom")}
      radius={args.shape === "rectangle" ? "lg" : "full"}
      src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
    />
  </Badge>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const Dot = Template.bind({});
Dot.args = {
  ...defaultProps,
  content: "",
  color: "success",
  size: "sm",
};

export const HorizontalOffset = Template.bind({});
HorizontalOffset.args = {
  ...defaultProps,
  variant: "shadow",
  color: "secondary",
  content: <CheckIcon />,
  placement: "bottom-right",
  size: "md",
  styles: {
    badge: "p-0.5 right-[50%]",
  },
};

export const VerticalOffset = Template.bind({});
VerticalOffset.args = {
  ...defaultProps,
  variant: "shadow",
  color: "secondary",
  content: <CheckIcon />,
  placement: "bottom-right",
  size: "md",
  styles: {
    badge: "p-0.5 right-[50%] bottom-[50%]",
  },
};
