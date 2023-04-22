import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {spacer} from "@nextui-org/theme";

import {Spacer, SpacerProps} from "../src";

export default {
  title: "Components/Spacer",
  component: Spacer,
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
} as ComponentMeta<typeof Spacer>;

const defaultProps = {
  ...spacer.defaultVariants,
};

const Template: ComponentStory<typeof Spacer> = (args: SpacerProps) => <Spacer {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
