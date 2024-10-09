import React from "react";
import {Meta} from "@storybook/react";
import {alert} from "@nextui-org/theme";

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
    isClosable: {
      control: {
        type: "boolean",
      },
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
};

const Template = (args) => <Alert {...args} />;

const ColorTemplate = (args) => {
  return (
    <div className="flex flex-col">
      {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
        <div key={color} className="w-full flex justify-between items-center my-3">
          <span className="mx-4 text-md">{color}</span>
          <Alert {...args} color={color} />
        </div>
      ))}
    </div>
  );
};

const RadiusTemplate = (args) => {
  return (
    <div className="flex flex-col">
      {["none", "sm", "md", "lg", "full"].map((radius) => (
        <div key={radius} className="w-full flex justify-between items-center my-3">
          <span className="mx-4 text-md">{radius}</span>
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
export const isClosable = {
  render: Template,
  args: {
    ...defaultProps,
    isClosable: true,
  },
};
export const CustomWithClassNames = {
  render: Template,
  args: {
    ...defaultProps,
    classNames: {
      base: [
        "bg-slate-100",
        "border",
        "shadow",
        "hover:bg-slate-200",
        "focus-within:!bg-slate-100",
        "dark:bg-slate-900",
        "dark:hover:bg-slate-800",
        "dark:border-slate-800",
        "dark:focus-within:!bg-slate-900",
        "cursor-pointer",
      ],
      title: ["text-base", "text-slate-500", "font-bold"],
      description: ["text-base", "text-slate-500"],
    },
  },
};
