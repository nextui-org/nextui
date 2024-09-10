import React from "react";
import {Meta} from "@storybook/react";
import {inputOtp} from "@nextui-org/theme";

import {InputOtp, InputOtpProps} from "../src";

export default {
  title: "Components/InputOtp",
  component: InputOtp,
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
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof InputOtp>;

const defaultProps = {
  ...inputOtp.defaultVariants,
};

const Template = (args: InputOtpProps) => <InputOtp {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
