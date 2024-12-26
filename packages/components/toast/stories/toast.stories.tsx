import React from "react";
import {Meta} from "@storybook/react";
import {cn, toast} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";

import {Toast, ToastProps, ToastProvider, addToast} from "../src";

export default {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["faded", "flat", "bordered", "solid"],
    },
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    hideIcon: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-start items-start w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Toast>;

const defaultProps = {
  ...toast.defaultVariants,
};

const Template = (args: ToastProps) => {
  return (
    <>
      <ToastProvider />
      <div>
        <Button
          onPress={() => {
            addToast({
              title: "Toast Title",
              description: "Toast Displayed Successfully",
              ...args,
            });
          }}
        >
          Show toast
        </Button>
      </div>
    </>
  );
};

const TimeoutTemplate = (args: ToastProps) => {
  return (
    <>
      <ToastProvider />
      <Button
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            timeout: 3000,
            ...args,
          });
        }}
      >
        Toast
      </Button>
    </>
  );
};

const WithEndContentTemplate = (args) => {
  return (
    <>
      <ToastProvider />
      <Button
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            endContent: (
              <Button color="warning" size="sm" variant="flat">
                Upgrade
              </Button>
            ),
            color: "warning",
            variant: "faded",
            ...args,
          });
        }}
      >
        Toast
      </Button>
    </>
  );
};

const CustomToastComponent = (args) => {
  const color = args.color;
  const colorMap = {
    primary: "before:bg-primary border-primary-200 dark:border-primary-100",
    secondary: "before:bg-secondary border-secondary-200 dark:border-secondary-100",
    success: "before:bg-success border-success-200 dark:border-success-100",
    warning: "before:bg-warning border-warning-200 dark:border-warning-100",
    danger: "before:bg-danger border-danger-200 dark:border-danger-100",
  };

  return (
    <>
      <Button
        color={color}
        variant="bordered"
        onPress={() => {
          addToast({
            title: "Sucessful!",
            description: "Document uploaded to cloud successful.",
            classNames: {
              base: cn([
                "bg-default-50 dark:bg-background shadow-sm",
                "border-1",
                "relative before:content-[''] before:absolute before:z-10",
                "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
                "rounded-l-none border-l-0",
                "min-w-[350px]",
                "rounded-md",
                "flex flex-col items-start",
                colorMap[color],
              ]),
              icon: "w-6 h-6 fill-current",
            },
            endContent: (
              <div className="ms-11 my-2 flex gap-x-2">
                <Button color={color} size="sm" variant="bordered">
                  View Document
                </Button>
                <Button className="underline-offset-2" color={color} size="sm" variant="light">
                  Maybe Later
                </Button>
              </div>
            ),
            color: color,
          });
        }}
      >
        Toast
      </Button>
    </>
  );
};

const CustomToastTemplate = () => {
  const colors = ["primary", "secondary", "warning", "danger", "success"];

  return (
    <>
      <ToastProvider />
      <div className="flex gap-2">
        {colors.map((color, idx) => (
          <CustomToastComponent key={idx} color={color} />
        ))}
      </div>
    </>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithIcon = {
  render: Template,
  args: {
    ...defaultProps,
    title: "Custom Icon",
    icon: (
      <svg height={24} viewBox="0 0 24 24" width={24}>
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        >
          <path
            d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
            data-name="Stroke 1"
          />
          <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
        </g>
      </svg>
    ),
  },
};

export const WithTimeout = {
  render: TimeoutTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithEndContent = {
  render: WithEndContentTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomTemplate = {
  render: CustomToastTemplate,
};
