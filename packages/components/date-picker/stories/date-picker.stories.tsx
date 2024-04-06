import React from "react";
import {Meta} from "@storybook/react";
import {datePicker, dateInput} from "@nextui-org/theme";
import {
  DateValue,
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
  parseDate,
  parseZonedDateTime,
  today,
} from "@internationalized/date";
import {I18nProvider, useDateFormatter} from "@react-aria/i18n";

import {DatePicker, DatePickerProps} from "../src";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
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
  decorators: [
    (Story) => (
      <div className="flex items-center justify-start">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof DatePicker>;

const defaultProps = {
  label: "Birth Date",
  className: "max-w-[256px]",
  ...dateInput.defaultVariants,
  ...datePicker.defaultVariants,
};

const Template = (args: DatePickerProps) => <DatePicker {...args} />;

const LabelPlacementTemplate = (args: DatePickerProps) => (
  <div className="w-full max-w-xl flex flex-col items-end gap-4">
    <DatePicker {...args} description="inside" />
    <DatePicker {...args} description="outside" labelPlacement="outside" />
    <DatePicker {...args} description="outside-left" labelPlacement="outside-left" />
  </div>
);

const ControlledTemplate = (args: DatePickerProps) => {
  const [value, setValue] = React.useState<DateValue>(parseDate("2024-04-04"));

  let formatter = useDateFormatter({dateStyle: "full"});

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DatePicker {...args} label="Date (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          Selected date: {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
      <DatePicker {...args} defaultValue={parseDate("2024-04-04")} label="Date (uncontrolled)" />
    </div>
  );
};

const TimeZonesTemplate = (args: DatePickerProps) => (
  <div className="w-full max-w-xl flex flex-col items-end gap-4">
    <DatePicker
      {...args}
      className="max-w-xs"
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
      labelPlacement="outside"
    />
    <DatePicker
      {...args}
      className="max-w-xs"
      defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
      labelPlacement="outside"
    />
  </div>
);

const GranularityTemplate = (args: DatePickerProps) => {
  let [date, setDate] = React.useState<DateValue>(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DatePicker
        {...args}
        className="max-w-md"
        granularity="second"
        label="Date and time"
        value={date}
        onChange={setDate}
      />
      <DatePicker
        {...args}
        className="max-w-md"
        granularity="day"
        label="Date"
        value={date}
        onChange={setDate}
      />
      <DatePicker {...args} className="max-w-md" granularity="second" label="Event date" />
      <DatePicker
        {...args}
        className="max-w-md"
        granularity="second"
        label="Event date"
        placeholderValue={now("America/New_York")}
      />
    </div>
  );
};

const InternationalCalendarsTemplate = (args: DatePickerProps) => {
  let [date, setDate] = React.useState<DateValue>(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DatePicker
          {...args}
          className="max-w-md"
          label="Appointment date"
          value={date}
          onChange={setDate}
        />
      </I18nProvider>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithMonthAndYearPickers = {
  render: Template,
  args: {
    ...defaultProps,
    variant: "bordered",
    showMonthAndYearPickers: true,
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
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
    isDisabled: true,
    defaultValue: parseDate("2024-04-04"),
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultValue: parseDate("2024-04-04"),
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Birth date",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Please enter your birth date",
  },
};

export const SelectorIcon = {
  render: Template,

  args: {
    ...defaultProps,
    selectorIcon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M8 2v4m8-4v4" />
          <rect height="18" rx="2" width="18" x="3" y="4" />
          <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </g>
      </svg>
    ),
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    errorMessage: "Please enter a valid date",
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    isInvalid: true,
    defaultValue: parseDate("2024-04-04"),
    errorMessage: "Please enter a valid date",
  },
};

export const TimeZones = {
  render: TimeZonesTemplate,

  args: {
    ...defaultProps,
    label: "Event date",
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};

export const Granularity = {
  render: GranularityTemplate,

  args: {
    ...defaultProps,
  },
};

export const InternationalCalendars = {
  render: InternationalCalendarsTemplate,

  args: {
    ...defaultProps,
  },
};

export const MinDateValue = {
  render: Template,

  args: {
    ...defaultProps,
    minValue: today(getLocalTimeZone()),
    defaultValue: parseDate("2024-04-03"),
  },
};

export const MaxDateValue = {
  render: Template,

  args: {
    ...defaultProps,
    maxValue: today(getLocalTimeZone()),
    defaultValue: parseDate("2024-04-05"),
  },
};

export const VisibleMonths = {
  render: Template,

  args: {
    ...defaultProps,
    visibleMonths: 2,
  },
};

export const PageBehavior = {
  render: Template,
  args: {
    ...defaultProps,
    visibleMonths: 2,
    pageBehavior: "single",
  },
};
