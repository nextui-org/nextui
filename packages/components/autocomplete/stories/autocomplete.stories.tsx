import React from "react";
import {Meta} from "@storybook/react";
import {autocomplete, input} from "@nextui-org/theme";

import {Autocomplete, AutocompleteItem, AutocompleteProps} from "../src";

export default {
  title: "Components/Autocomplete",
  component: Autocomplete,
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
} as Meta<typeof Autocomplete>;

const defaultProps = {
  ...input.defaultVariants,
  ...autocomplete.defaultVariants,
};

const Template = (args: AutocompleteProps) => (
  <Autocomplete label="Favorite Animal" {...args}>
    <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
    <AutocompleteItem key="cat">Cat</AutocompleteItem>
    <AutocompleteItem key="dog">Dog</AutocompleteItem>
    <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
    <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
    <AutocompleteItem key="snake">Snake</AutocompleteItem>
  </Autocomplete>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
