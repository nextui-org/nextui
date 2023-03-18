import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {accordion} from "@nextui-org/theme";

import {Accordion, AccordionProps, AccordionItem} from "../src";

export default {
  title: "Components/Accordion",
  component: Accordion,
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
} as ComponentMeta<typeof Accordion>;

const defaultProps = {
  ...accordion.defaultVariants,
  selectionMode: "single",
};

const Template: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem key="1" title="Accordion 1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </AccordionItem>
    <AccordionItem key="2" title="Accordion 2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </AccordionItem>
    <AccordionItem key="3" title="Accordion 3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </AccordionItem>
  </Accordion>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
