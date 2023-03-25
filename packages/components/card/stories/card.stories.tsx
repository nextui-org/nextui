import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {card} from "@nextui-org/theme";

import {Card, CardBody, CardProps} from "../src";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    shadow: {
      control: {
        type: "select",
        options: ["none", "sm", "md", "lg", "xl", "2xl", "inner"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      },
    },
    isBordered: {
      control: {
        type: "boolean",
      },
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    isFooterBlurred: {
      control: {
        type: "boolean",
      },
    },
    isHoverable: {
      control: {
        type: "boolean",
      },
    },
    isPressable: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableRipple: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="max-w-md w-full">
          <Story />
        </div>
      </div>
    ),
  ],
} as ComponentMeta<typeof Card>;

const defaultProps = {
  ...card.defaultVariants,
  disableRipple: false,
};

const Template: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card {...args}>
    <CardBody>A basic card</CardBody>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
