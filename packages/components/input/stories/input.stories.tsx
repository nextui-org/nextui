import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {input} from "@nextui-org/theme";

import {Input, InputProps} from "../src";

export default {
  title: "Components/Input",
  component: Input,
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
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Input>;

const defaultProps = {
  ...input.defaultVariants,
};

const Template: ComponentStory<typeof Input> = (args: InputProps) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
