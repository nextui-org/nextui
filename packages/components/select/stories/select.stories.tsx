import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {select} from "@nextui-org/theme";

import {Select} from "../src";

export default {
  title: "Components/Select",
  component: Select,
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
} as ComponentMeta<typeof Select>;

const defaultProps = {
  ...select.defaultVariants,
};

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
