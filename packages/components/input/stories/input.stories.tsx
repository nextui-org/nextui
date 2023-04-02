import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {input} from "@nextui-org/theme";

import {Input, InputProps} from "../src";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["flat", "faded", "bordered", "underlined"],
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
    labelPosition: {
      control: {
        type: "select",
        options: ["outside", "outside-left", "inside"],
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Input>;

const defaultProps = {
  ...input.defaultVariants,
  label: "Email",
};

const Template: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="max-w-md flex flex-row gap-4">
    <Input {...args} />
    <Input {...args} placeholder="Enter your email" />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...defaultProps,
  placeholder: "Enter your email",
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  ...defaultProps,
  errorMessage: "Please enter a valid email address",
};

export const InvalidValidationState = Template.bind({});
InvalidValidationState.args = {
  ...defaultProps,
  variant: "bordered",
  validationState: "invalid",
  errorMessage: "Please enter a valid email address",
};
