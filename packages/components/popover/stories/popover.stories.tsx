import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {popover} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";

import {Popover, PopoverTrigger, PopoverContent, PopoverProps} from "../src";

export default {
  title: "Components/Popover",
  component: Popover,
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
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    placement: {
      control: {
        type: "select",
        options: [
          "top",
          "bottom",
          "right",
          "left",
          "top-start",
          "top-end",
          "bottom-start",
          "bottom-end",
          "left-start",
          "left-end",
          "right-start",
          "right-end",
        ],
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
    showArrow: {
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
} as ComponentMeta<typeof Popover>;

const defaultProps = {
  ...popover.defaultVariants,
};

const Template: ComponentStory<typeof Popover> = (args: PopoverProps) => {
  return (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-sm font-bold">Popover Content</div>
          <div className="text-xs">This is a content of the popover</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
  showArrow: true,
};
