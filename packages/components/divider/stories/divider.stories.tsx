import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {divider} from "@nextui-org/theme";

import {Divider, DividerProps} from "../src";

export default {
  title: "Components/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: {
        type: "select",
        options: ["horizontal", "vertical"],
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
} as ComponentMeta<typeof Divider>;

const defaultProps = {
  ...divider.defaultVariants,
};

const Template: ComponentStory<typeof Divider> = (args: DividerProps) => (
  <div className="max-w-md">
    <div className="space-y-1">
      <h4 className="text-base font-medium">NextUI Components</h4>
      <p className="text-sm text-default-400">Beautiful, fast and modern React UI library.</p>
    </div>
    <Divider className="my-4" />
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Divider {...args} orientation="vertical" />
      <div>Docs</div>
      <Divider {...args} orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
