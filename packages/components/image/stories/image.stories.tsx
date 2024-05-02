import React from "react";
import {Meta} from "@storybook/react";
import {image} from "@nextui-org/theme";

import {Image, ImageProps} from "../src";

export default {
  title: "Components/Image",
  component: Image,
  argTypes: {
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    shadow: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg"],
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
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    showSkeleton: {
      control: {
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
} as Meta<typeof Image>;

const defaultProps = {
  ...image.defaultVariants,
  src: "./images/local-image-1.jpeg",
  alt: "NextUI hero image",
  disableSkeleton: true,
};

const LoadingTemplate = (args: ImageProps) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const time = !args.disableSkeleton ? 2500 : 500;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <Image {...args} isLoading={isLoading} />;
};

export const Default = {
  args: {
    width: 300,
    ...defaultProps,
  },
};

export const Blurred = {
  args: {
    ...defaultProps,
    width: 300,
    isBlurred: true,
    src: "/images/local-image-small.jpg",
    // src:
    //   "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
};

export const Zoomed = {
  args: {
    ...defaultProps,
    width: 300,
    isZoomed: true,
    radius: "lg",
    src: "https://nextui.org/images/card-example-2.jpeg",
  },
};

export const Shadow = {
  args: {
    ...defaultProps,
    width: 300,
    isZoomed: true,
    radius: "lg",
    shadow: "md",
    src: "/images/local-image-small.jpg",
  },
};

export const AnimatedLoad = {
  args: {
    ...defaultProps,
    width: 300,
    radius: "lg",
    src: "https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
  },
};

export const Fallback = {
  render: LoadingTemplate,

  args: {
    ...defaultProps,
    width: 300,
    radius: "lg",
    src: "https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    fallbackSrc: "/images/placeholder_300x450.png",
  },
};

export const Skeleton = {
  render: LoadingTemplate,

  args: {
    ...defaultProps,
    width: 300,
    height: 450,
    radius: "lg",
    src: "https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    disableSkeleton: false,
  },
};
