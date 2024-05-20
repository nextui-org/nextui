import type {DateValue, AriaRangeCalendarProps} from "@react-types/calendar";
import type {HTMLNextUIProps} from "@nextui-org/system";
import type {RangeCalendarState} from "@react-stately/calendar";

import {useMemo, useRef} from "react";
import {filterDOMProps} from "@nextui-org/react-utils";
import {useRangeCalendar as useAriaRangeCalendar} from "@react-aria/calendar";
import {useRangeCalendarState} from "@react-stately/calendar";
import {createCalendar} from "@internationalized/date";
import {clsx} from "@nextui-org/shared-utils";

import {ContextType, useCalendarBase, UseCalendarBaseProps} from "./use-calendar-base";
import {CalendarBaseProps} from "./calendar-base";

type NextUIBaseProps<T extends DateValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaRangeCalendarProps<T>
>;

interface Props<T extends DateValue> extends UseCalendarBaseProps, NextUIBaseProps<T> {}

export type UseRangeCalendarProps<T extends DateValue> = Props<T> & AriaRangeCalendarProps<T>;

export function useRangeCalendar<T extends DateValue>({
  className,
  ...originalProps
}: UseRangeCalendarProps<T>) {
  const {
    Component,
    slots,
    children,
    domRef,
    locale,
    showHelper,
    minValue,
    maxValue,
    weekdayStyle,
    visibleDuration,
    shouldFilterDOMProps,
    isHeaderExpanded,
    visibleMonths,
    createCalendar: createCalendarProp,
    baseProps,
    getPrevButtonProps,
    getNextButtonProps,
    getErrorMessageProps,
    setIsHeaderExpanded,
    topContent,
    bottomContent,
    errorMessage,
    classNames,
    otherProps,
  } = useCalendarBase({...originalProps, isRange: true});

  const headerRef = useRef<HTMLElement>(null);

  const state = useRangeCalendarState({
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
    useAriaRangeCalendar(originalProps, state, domRef);

  const baseStyles = clsx(classNames?.base, className);
  const disableAnimation = originalProps.disableAnimation ?? false;

  const getBaseCalendarProps = (props = {}): CalendarBaseProps => {
    return {
      ...baseProps,
      Component,
      showHelper,
      topContent,
      bottomContent,
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

  const context = useMemo<ContextType<RangeCalendarState>>(
    () => ({
      state,
      slots,
      headerRef,
      weekdayStyle,
      isHeaderExpanded,
      setIsHeaderExpanded,
      visibleMonths,
      classNames,
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

export type UseRangeCalendarReturn = ReturnType<typeof useRangeCalendar>;
