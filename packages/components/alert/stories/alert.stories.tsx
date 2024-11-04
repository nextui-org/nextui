import React from "react";
import {Meta} from "@storybook/react";
import {alert} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";

import {Alert} from "../src";

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "flat", "bordered"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    isClosable: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-full max-w-[542px]">
          <Story />
        </div>
      </div>
    ),
  ],
} as Meta<typeof Alert>;

const defaultProps = {
  ...alert.defaultVariants,
  title: "This is an alert with a title",
};

const Template = (args) => <Alert {...args} />;

const ColorTemplate = (args) => {
  return (
    <div className="flex flex-col w-full">
      {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
        <div key={color} className="w-full flex items-center my-3">
          <Alert {...args} color={color} title={`This is a ${color} alert`} />
        </div>
      ))}
    </div>
  );
};

const RadiusTemplate = (args) => {
  return (
    <div className="flex flex-col w-full">
      {["none", "sm", "md", "lg", "full"].map((radius) => (
        <div key={radius} className="w-full flex items-center my-3">
          <Alert {...args} radius={radius} title={`This is a ${radius} radius alert`} />
        </div>
      ))}
    </div>
  );
};

const VariantTemplate = (args) => {
  return (
    <div className="flex flex-col w-full">
      {["solid", "flat", "bordered"].map((variant) => (
        <div key={variant} className="w-full flex items-center my-3">
          <Alert {...args} isClosable title={`This is a ${variant} alert`} variant={variant} />
        </div>
      ))}
    </div>
  );
};

const CloseableTemplate = (args) => {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isVisible ? (
        <Alert {...args} isClosable isVisible={isVisible} onClose={() => setIsVisible(false)} />
      ) : (
        <Button className="max-w-[200px]" variant="bordered" onPress={() => setIsVisible(true)}>
          Re-open Alert
        </Button>
      )}
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithDescription = {
  render: Template,
  args: {
    ...defaultProps,
    description: "This is an alert with a description",
  },
};

export const Color = {
  render: ColorTemplate,
  args: {
    ...defaultProps,
  },
};

export const Variant = {
  render: VariantTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithIcon = {
  render: Template,
  args: {
    ...defaultProps,
    title: "This is an alert with a custom icon",
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

export const Radius = {
  render: RadiusTemplate,
  args: {
    ...defaultProps,
  },
};

export const Closable = {
  render: CloseableTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomWithClassNames = {
  render: Template,
  args: {
    ...defaultProps,
    classNames: {
      base: [
        "bg-background",
        "border",
        "border-foreground-400",
        "shadow",
        "hover:bg-slate-200",
        "cursor-pointer",
      ],
      title: ["text-base", "text-foreground", "font-semibold"],
      description: ["text-base", "text-foreground-600"],
    },
  },
};
