import React from "react";
import {Meta} from "@storybook/react";

import {Form} from "../src";

export default {
  title: "Components/Form",
  component: Form,
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    validationBehavior: {
      control: {
        type: "select",
      },
      options: ["aria", "native"],
    },
  },
} as Meta<typeof Form>;

const defaultProps = {};

const Template = () => <div>test</div>;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const NativeValidation = {
  render: Template,
  args: {
    ...defaultProps,
    validationBehavior: "native",
  },
};

export const AriaValidation = {
  render: Template,
  args: {
    ...defaultProps,
    validationBehavior: "aria",
  },
};
