import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {spinner} from "@nextui-org/theme";

import {Spinner, SpinnerProps} from "../src";

export default {
  title: "Feedback/Spinner",
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    labelColor: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
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

const Template: ComponentStory<typeof Spinner> = (args: SpinnerProps) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...defaultProps,
  label: "Loading...",
};
