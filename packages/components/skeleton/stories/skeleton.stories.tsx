import React from "react";
import {Meta} from "@storybook/react";
import {skeleton} from "@nextui-org/theme";

import {Skeleton} from "../src";

export default {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    children: {
      hidden: true,
    },
    isLoaded: {
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
} as Meta<typeof Skeleton>;

const defaultProps = {
  ...skeleton.defaultVariants,
  isLoaded: false,
  children: <div className="w-[200px] h-[100px]">NextUI</div>,
};

export const Default = {
  args: {
    ...defaultProps,
    className: "rounded-xl",
  },
};
