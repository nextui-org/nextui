import type {DateValue} from "@internationalized/date";
import type {DateInputProps, TimeInputProps} from "@nextui-org/date-input";
import type {DatePickerState} from "@react-stately/datepicker";
import type {ButtonProps} from "@nextui-org/button";
import type {CalendarProps} from "@nextui-org/calendar";
import type {PopoverProps} from "@nextui-org/popover";
import type {UseDatePickerBaseProps} from "./use-date-picker-base";
import type {DOMAttributes} from "@nextui-org/system";

import {useMemo} from "react";
import {datePicker} from "@nextui-org/theme";
import {useDatePickerState} from "@react-stately/datepicker";
import {AriaDatePickerProps, useDatePicker as useAriaDatePicker} from "@react-aria/datepicker";
import {clsx, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";

import {useDatePickerBase} from "./use-date-picker-base";

interface Props<T extends DateValue> extends UseDatePickerBaseProps<T> {}

interface Props<T extends DateValue>
  extends Omit<UseDatePickerBaseProps<T>, keyof AriaDatePickerProps<T>> {}

export type UseDatePickerProps<T extends DateValue> = Props<T> & AriaDatePickerProps<T>;

export function useDatePicker<T extends DateValue>({
  className,
  ...originalProps
}: UseDatePickerProps<T>) {
  const {
    domRef,
    endContent,
    selectorIcon,
    baseStyles,
    createCalendar,
    hasMultipleMonths,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    slotsProps,
    timeMinValue,
    timeMaxValue,
    CalendarBottomContent,
    dateInputProps,
    timeInputProps,
    popoverProps,
    calendarProps,
    variantProps,
    userTimeInputProps,
    selectorButtonProps,
    selectorIconProps,
    classNames,
  } = useDatePickerBase(originalProps);

  let state: DatePickerState = useDatePickerState({
    ...originalProps,
    shouldCloseOnSelect: () => !state.hasTime,
  });

  const slots = useMemo(
    () =>
      datePicker({
        ...variantProps,
        hasMultipleMonths,
        className,
      }),
    [objectToDeps(variantProps), hasMultipleMonths, className],
  );

  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps: ariaCalendarProps,
    descriptionProps,
    errorMessageProps,
  } = useAriaDatePicker(originalProps, state, domRef);

  // Time field values
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
      className: slots.base({class: baseStyles}),
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
      classNames: {
        base: slots.timeInput({
          class: clsx(classNames?.timeInput, userTimeInputProps?.classNames?.base),
        }),
        label: slots.timeInputLabel({
          class: clsx(classNames?.timeInputLabel, userTimeInputProps?.classNames?.label),
        }),
      },
    } as TimeInputProps;
  };

  const getPopoverProps = (props: DOMAttributes = {}) => {
    return {
      state,
      dialogProps,
      ...popoverProps,
      ...props,
      classNames: {
        content: slots.popoverContent({
          class: clsx(
            classNames?.popoverContent,
            slotsProps.popoverProps?.classNames?.["content"],
            props.className,
          ),
        }),
      },
    } as PopoverProps;
  };

  const getCalendarProps = () => {
    return {
      ...ariaCalendarProps,
      ...calendarProps,
      classNames: {
        base: slots.calendar({class: classNames?.calendar}),
        content: slots.calendarContent({class: classNames?.calendarContent}),
      },
    } as CalendarProps;
  };

  const getSelectorButtonProps = () => {
    return {
      ...buttonProps,
      ...selectorButtonProps,
      className: slots.selectorButton({class: classNames?.selectorButton}),
    } as ButtonProps;
  };

  const getSelectorIconProps = () => {
    return {
      ...selectorIconProps,
      className: slots.selectorIcon({class: classNames?.selectorIcon}),
    };
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

export type UseDatePickerReturn = ReturnType<typeof useDatePicker>;
