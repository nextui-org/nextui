import React from "react";
import {ComponentMeta} from "@storybook/react";
import {kbd} from "@nextui-org/theme";

import {Kbd, KbdProps} from "../src";

export default {
  title: "Components/Kbd",
  component: Kbd,
  argTypes: {
    keys: {
      control: {
        type: "select",
        options: [
          "command",
          "shift",
          "ctrl",
          "option",
          "enter",
          "delete",
          "escape",
          "tab",
          "capslock",
          "up",
          "right",
          "down",
          "left",
          "pageup",
          "pagedown",
          "home",
          "end",
          "help",
          "space",
        ],
      },
    },
  },
} as ComponentMeta<typeof Kbd>;

const defaultProps = {
  ...kbd.defaultVariants,
  keys: ["command"],
};

const Template = (args: KbdProps) => <Kbd {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
  children: "K",
};
