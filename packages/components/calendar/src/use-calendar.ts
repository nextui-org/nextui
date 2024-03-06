import type {CalendarVariantProps} from "@nextui-org/theme";
import type {DateValue, AriaCalendarProps} from "@react-types/calendar";
import type {CalendarSlots, SlotsToClasses} from "@nextui-org/theme";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";

import {mapPropsVariants} from "@nextui-org/system";
import {useMemo} from "react";
import {calendar} from "@nextui-org/theme";
import {ReactRef, useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {useLocale} from "@react-aria/i18n";
import {useCalendar as useAriaCalendar} from "@react-aria/calendar";
import {useCalendarState} from "@react-stately/calendar";
import {createCalendar} from "@internationalized/date";
import {clsx} from "@nextui-org/shared-utils";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The number of months to display at once. Up to 3 months are supported.
   * @default 1
   */
  visibleMonths?: number;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Calendar classNames={{
   *    base:"base-classes",
   *    // TODO: Add the rest of the classes
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CalendarSlots>;
}

export type UseCalendarProps<T extends DateValue> = Props &
  CalendarVariantProps &
  AriaCalendarProps<T>;

export function useCalendar<T extends DateValue>(originalProps: UseCalendarProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, calendar.variantKeys);

  const {
    ref,
    as,
    children,
    className,
    visibleMonths: visibleMonthsProp = 1,
    classNames,
    ...otherProps
  } = props;

  const visibleMonths = Math.max(visibleMonthsProp, 1);
  const Component = as || "div";

  const visibleDuration = useMemo(() => ({months: visibleMonths}), [visibleMonths]);
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const {locale} = useLocale();

  const state = useCalendarState({
    ...otherProps,
    locale,
    visibleDuration,
    createCalendar,
  });

  const {calendarProps, prevButtonProps, nextButtonProps, errorMessageProps} = useAriaCalendar(
    originalProps,
    state,
  );

  const styles = useMemo(
    () =>
      calendar({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const slots = useMemo(() => calendar({className}), [className]);

  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-slot": "base",
      className: slots.base({class: baseStyles}),
      ...calendarProps,
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      ...props,
    };
  };

  const getPrevButtonProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "prev-button",
      className: slots.prevButton({class: classNames?.prevButton}),
      ...prevButtonProps,
      ...props,
    };
  };

  const getNextButtonProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "next-button",
      className: slots.nextButton({class: classNames?.nextButton}),
      ...nextButtonProps,
      ...props,
    };
  };

  const getErrorMessageProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "error-message",
      className: slots.errorMessage({class: classNames?.errorMessage}),
      ...errorMessageProps,
      ...props,
    };
  };

  return {
    Component,
    children,
    styles,
    domRef,
    state,
    slots,
    classNames,
    getBaseProps,
    getPrevButtonProps,
    getNextButtonProps,
    getErrorMessageProps,
  };
}

export type UseCalendarReturn = ReturnType<typeof useCalendar>;
