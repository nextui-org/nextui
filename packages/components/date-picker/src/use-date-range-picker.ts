import type {DateValue} from "@internationalized/date";
import type {DateInputProps, TimeInputProps} from "@nextui-org/date-input";
import type {ButtonProps} from "@nextui-org/button";
import type {CalendarProps} from "@nextui-org/calendar";
import type {PopoverProps} from "@nextui-org/popover";
import type {AriaDateRangePickerProps} from "@react-types/datepicker";
import type {DateRangePickerState} from "@react-stately/datepicker";
import type {UseDatePickerBaseProps} from "./use-date-picker-base";

import {useDateRangePickerState} from "@react-stately/datepicker";
import {useDateRangePicker as useAriaDateRangePicker} from "@react-aria/datepicker";
import {DOMAttributes} from "@nextui-org/system";
import {dataAttr} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";

import {useDatePickerBase} from "./use-date-picker-base";
interface Props<T extends DateValue> extends UseDatePickerBaseProps<T> {}

export type UseDateRangePickerProps<T extends DateValue> = Props<T> &
  UseDatePickerBaseProps<T> &
  AriaDateRangePickerProps<T>;

export function useDateRangePicker<T extends DateValue>(originalProps: UseDateRangePickerProps<T>) {
  const {
    domRef,
    endContent,
    selectorIcon,
    createCalendar,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    dateInputProps,
    timeInputProps,
    popoverProps,
    calendarProps,
    variantProps,
    selectorButtonProps,
    selectorIconProps,
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

  // Time field values
  const timeMinValue =
    originalProps.minValue && "hour" in originalProps.minValue ? originalProps.minValue : null;
  const timeMaxValue =
    originalProps.maxValue && "hour" in originalProps.maxValue ? originalProps.maxValue : null;
  const timeGranularity =
    state.granularity === "hour" || state.granularity === "minute" || state.granularity === "second"
      ? state.granularity
      : null;

  const showTimeField = !!timeGranularity;

  const getDateInputProps = () => {
    return {
      ...dateInputProps,
      groupProps,
      labelProps,
      createCalendar,
      errorMessageProps,
      descriptionProps,
      ...mergeProps(variantProps, fieldProps, {
        minValue: originalProps.minValue,
        maxValue: originalProps.maxValue,
        fullWidth: true,
        disableAnimation,
      }),
      "data-open": dataAttr(state.isOpen),
    } as DateInputProps;
  };

  const getTimeInputProps = () => {
    if (!showTimeField) return {};

    return {
      ...timeInputProps,
      value: state.timeValue,
      onChange: state.setTimeValue,
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
    } as CalendarProps;
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
    endContent,
    selectorIcon,
    showTimeField,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    getDateInputProps,
    getPopoverProps,
    getSelectorButtonProps,
    getCalendarProps,
    getTimeInputProps,
    getSelectorIconProps,
  };
}

export type UseDateRangePickerReturn = ReturnType<typeof useDateRangePicker>;
