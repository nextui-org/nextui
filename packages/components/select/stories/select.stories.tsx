import React from "react";
import {Meta} from "@storybook/react";
import {select} from "@nextui-org/theme";

import {Select, SelectItem, SelectProps} from "../src";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
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

const items = [
  {label: "Cat", value: "cat"},
  {label: "Dog", value: "dog"},
  {label: "Elephant", value: "elephant"},
  {label: "Lion", value: "lion"},
  {label: "Tiger", value: "tiger"},
  {label: "Giraffe", value: "giraffe"},
  {label: "Dolphin", value: "dolphin"},
  {label: "Penguin", value: "penguin"},
  {label: "Zebra", value: "zebra"},
  {label: "Shark", value: "shark"},
  {label: "Whale", value: "whale"},
  {label: "Seal", value: "seal"},
  {label: "Otter", value: "otter"},
  {label: "Crocodile", value: "crocodile"},
].map((item) => (
  <SelectItem key={item.value} value={item.value}>
    {item.label}
  </SelectItem>
));

// const Template = ({color, variant, ...args}: SelectProps) => (
//   <Select
//     aria-label="Favorite Animal"
//     className="max-w-xs"
//     color={color}
//     label="Favorite Animal"
//     variant={variant}
//     {...args}
//   >
//     {items}
//   </Select>
// );

const MirrorTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Select
      aria-label="Favorite Animal"
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      variant={variant}
      {...args}
    >
      {items}
    </Select>
    <Select
      aria-label="Favorite Animal"
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      placeholder="Select an animal"
      variant={variant}
      {...args}
    >
      {items}
    </Select>
  </div>
);

export const Default = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
  },
};
