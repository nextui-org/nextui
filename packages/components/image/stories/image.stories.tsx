import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {image} from "@nextui-org/theme";

import {Image, ImageProps} from "../src";

export default {
  title: "Components/Image",
  component: Image,
  argTypes: {
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      },
    },
    isBlurred: {
      control: {
        type: "boolean",
      },
    },
    isZoomed: {
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
} as ComponentMeta<typeof Image>;

const defaultProps = {
  ...image.defaultVariants,
  src: "https://nextui.org/images/hero-card.png",
  alt: "NextUI hero image",
};

const Template: ComponentStory<typeof Image> = (args: ImageProps) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const Blurred = Template.bind({});
Blurred.args = {
  ...defaultProps,
  isBlurred: true,
};

export const Zoomed = Template.bind({});
Zoomed.args = {
  ...defaultProps,
  width: 300,
  isZoomed: true,
  radius: "xl",
  src: "https://nextui.org/images/card-example-2.jpeg",
};

export const Fallback = Template.bind({});
Fallback.args = {
  ...defaultProps,
  width: 300,
  radius: "xl",
  ignoreFallback: false,
  disableLoadingSkeleton: true,
  src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
  fallbackSrc: "https://via.placeholder.com/300x450",
};

export const FallbackLoading = Template.bind({});
FallbackLoading.args = {
  ...defaultProps,
  width: 300,
  radius: "xl",
  ignoreFallback: false,
  src: "https://images.unsplash.com/broken",
  fallbackSrc: "https://via.placeholder.com/300x450",
};
