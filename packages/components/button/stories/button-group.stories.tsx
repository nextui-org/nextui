import React from "react";
import {Meta} from "@storybook/react";
import {button, buttonGroup} from "@nextui-org/theme";

import {Button, ButtonGroup, ButtonGroupProps} from "../src";

export default {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light", "flat", "shadow", "ghost"],
    },
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
} as Meta<typeof ButtonGroup>;

const defaultProps = {
  ...button.defaultVariants,
  ...buttonGroup.defaultVariants,
};

const Template = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
);

const VariantButtonTemplate = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
    <Button variant="bordered">Four</Button>
    <Button>Five</Button>
    <Button>Six</Button>
  </ButtonGroup>
);

const VariantButtonsTemplate = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button color="success" variant="bordered">
      One
    </Button>
    <Button color="success">Two</Button>
    <Button variant="bordered">Three</Button>
    <Button variant="bordered">Four</Button>
    <Button variant="bordered">Five</Button>
    <Button variant="bordered">Six</Button>
  </ButtonGroup>
);

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const VariantButton = {
  render: VariantButtonTemplate,

  args: {
    ...defaultProps,
    variant: "solid",
  },
};

export const VariantButtons = {
  render: VariantButtonsTemplate,

  args: {
    ...defaultProps,
    variant: "solid",
  },
};
