import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {tabs} from "@nextui-org/theme";
import Lorem from "react-lorem-component";

import {Tabs, TabItem, TabsProps} from "../src";

export default {
  title: "Components/Tabs",
  component: Tabs,
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
} as ComponentMeta<typeof Tabs>;

const defaultProps = {
  ...tabs.defaultVariants,
};

const Template: ComponentStory<typeof Tabs> = (args: TabsProps) => (
  <Tabs aria-label="Tabs example" {...args}>
    <TabItem key="world" title="World">
      <Lorem count={1} sentenceUpperBound={20} />
    </TabItem>
    <TabItem key="ny" title="N.Y">
      <Lorem count={1} sentenceUpperBound={30} />
    </TabItem>
    <TabItem key="business" title="Business">
      <Lorem count={1} sentenceUpperBound={10} />
    </TabItem>
    <TabItem key="arts" title="Arts">
      <Lorem count={1} sentenceUpperBound={50} />
    </TabItem>
    <TabItem key="science" title="Science">
      <Lorem count={1} sentenceUpperBound={24} />
    </TabItem>
  </Tabs>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
