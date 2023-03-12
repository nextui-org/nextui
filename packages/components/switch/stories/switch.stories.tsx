import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {toggle} from "@nextui-org/theme";

import {Switch, SwitchProps} from "../src";

export default {
  title: "Switch",
  component: Switch,
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
} as ComponentMeta<typeof Switch>;

const defaultProps = {
  ...toggle.defaultVariants,
};

const Template: ComponentStory<typeof Switch> = (args: SwitchProps) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
