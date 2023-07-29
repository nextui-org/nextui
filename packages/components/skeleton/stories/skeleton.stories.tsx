import React from "react";
import {ComponentMeta} from "@storybook/react";
import {skeleton} from "@nextui-org/theme";

import {Skeleton, SkeletonProps} from "../src";

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
} as ComponentMeta<typeof Skeleton>;

const defaultProps = {
  ...skeleton.defaultVariants,
  isLoaded: false,
  children: <div className="w-[200px] h-[100px]">NextUI</div>,
};

const Template = (args: SkeletonProps) => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
  className: "rounded-xl",
};
