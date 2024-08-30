import {Meta} from "@storybook/react";
import {alert} from "@nextui-org/theme";
import React from "react";
import {InfoIcon} from "@nextui-org/shared-icons";

import {Alert} from "../src";

export default {
  title: "Components/Alert",
  component: Alert,
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
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Alert>;

const defaultProps = {
  ...alert.defaultVariants,
  title: "Email Sent!!",
  description: "You will get a reply soon",
  startContent: <InfoIcon />,
};

const Template = (args) => (
  <div className="w-full max-w-[240px]">
    <Alert {...args} />
  </div>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
