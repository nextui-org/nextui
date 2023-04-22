import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
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
} as ComponentMeta<typeof Spacer>;

const defaultProps = {
  ...spacer.defaultVariants,
};

const content = (
  <div className="flex flex-col w-[300px] h-[100px] bg-primary rounded-xl shadow-lg" />
);

const VerticalTemplate: ComponentStory<typeof Spacer> = (args: SpacerProps) => (
  <div className="flex flex-col">
    {content}
    <Spacer {...args} />
    {content}
    <Spacer {...args} />
    {content}
  </div>
);

const HorizontalTemplate: ComponentStory<typeof Spacer> = (args: SpacerProps) => (
  <div className="flex flex-row">
    {content}
    <Spacer {...args} />
    {content}
    <Spacer {...args} />
    {content}
  </div>
);

export const Vertical = VerticalTemplate.bind({});
Vertical.args = {
  ...defaultProps,
  y: 1,
};

export const Horizontal = HorizontalTemplate.bind({});
Horizontal.args = {
  ...defaultProps,
  x: 1,
  isInline: true,
};
