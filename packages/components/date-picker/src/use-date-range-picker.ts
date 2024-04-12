import type {DateValue} from "@internationalized/date";
import type {DateInputProps, TimeInputProps} from "@nextui-org/date-input";
import type {ButtonProps} from "@nextui-org/button";
import type {RangeCalendarProps} from "@nextui-org/calendar";
import type {PopoverProps} from "@nextui-org/popover";
import type {AriaDateRangePickerProps} from "@react-types/datepicker";
import type {DateRangePickerState} from "@react-stately/datepicker";
import type {UseDatePickerBaseProps} from "./use-date-picker-base";

import {useMemo} from "react";
import {useDateRangePickerState} from "@react-stately/datepicker";
import {useDateRangePicker as useAriaDateRangePicker} from "@react-aria/datepicker";
import {DOMAttributes} from "@nextui-org/system";
import {dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {dateRangePicker} from "@nextui-org/theme";

import {useDatePickerBase} from "./use-date-picker-base";

interface Props<T extends DateValue>
  extends Omit<UseDatePickerBaseProps<T>, keyof AriaDateRangePickerProps<T>> {}

export type UseDateRangePickerProps<T extends DateValue> = Props<T> & AriaDateRangePickerProps<T>;

export function useDateRangePicker<T extends DateValue>({
  className,
  ...originalProps
}: UseDateRangePickerProps<T>) {
  const {
    domRef,
    endContent,
    selectorIcon,
    slotsProps,
    createCalendar,
    stringFormatter,
    timeMinValue,
    timeMaxValue,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    dateInputProps,
    timeInputProps,
    popoverProps,
    calendarProps,
    variantProps,
    hasMultipleMonths,
    selectorButtonProps,
    selectorIconProps,
    classNames,
  } = useDatePickerBase(originalProps);

  let state: DateRangePickerState = useDateRangePickerState({
    ...originalProps,
    shouldCloseOnSelect: () => !state.hasTime,
  });

  originalProps.minValue;

  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps: ariaCalendarProps,
    descriptionProps,
    errorMessageProps,
  } = useAriaDateRangePicker(originalProps, state, domRef);

  const slots = useMemo(
    () =>
      dateRangePicker({
        ...variantProps,
        hasMultipleMonths,
        className,
      }),
    [objectToDeps(variantProps), hasMultipleMonths, className],
  );

  // Time field values

  const timeGranularity =
    state.granularity === "hour" || state.granularity === "minute" || state.granularity === "second"
      ? state.granularity
      : null;

  const showTimeField = !!timeGranularity;

  const getStartDateInputProps = () => {
    return {
      ...startFieldProps,
      label: "From",
      // groupProps,
      // labelProps,
      // createCalendar,
      // errorMessageProps,
      // descriptionProps,
      ...mergeProps(variantProps, startFieldProps, {
        // minValue: originalProps.minValue,
        // maxValue: originalProps.maxValue,
        fullWidth: true,
        disableAnimation,
      }),
      "data-open": dataAttr(state.isOpen),
    } as DateInputProps;
  };

  const getEndDateInputProps = () => {
    return {
      ...startFieldProps,
      label: "To",
      // groupProps,
      // labelProps,
      // createCalendar,
      // errorMessageProps,
      // descriptionProps,
      ...mergeProps(variantProps, endFieldProps, {
        // minValue: originalProps.minValue,
        // maxValue: originalProps.maxValue,
        fullWidth: true,
        disableAnimation,
      }),
      "data-open": dataAttr(state.isOpen),
    } as DateInputProps;
  };

  const getStartTimeInputProps = () => {
    if (!showTimeField) return {};

    return {
      ...timeInputProps,
      label: stringFormatter.format("startTime"),
      value: state.timeRange?.start || null,
      onChange: (v) => state.setTime("start", v),
      granularity: timeGranularity,
      minValue: timeMinValue,
      maxValue: timeMaxValue,
    } as TimeInputProps;
  };

  const getEndTimeInputProps = () => {
    if (!showTimeField) return {};

    return {
      ...timeInputProps,
      label: stringFormatter.format("startTime"),
      value: state.timeRange?.end || null,
      onChange: (v) => state.setTime("end", v),
      granularity: timeGranularity,
      minValue: timeMinValue,
      maxValue: timeMaxValue,
    } as TimeInputProps;
  };

  const getPopoverProps = (props: DOMAttributes = {}) => {
    return {
      state,
      dialogProps,
      ...popoverProps,
      ...props,
    } as PopoverProps;
  };

  const getCalendarProps = () => {
    return {
      ...ariaCalendarProps,
      ...calendarProps,
    } as RangeCalendarProps;
  };

  const getSelectorButtonProps = () => {
    return {
      ...buttonProps,
      ...selectorButtonProps,
    } as ButtonProps;
  };

  const getSelectorIconProps = () => {
    return selectorIconProps;
  };

  return {
    state,
    groupProps,
    endContent,
    selectorIcon,
    showTimeField,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    getStartDateInputProps,
    getEndDateInputProps,
    getStartTimeInputProps,
    getEndTimeInputProps,
    getPopoverProps,
    getSelectorButtonProps,
    getCalendarProps,
    getSelectorIconProps,
  };
}

export type UseDateRangePickerReturn = ReturnType<typeof useDateRangePicker>;
