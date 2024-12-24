import React from "react";
import {Meta} from "@storybook/react";
import {toast} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";

import {Toast, ToastProps, ToastProvider, addToast} from "../src";

export default {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["faded", "flat", "bordered", "solid"],
    },
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
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Toast>;

const defaultProps = {
  ...toast.defaultVariants,
};

const Template = (args: ToastProps) => (
  <>
    <ToastProvider {...args} />
    <Button
      onPress={() => {
        addToast({
          title: "Title",
          description: "Toast description",
          ...args,
        });
      }}
    >
      Toast
    </Button>
  </>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithTimeout = {
  render: Template,
  args: {
    ...defaultProps,
    timeout: 3000,
  },
};
