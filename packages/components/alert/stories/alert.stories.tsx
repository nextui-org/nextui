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
      options: ["solid", "flat", "bordered", "faded"],
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
      {["solid", "flat", "bordered", "faded"].map((variant) => (
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

const WithEndContentTemplate = (args) => {
  return (
    <Alert
      {...args}
      color="warning"
      description="Upgrade to a paid plan to continue"
      endContent={
        <Button color="warning" size="sm" variant="flat">
          Upgrade
        </Button>
      }
      title="You have no credits left"
      variant="faded"
    />
  );
};

export const CustomStylesTemplate = (args) => {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <>
      {!isVisible && (
        <Button
          className="bg-background text-default-700 font-medium border-1 shadow-small"
          size="sm"
          variant="bordered"
          onPress={() => setIsVisible(true)}
        >
          Show Alert
        </Button>
      )}
      <Alert
        {...args}
        classNames={{
          base: [
            "bg-default-50 dark:bg-background",
            "relative before:content-[''] before:absolute before:z-10",
            "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1 before:bg-secondary",
            "rounded-l-none border-l-0",
          ],
          mainWrapper: "pt-1",
          iconWrapper: "border-1 border-secondary-200 dark:bg-transparent",
          alertIcon: "text-secondary",
        }}
        isVisible={isVisible}
        title="The documents you requested are ready to be viewed"
        variant="faded"
        onClose={() => setIsVisible(false)}
      >
        <div className="flex items-center gap-1 mt-3">
          <Button
            className="bg-background text-default-700 font-medium border-1 shadow-small"
            size="sm"
            variant="bordered"
          >
            View documents
          </Button>
          <Button
            className="text-default-500 font-medium underline underline-offset-4"
            size="sm"
            variant="light"
          >
            Maybe later
          </Button>
        </div>
      </Alert>
    </>
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
    variant: "faded",
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

export const WithEndContent = {
  render: WithEndContentTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,
  args: {
    ...defaultProps,
  },
};
