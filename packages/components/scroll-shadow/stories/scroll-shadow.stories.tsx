import React from "react";
import {Meta} from "@storybook/react";
import {scrollShadow} from "@nextui-org/theme";
import Lorem from "react-lorem-component";

import {ScrollShadow, ScrollShadowProps} from "../src";

export default {
  title: "Components/ScrollShadow",
  component: ScrollShadow,
  argTypes: {
    orientation: {
      control: {type: "select"},
      options: ["horizontal", "vertical"],
    },
    offset: {
      control: {type: "number"},
    },
    children: {
      table: {
        disable: true,
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
} as Meta<typeof ScrollShadow>;

const defaultProps = {
  ...scrollShadow.defaultVariants,
  className: "w-[300px] h-[400px]",
  children: <Lorem count={10} />,
};

const Template = (args: ScrollShadowProps) => <ScrollShadow {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const HideScrollBar = {
  render: Template,
  args: {
    ...defaultProps,
    hideScrollBar: true,
  },
};

export const CustomShadowSize = {
  render: Template,
  args: {
    ...defaultProps,
    size: 100,
  },
};

export const HorizontalOrientation = {
  render: Template,
  args: {
    ...defaultProps,
    orientation: "horizontal",
    className: "max-w-[400px] max-h-[500px]",
    children: (
      <div className="w-[800px]">
        <Lorem count={10} />,
      </div>
    ),
  },
};

export const ShadowOffset = {
  render: Template,
  args: {
    ...defaultProps,
    offset: 100,
    orientation: "horizontal",
    className: "max-w-[400px] max-h-[500px]",
    children: (
      <div className="w-[800px]">
        <Lorem count={10} />,
      </div>
    ),
  },
};
