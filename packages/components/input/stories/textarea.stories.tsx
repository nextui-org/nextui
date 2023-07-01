import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {input} from "@nextui-org/theme";

import {Textarea, TextAreaProps} from "../src";

export default {
  title: "Components/Textarea",
  component: Textarea,
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
        options: ["default", "primary", "secondary", "success", "warning", "danger"],
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
        options: ["sm", "md", "lg"],
      },
    },
    labelPlacement: {
      control: {
        type: "select",
        options: ["inside", "outside", "outside-left"],
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
} as ComponentMeta<typeof Textarea>;

const defaultProps = {
  ...input.defaultVariants,
  label: "Description",
  placeholder: "Enter your description",
};

const Template: ComponentStory<typeof Textarea> = (args: TextAreaProps) => (
  <div className="w-full max-w-[440px]">
    <Textarea {...args} />
  </div>
);

const MinRowsTemplate: ComponentStory<typeof Textarea> = (args: TextAreaProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Textarea {...args} description="Default minRows is 3" />
    <Textarea {...args} description="minRows is 5" minRows={5} />
    <Textarea {...args} description="minRows is 10" minRows={10} />
  </div>
);

const MaxRowsTemplate: ComponentStory<typeof Textarea> = (args: TextAreaProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Textarea {...args} description="Default maxRows is 8" />
    <Textarea {...args} description="maxRows is 5" maxRows={5} />
    <Textarea {...args} description="maxRows is 3" maxRows={3} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const Required = Template.bind({});
Required.args = {
  ...defaultProps,
  isRequired: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultProps,
  defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  variant: "faded",
  isDisabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...defaultProps,
  defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  variant: "bordered",
  isReadOnly: true,
};

export const MinRows = MinRowsTemplate.bind({});
MinRows.args = {
  ...defaultProps,
};

export const MaxRows = MaxRowsTemplate.bind({});
MaxRows.args = {
  ...defaultProps,
  defaultValue:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec",
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  ...defaultProps,
  errorMessage: "Please enter a valid description",
};

export const InvalidValidationState = Template.bind({});
InvalidValidationState.args = {
  ...defaultProps,
  validationState: "invalid",
  defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  errorMessage: "Please enter a valid description",
};
