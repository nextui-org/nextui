import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {button} from "@nextui-org/theme";
import {Notification, Camera} from "@nextui-org/shared-icons";
import {Spinner} from "@nextui-org/spinner";

import {Button, ButtonProps} from "../src";

export default {
  title: "General/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["solid", "bordered", "light", "flat", "faded", "shadow", "ghost"],
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
        options: ["none", "base", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
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
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Button>;

const defaultProps = {
  children: "Button",
  ...button.defaultVariants,
};

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  ...defaultProps,
  isDisabled: true,
};

export const DisableRipple = Template.bind({});
DisableRipple.args = {
  ...defaultProps,
  disableRipple: true,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  ...defaultProps,
  leftIcon: <Notification />,
  rightIcon: <Camera />,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  ...defaultProps,
  color: "primary",
  isDisabled: true,
  children: (
    <>
      <Spinner color="white" size="sm" />
      Button
    </>
  ),
};
