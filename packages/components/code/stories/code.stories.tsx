import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {code} from "@nextui-org/theme";

import {Code, CodeProps} from "../src";

export default {
  title: "Components/Code",
  component: Code,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["default", "primary", "secondary", "success", "warning", "danger"],
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
  },
} as ComponentMeta<typeof Code>;

const defaultProps = {
  children: "npm install @nextui-org/react",
  ...code.defaultVariants,
};

const Template: ComponentStory<typeof Code> = (args: CodeProps) => <Code {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
