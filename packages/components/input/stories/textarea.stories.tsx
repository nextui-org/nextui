import React from "react";
import {Meta} from "@storybook/react";
import {input} from "@nextui-org/theme";
import {SendFilledIcon, PlusFilledIcon} from "@nextui-org/shared-icons";

import {Textarea, TextAreaProps} from "../src";

export default {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    disableAutosize: {
      control: {
        type: "boolean",
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
} as Meta<typeof Textarea>;

const defaultProps = {
  ...input.defaultVariants,
  disableAutosize: false,
  label: "Description",
  placeholder: "Enter your description",
};

const Template = (args: TextAreaProps) => (
  <div className="w-full max-w-[440px]">
    <Textarea {...args} />
  </div>
);

const ControlledTemplate = (args: TextAreaProps) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full  flex-col gap-2 max-w-[440px]">
      <Textarea {...args} value={value} onValueChange={setValue} />
      <p className="text-default-500 text-small">Textarea value: {value}</p>
    </div>
  );
};

const MinRowsTemplate = (args: TextAreaProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Textarea {...args} description="Default minRows is 3" />
    <Textarea {...args} description="minRows is 5" minRows={5} />
    <Textarea {...args} description="minRows is 10" minRows={10} />
  </div>
);

const MaxRowsTemplate = (args: TextAreaProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Textarea {...args} description="Default maxRows is 8" />
    <Textarea {...args} description="maxRows is 5" maxRows={5} />
    <Textarea {...args} description="maxRows is 3" maxRows={3} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const FullRounded = {
  render: Template,

  args: {
    ...defaultProps,
    minRows: 1,
    label: null,
    classNames: {
      input: "py-1",
    },
    "aria-label": "Description",
    placeholder: "Enter your description",
    variant: "bordered",
    radius: "full",
  },
};

export const Required = {
  render: Template,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "faded",
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "bordered",
    isReadOnly: true,
  },
};

export const WithStartContent = {
  render: Template,

  args: {
    ...defaultProps,
    startContent: <PlusFilledIcon className="text-xl" />,
  },
};

export const WithEndContent = {
  render: Template,

  args: {
    ...defaultProps,
    minRows: 1,
    label: null,
    endContent: (
      <div className="p-1">
        <SendFilledIcon className="text-xl" />
      </div>
    ),
    classNames: {
      input: "py-1",
    },
    "aria-label": "Description",
    placeholder: "Enter your description",
    variant: "bordered",
    radius: "full",
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const MinRows = {
  render: MinRowsTemplate,

  args: {
    ...defaultProps,
  },
};

export const MaxRows = {
  render: MaxRowsTemplate,

  args: {
    ...defaultProps,
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec",
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    errorMessage: "Please enter a valid description",
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    errorMessage: "Please enter a valid description",
  },
};
