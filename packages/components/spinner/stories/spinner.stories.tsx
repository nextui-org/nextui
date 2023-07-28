import React from "react";
import {ComponentMeta} from "@storybook/react";
import {spinner} from "@nextui-org/theme";

import {Spinner, SpinnerProps} from "../src";

export default {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["default", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    labelColor: {
      control: {
        type: "select",
        options: ["default", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="ml-4">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Spinner>;

const defaultProps = {
  ...spinner.defaultVariants,
};

const Template = (args: SpinnerProps) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...defaultProps,
  label: "Loading...",
};
