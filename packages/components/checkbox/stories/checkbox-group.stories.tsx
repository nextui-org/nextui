import React from "react";
import {Meta} from "@storybook/react";
import {checkbox} from "@nextui-org/theme";

import {CheckboxGroup, Checkbox, CheckboxGroupProps} from "../src";

export default {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    lineThrough: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Checkbox>;

const defaultProps = {
  ...checkbox.defaultVariants,
};

const Template = (args: CheckboxGroupProps) => (
  <CheckboxGroup {...args}>
    <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
    <Checkbox value="sydney">Sydney</Checkbox>
    <Checkbox value="san-francisco">San Francisco</Checkbox>
    <Checkbox value="london">London</Checkbox>
    <Checkbox value="tokyo">Tokyo</Checkbox>
  </CheckboxGroup>
);

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const WithLabel = {
  render: Template,

  args: {
    label: "Select cities",
  },
};

export const DefaultValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Select cities",
    defaultValue: ["buenos-aires", "london"],
  },
};

export const Horizontal = {
  render: Template,

  args: {
    label: "Select cities",
    orientation: "horizontal",
  },
};

export const IsDisabled = {
  render: Template,

  args: {
    label: "Select cities",
    isDisabled: true,
  },
};

export const LineThrough = {
  render: Template,

  args: {
    label: "Select cities",
    lineThrough: true,
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Select the cities you want to visit",
  },
};

export const Invalid = {
  render: Template,

  args: {
    ...defaultProps,
    validationState: "invalid",
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    validationState: "invalid",
    errorMessage: "The selected cities cannot be visited at the same time",
  },
};

export const DisableAnimation = {
  render: Template,

  args: {
    label: "Select cities",
    disableAnimation: true,
  },
};
