import React from "react";
import {Meta} from "@storybook/react";
import {badge} from "@nextui-org/theme";
import {Avatar} from "@nextui-org/avatar";
import {CheckIcon} from "@nextui-org/shared-icons";
import {Switch} from "@nextui-org/switch";
import {Notification, CartIcon} from "@nextui-org/shared-icons";

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
      },
      options: ["solid", "flat", "faded", "shadow"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: {
        type: "select",
      },
      options: ["rectangle", "circle"],
    },
    placement: {
      control: {
        type: "select",
      },
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
    },
    isInvisible: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Badge>;

const defaultProps = {
  ...badge.defaultVariants,
  content: 5,
};

const Template = (args: BadgeProps) => (
  <Badge {...args}>
    <Avatar
      isBordered={args.classNames?.badge?.includes("bottom")}
      radius={args.shape === "rectangle" ? "lg" : "full"}
      src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
    />
  </Badge>
);

const ShapesTemplate = (args: BadgeProps) => (
  <div className="flex gap-4 items-center">
    <Badge {...args} shape="rectangle">
      <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
    </Badge>
    <Badge {...args} shape="circle">
      <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </Badge>
  </div>
);

const InvisibleTemplate = (args: BadgeProps) => {
  const [isInvisible, setIsInvisible] = React.useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Badge {...args} color="danger" content={5} isInvisible={isInvisible} shape="circle">
          <Notification className="fill-current" size={30} />
        </Badge>
        <Badge {...args} color="danger" content={50} isInvisible={isInvisible} shape="circle">
          <CartIcon size={30} />
        </Badge>
      </div>
      <Switch isSelected={!isInvisible} onValueChange={(value) => setIsInvisible(!value)}>
        Show badge
      </Switch>
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const Dot = {
  render: Template,

  args: {
    ...defaultProps,
    content: "",
    color: "success",
    size: "sm",
  },
};

export const HorizontalOffset = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "shadow",
    color: "secondary",
    content: <CheckIcon />,
    placement: "bottom-right",
    size: "md",
    classNames: {
      badge: "p-0.5 right-[50%]",
    },
  },
};

export const VerticalOffset = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "shadow",
    color: "secondary",
    content: <CheckIcon />,
    placement: "bottom-right",
    size: "md",
    classNames: {
      badge: "p-0.5 right-[50%] bottom-[50%]",
    },
  },
};

export const Shapes = {
  render: ShapesTemplate,

  args: {
    ...defaultProps,
    color: "danger",
  },
};

export const Invisible = {
  render: InvisibleTemplate,

  args: {
    ...defaultProps,
    color: "danger",
  },
};
