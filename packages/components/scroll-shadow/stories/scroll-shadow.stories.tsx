import React from "react";
import {Meta} from "@storybook/react";
import {scrollShadow} from "@nextui-org/theme";
import Lorem from "react-lorem-component";

import {ScrollShadow, ScrollShadowProps} from "../src";

export default {
  title: "Components/ScrollShadow",
  component: ScrollShadow,
  argTypes: {
    color: {
      control: {type: "select"},
      options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
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
} as Meta<typeof ScrollShadow>;

const defaultProps = {
  ...scrollShadow.defaultVariants,
  className: "w-[300px] h-[400px]",
  children: <Lorem count={10} />,
};

const Template = (args: ScrollShadowProps) => <ScrollShadow {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
