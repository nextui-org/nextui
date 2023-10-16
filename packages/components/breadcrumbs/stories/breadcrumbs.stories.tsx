import React from "react";
import {Meta} from "@storybook/react";
import {breadcrumbs} from "@nextui-org/theme";

import {Breadcrumbs, BreadcrumbsProps} from "../src";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
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
} as Meta<typeof Breadcrumbs>;

const defaultProps = {
  ...breadcrumbs.defaultVariants,
};

const Template = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
