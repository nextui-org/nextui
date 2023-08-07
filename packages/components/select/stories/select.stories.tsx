import React from "react";
import {Meta} from "@storybook/react";
import {select} from "@nextui-org/theme";

import {Select, SelectItem, SelectProps} from "../src";

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
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Select>;

const defaultProps = {
  ...select.defaultVariants,
};

const Template = ({color, variant, ...args}: SelectProps) => (
  <Select
    aria-label="Favorite Animal"
    color={color}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    <SelectItem key="cat">Cat</SelectItem>
    <SelectItem key="dog">Dog</SelectItem>
    <SelectItem key="elephant">Elephant</SelectItem>
    <SelectItem key="lion">Lion</SelectItem>
    <SelectItem key="tiger">Tiger</SelectItem>
    <SelectItem key="giraffe">Giraffe</SelectItem>
    <SelectItem key="dolphin">Dolphin</SelectItem>
    <SelectItem key="penguin">Penguin</SelectItem>
    <SelectItem key="zebra">Zebra</SelectItem>
    <SelectItem key="shark">Shark</SelectItem>
    <SelectItem key="whale">Whale</SelectItem>
    <SelectItem key="seal">Seal</SelectItem>
    <SelectItem key="otter">Otter</SelectItem>
    <SelectItem key="crocodile">Crocodile</SelectItem>
  </Select>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
