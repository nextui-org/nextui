import React from "react";
import {Meta} from "@storybook/react";
import {disclosure} from "@nextui-org/theme";

import {Disclosure, DisclosureProps} from "../src";

export default {
  title: "Components/Disclosure",
  component: Disclosure,
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
} as Meta<typeof Disclosure>;

const defaultProps = {
  ...disclosure.defaultVariants,
};

const Template = (args: DisclosureProps) => (
  <>
    <Disclosure {...args} subtitle="subtitle" title="title">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </Disclosure>
    <Disclosure {...args} subtitle="subtitle" title="title">
      This is content
    </Disclosure>
  </>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
