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

const ColorTemplate = (args) => {
  return (
    <div className="w-full flex flex-col max-w-[240px]">
      {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
        <div key={color} className="w-full max-w-[240px] my-2">
          <Alert {...args} color={color} />
        </div>
      ))}
    </div>
  );
};
const RadiusTemplate = (args) => {
  return (
    <div className="w-full flex flex-col max-w-[240px]">
      {["none", "sm", "md", "lg", "full"].map((radius) => (
        <div key={radius} className="w-full max-w-[240px] my-2">
          <Alert {...args} radius={radius} />
        </div>
      ))}
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
export const Color = {
  render: ColorTemplate,
  args: {
    ...defaultProps,
  },
};
export const Radius = {
  render: RadiusTemplate,
  args: {
    ...defaultProps,
  },
};
