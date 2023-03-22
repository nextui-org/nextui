import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {button} from "@nextui-org/theme";
import {Notification, Camera} from "@nextui-org/shared-icons";
import {Spinner} from "@nextui-org/spinner";

import {Button, ButtonProps} from "../src";

export default {
  title: "Components/Button",
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

const StateTemplate: ComponentStory<typeof Button> = (args: ButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Button {...args} onPress={handleClick}>
      {isOpen ? "Close" : "Open"}
    </Button>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithState = StateTemplate.bind({});
WithState.args = {
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

export const IconButton = Template.bind({});
IconButton.args = {
  ...defaultProps,
  children: <Notification fill="currentColor" />,
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
