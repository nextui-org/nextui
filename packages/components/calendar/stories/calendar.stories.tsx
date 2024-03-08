import React from "react";
import {Meta} from "@storybook/react";
import {calendar} from "@nextui-org/theme";
import {today, parseDate, getLocalTimeZone, isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";
import {Button} from "@nextui-org/button";

import {Calendar, CalendarProps, DateValue} from "../src";

export default {
  title: "Components/Calendar",
  component: Calendar,
  argTypes: {
    visibleMonths: {
      control: {type: "number", min: 1, max: 3},
    },
    color: {
      control: {
        type: "select",
      },
      options: ["foreground", "primary", "secondary", "success", "warning", "danger"],
    },
    weekdayStyle: {
      control: {
        type: "select",
      },
      options: ["narrow", "short", "long"],
    },
  },
} as Meta<typeof Calendar>;

const defaultProps = {
  ...calendar.defaultVariants,
  visibleMonths: 1,
};

const Template = (args: CalendarProps) => <Calendar {...args} />;

const ControlledTemplate = (args: CalendarProps) => {
  let [value, setValue] = React.useState<DateValue>(parseDate("2024-03-07"));

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (uncontrolled)</p>
        <Calendar
          aria-label="Date (uncontrolled)"
          defaultValue={parseDate("2024-03-07")}
          {...args}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (controlled)</p>
        <Calendar
          aria-label="Date (controlled)"
          value={value}
          onChange={setValue}
          {...args}
          color="secondary"
        />
      </div>
    </div>
  );
};

const UnavailableDatesTemplate = (args: CalendarProps) => {
  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({days: 5})],
    [now.add({days: 14}), now.add({days: 16})],
    [now.add({days: 23}), now.add({days: 24})],
  ];

  let {locale} = useLocale();

  let isDateUnavailable = (date) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    );

  return (
    <Calendar
      aria-label="Appointment date"
      isDateUnavailable={isDateUnavailable}
      minValue={today(getLocalTimeZone())}
      {...args}
    />
  );
};

const ControlledFocusedValueTemplate = (args: CalendarProps) => {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = React.useState(defaultDate);

  return (
    <div className="flex flex-col gap-4">
      <Calendar
        focusedValue={focusedDate}
        value={defaultDate}
        onFocusChange={setFocusedDate}
        {...args}
      />
      <Button
        className="max-w-fit"
        color="primary"
        variant="flat"
        onPress={() => setFocusedDate(defaultDate)}
      >
        Reset focused date
      </Button>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Disabled = {
  render: Template,
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    value: today(getLocalTimeZone()),
    isReadOnly: true,
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const MinDateValue = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: today(getLocalTimeZone()),
    minValue: today(getLocalTimeZone()),
  },
};

export const MaxDateValue = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()),
  },
};

export const UnavailableDates = {
  render: UnavailableDatesTemplate,
  args: {
    ...defaultProps,
    defaultValue: today(getLocalTimeZone()),
    unavailableDates: [today(getLocalTimeZone())],
  },
};

export const ControlledFocusedValue = {
  render: ControlledFocusedValueTemplate,
  args: {
    ...defaultProps,
  },
};
