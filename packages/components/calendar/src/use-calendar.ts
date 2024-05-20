import type {DateValue, AriaCalendarProps} from "@react-types/calendar";
import type {ButtonProps} from "@nextui-org/button";
import type {CalendarState} from "@react-stately/calendar";

import {useMemo, useRef} from "react";
import {filterDOMProps} from "@nextui-org/react-utils";
import {useCalendar as useAriaCalendar} from "@react-aria/calendar";
import {useCalendarState} from "@react-stately/calendar";
import {createCalendar} from "@internationalized/date";
import {clsx} from "@nextui-org/shared-utils";
import {chain} from "@react-aria/utils";

import {ContextType, useCalendarBase, UseCalendarBaseProps} from "./use-calendar-base";
import {CalendarBaseProps} from "./calendar-base";

interface Props extends UseCalendarBaseProps {
  /**
   * Props for the button picker, which is used to select the month, year and expand the header.
   */
  buttonPickerProps?: ButtonProps;
}

export type UseCalendarProps<T extends DateValue> = Props & AriaCalendarProps<T>;

export function useCalendar<T extends DateValue>({
  buttonPickerProps: buttonPickerPropsProp,
  className,
  ...originalProps
}: UseCalendarProps<T>) {
  const {
    Component,
    slots,
    children,
    domRef,
    locale,
    minValue,
    maxValue,
    showHelper,
    weekdayStyle,
    visibleDuration,
    baseProps,
    shouldFilterDOMProps,
    isHeaderExpanded,
    visibleMonths,
    createCalendar: createCalendarProp,
    showMonthAndYearPickers,
    getPrevButtonProps,
    getNextButtonProps,
    getErrorMessageProps,
    setIsHeaderExpanded,
    topContent,
    bottomContent,
    errorMessage,
    classNames,
    otherProps,
  } = useCalendarBase(originalProps);

  const headerRef = useRef<HTMLElement>(null);

  const state = useCalendarState({
    ...originalProps,
    locale,
    minValue,
    maxValue,
    visibleDuration,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== "function"
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const {title, calendarProps, prevButtonProps, nextButtonProps, errorMessageProps} =
    useAriaCalendar(originalProps, state);

  const baseStyles = clsx(classNames?.base, className);
  const disableAnimation = originalProps.disableAnimation ?? false;

  const buttonPickerProps: ButtonProps = {
    ...buttonPickerPropsProp,
    onPress: chain(buttonPickerPropsProp?.onPress, () => setIsHeaderExpanded(!isHeaderExpanded)),
  };

  const getBaseCalendarProps = (props = {}): CalendarBaseProps => {
    return {
      ...baseProps,
      Component,
      showHelper,
      topContent,
      bottomContent,
      buttonPickerProps,
      calendarRef: domRef,
      calendarProps: calendarProps,
      prevButtonProps: getPrevButtonProps(prevButtonProps),
      nextButtonProps: getNextButtonProps(nextButtonProps),
      errorMessageProps: getErrorMessageProps(errorMessageProps),
      className: slots.base({class: baseStyles}),
      errorMessage,
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      ...props,
    };
  };

  const context = useMemo<ContextType<CalendarState>>(
    () => ({
      state,
      slots,
      headerRef,
      weekdayStyle,
      isHeaderExpanded,
      setIsHeaderExpanded,
      visibleMonths,
      classNames,
      showMonthAndYearPickers,
      disableAnimation,
    }),
    [
      state,
      slots,
      classNames,
      weekdayStyle,
      isHeaderExpanded,
      setIsHeaderExpanded,
      visibleMonths,
      disableAnimation,
      showMonthAndYearPickers,
    ],
  );

  return {
    Component,
    children,
    domRef,
    context,
    state,
    slots,
    title,
    classNames,
    getBaseCalendarProps,
  };
}

export type UseCalendarReturn = ReturnType<typeof useCalendar>;
