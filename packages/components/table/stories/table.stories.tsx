import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {table} from "@nextui-org/theme";

import {Table, TableProps} from "../src";

export default {
  title: "Components/Table",
  component: Table,
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
} as ComponentMeta<typeof Table>;

const defaultProps = {
  ...table.defaultVariants,
};

const Template: ComponentStory<typeof Table> = (args: TableProps) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
