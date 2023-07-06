import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {ripple} from "@nextui-org/theme";

import {Ripple, RippleProps} from "../src";

export default {
  title: "Components/Ripple",
  component: Ripple,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "sm", "md", "lg", "full"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Ripple>;

const defaultProps = {
  ...ripple.defaultVariants,
};

const Template: ComponentStory<typeof Ripple> = (args: RippleProps) => <Ripple {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
