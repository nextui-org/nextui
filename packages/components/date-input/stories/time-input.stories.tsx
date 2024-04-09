import React from "react";
import {Meta} from "@storybook/react";
import {dateInput} from "@nextui-org/theme";
import {ClockCircleLinearIcon} from "@nextui-org/shared-icons";
import {parseAbsoluteToLocal, Time, ZonedDateTime} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

import {TimeInput, TimeInputProps, TimeValue} from "../src";

export default {
  title: "Components/TimeInput",
  component: TimeInput,
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
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof TimeInput>;

const defaultProps = {
  label: "Event Time",
  ...dateInput.defaultVariants,
};

const Template = (args: TimeInputProps) => <TimeInput {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

const LabelPlacementTemplate = (args: TimeInputProps) => (
  <div className="w-full max-w-xl flex flex-col items-end gap-4">
    <TimeInput {...args} description="inside" />
    <TimeInput {...args} description="outside" labelPlacement="outside" />
    <TimeInput {...args} description="outside-left" labelPlacement="outside-left" />
  </div>
);

const ControlledTemplate = (args: TimeInputProps) => {
  let [value, setValue] = React.useState<TimeValue>(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));

  let formatter = useDateFormatter({dateStyle: "short", timeStyle: "long"});

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <TimeInput {...args} label="Time (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          {value instanceof ZonedDateTime
            ? (value?.toDate && formatter.format(value.toDate())) ||
              (value && value.toString()) ||
              "--"
            : ""}
        </p>
      </div>

      <TimeInput {...args} defaultValue={new Time(11, 45)} label="Time (uncontrolled)" />
    </div>
  );
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
    isDisabled: true,
    defaultValue: new Time(11, 45),
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultValue: new Time(11, 45),
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Event Time",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Please enter your birth date",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const StartContent = {
  render: Template,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    startContent: (
      <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
    ),
  },
};

export const EndContent = {
  render: Template,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    endContent: (
      <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
    ),
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
  },
};
