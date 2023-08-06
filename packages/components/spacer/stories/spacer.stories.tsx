import React from "react";
import {Meta} from "@storybook/react";
import {spacer} from "@nextui-org/theme";

import {Spacer, SpacerProps} from "../src";

export default {
  title: "Components/Spacer",
  component: Spacer,
  argTypes: {
    x: {
      control: {
        type: "number",
      },
    },
    y: {
      control: {
        type: "number",
      },
    },
    isInline: {
      control: {
        type: "boolean",
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
} as Meta<typeof Spacer>;

const defaultProps = {
  ...spacer.defaultVariants,
};

const content = (
  <div className="flex flex-col w-[300px] h-[100px] bg-primary rounded-xl shadow-lg" />
);

const VerticalTemplate = (args: SpacerProps) => (
  <div className="flex flex-col">
    {content}
    <Spacer {...args} />
    {content}
    <Spacer {...args} />
    {content}
  </div>
);

const HorizontalTemplate = (args: SpacerProps) => (
  <div className="flex flex-row">
    {content}
    <Spacer {...args} />
    {content}
    <Spacer {...args} />
    {content}
  </div>
);

export const Vertical = {
  render: VerticalTemplate,

  args: {
    ...defaultProps,
    y: 1,
  },
};

export const Horizontal = {
  render: HorizontalTemplate,

  args: {
    ...defaultProps,
    x: 1,
    isInline: true,
  },
};
