import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {input} from "@nextui-org/theme";
import {MailFilledIcon} from "@nextui-org/shared-icons";

import {Input, InputProps} from "../src";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["flat", "faded", "bordered", "underlined"],
      },
    },
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
    labelPosition: {
      control: {
        type: "select",
        options: ["outside", "outside-left", "inside"],
      },
    },
    isDisabled: {
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
} as ComponentMeta<typeof Input>;

const defaultProps = {
  ...input.defaultVariants,
  label: "Email",
};

const Template: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="w-full max-w-[240px]">
    <Input {...args} />
  </div>
);

const LabelPositionTemplate: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="w-full max-w-xl flex flex-row items-end gap-4">
    <Input {...args} />
    <Input {...args} labelPosition="outside" />
    <Input {...args} labelPosition="outside-left" />
  </div>
);

const StartContentTemplate: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="w-full max-w-xl flex flex-row items-end gap-4">
    <Input
      {...args}
      placeholder="you@example.com"
      startContent={<MailFilledIcon className="text-2xl pointer-events-none" />}
    />
    <Input
      {...args}
      label="Price"
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
      }
      type="number"
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...defaultProps,
  placeholder: "Enter your email",
};

export const Required = Template.bind({});
Required.args = {
  ...defaultProps,
  isRequired: true,
};

export const LabelPosition = LabelPositionTemplate.bind({});
LabelPosition.args = {
  ...defaultProps,
};

export const Clearable = Template.bind({});
Clearable.args = {
  ...defaultProps,
  variant: "bordered",
  placeholder: "Enter your email",
  defaultValue: "junior@nextui.org",
  onClear: () => console.log("input cleared"),
};

export const StartContent = StartContentTemplate.bind({});
StartContent.args = {
  ...defaultProps,
};

export const LabelPositionWithPlaceholder = LabelPositionTemplate.bind({});
LabelPositionWithPlaceholder.args = {
  ...defaultProps,
  placeholder: "Enter your email",
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  ...defaultProps,
  errorMessage: "Please enter a valid email address",
};

export const InvalidValidationState = Template.bind({});
InvalidValidationState.args = {
  ...defaultProps,
  variant: "bordered",
  defaultValue: "invalid@email.com",
  validationState: "invalid",
  errorMessage: "Please enter a valid email address",
};
