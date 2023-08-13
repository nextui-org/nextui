import React from "react";
import {Meta} from "@storybook/react";
import {select, button} from "@nextui-org/theme";
import {PetBoldIcon} from "@nextui-org/shared-icons";

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

const Template = ({color, variant, ...args}: SelectProps) => (
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
);

const RequiredTemplate = ({color, variant, ...args}: SelectProps) => {
  return (
    <form
      className="w-full max-w-xs items-end flex flex-col gap-4"
      onSubmit={(e) => {
        alert("Submitted");
        e.preventDefault();
      }}
    >
      <Select
        isRequired
        aria-label="Favorite Animal"
        color={color}
        label="Favorite Animal"
        name="favorite-animal"
        variant={variant}
        {...args}
      >
        {items}
      </Select>
      <button className={button({className: "max-w-fit"})} type="submit">
        Submit
      </button>
    </form>
  );
};

const MirrorTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Select
      aria-label="Select an animal"
      className="max-w-xs"
      color={color}
      label="Select an animal"
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

const LabelPlacementTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Select
          aria-label="Select an animal"
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          aria-label="Select an animal"
          color={color}
          label="Select an animal"
          labelPlacement="outside"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          aria-label="Select an animal"
          color={color}
          label="Select an animal"
          labelPlacement="outside-left"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
      </div>
    </div>
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Select
          aria-label="Select an animal"
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          aria-label="Select an animal"
          color={color}
          label="Favorite Animal"
          labelPlacement="outside"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          aria-label="Select an animal"
          color={color}
          label="Favorite Animal"
          labelPlacement="outside-left"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
      </div>
    </div>
  </div>
);

const StartContentTemplate = ({color, variant, ...args}: SelectProps) => (
  <Select
    aria-label="Favorite Animal"
    className="max-w-xs"
    color={color}
    defaultSelectedKey="cat"
    label="Favorite Animal"
    startContent={<PetBoldIcon />}
    variant={variant}
    {...args}
  >
    {items}
  </Select>
);

export const Default = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
  },
};

export const Required = {
  render: RequiredTemplate,

  args: {
    ...defaultProps,
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    selectedKey: "cat",
    variant: "faded",
    isDisabled: true,
  },
};

export const WithDescription = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    description: "Select your favorite animal",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};
export const StartContent = {
  render: StartContentTemplate,

  args: {
    ...defaultProps,
  },
};
