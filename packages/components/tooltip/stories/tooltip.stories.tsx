import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {tooltip} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";

import {Tooltip, TooltipProps} from "../src";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["solid", "bordered", "light", "flat", "faded", "shadow"],
      },
    },
    color: {
      control: {
        type: "select",
        options: ["neutral", "foreground", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    placement: {
      control: {
        type: "select",
        options: ["start", "end", "right", "left", "top", "bottom"],
      },
    },
    delay: {
      control: {
        type: "number",
      },
    },
    offset: {
      control: {
        type: "number",
      },
    },
    defaultOpen: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    children: {
      control: {
        disable: true,
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
} as ComponentMeta<typeof Tooltip>;

const defaultProps = {
  ...tooltip.defaultVariants,
  delay: 0,
  offset: 7,
  defaultOpen: false,
  isDisabled: false,
  disableAnimation: false,
  content: "I am a tooltip",
};

const Template: ComponentStory<typeof Tooltip> = (args: TooltipProps) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
  children: <Button>Hover me</Button>,
};
