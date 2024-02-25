import React from "react";
import {Meta} from "@storybook/react";
import {motionBlurLoader} from "@nextui-org/theme";

import {MotionBlurLoader} from "../src";

export default {
  title: "Components/MotionBlurLoader",
  component: MotionBlurLoader,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    labelColor: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div className="ml-4">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof MotionBlurLoader>;

const defaultProps = {
  ...motionBlurLoader.defaultVariants,
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithLabel = {
  args: {
    ...defaultProps,
    label: "Loading...",
  },
};
