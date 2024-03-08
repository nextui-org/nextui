import type {CalendarVariantProps} from "@nextui-org/theme";
import type {DateValue, AriaCalendarProps} from "@react-types/calendar";
import type {CalendarSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaCalendarGridProps} from "@react-aria/calendar";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {ButtonProps} from "@nextui-org/button";
import type {Calendar} from "@internationalized/date";
import type {SupportedCalendars} from "@nextui-org/system";

import {mapPropsVariants} from "@nextui-org/system";
import {useMemo} from "react";
import {calendar} from "@nextui-org/theme";
import {ReactRef, useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {useLocale} from "@react-aria/i18n";
import {useCalendar as useAriaCalendar} from "@react-aria/calendar";
import {CalendarState, useCalendarState} from "@react-stately/calendar";
import {createCalendar} from "@internationalized/date";
import {clsx} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useProviderContext} from "@nextui-org/system";

import {CalendarBaseProps} from "./calendar-base";

type NextUIBaseProps<T extends DateValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaCalendarProps<T>
>;

interface Props<T extends DateValue> extends NextUIBaseProps<T> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The number of months to display at once. Up to 3 months are supported.
   * @default 1
   */
  visibleMonths?: number;
  /**
   * Props for the navigation button, prev button and next button.
   */
  navButtonProps?: ButtonProps;
  /**
   * Props for the previous button.
   */
  prevButtonProps?: ButtonProps;
  /**
   * Props for the next button.
   */
  nextButtonProps?: ButtonProps;
  /**
   * This function helps to reduce the bundle size by providing a custom calendar system.
   *
   * In the example above, the createCalendar function from the `@internationalized/date` package
   * is passed to the useCalendarState hook. This function receives a calendar identifier string,
   * and provides Calendar instances to React Stately, which are used to implement date manipulation.
   *
   * By default, this includes all calendar systems supported by @internationalized/date. However,
   * if your application supports a more limited set of regions, or you know you will only be picking dates
   * in a certain calendar system, you can reduce your bundle size by providing your own implementation
   * of `createCalendar` that includes a subset of these Calendar implementations.
   *
   * For example, if your application only supports Gregorian dates, you could implement a `createCalendar`
   * function like this:
   *
   * @example
   *
   * import {GregorianCalendar} from '@internationalized/date';
   *
   * function createCalendar(identifier) {
   *  switch (identifier) {
   *    case 'gregory':
   *      return new GregorianCalendar();
   *    default:
   *      throw new Error(`Unsupported calendar ${identifier}`);
   *  }
   * }
   *
   * This way, only GregorianCalendar is imported, and the other calendar implementations can be tree-shaken.
   *
   * You can also use the NextUIProvider to provide the createCalendar function to all nested components.
   *
   * @default all calendars
   */
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
  /**
   * The style of weekday names to display in the calendar grid header,
   * e.g. single letter, abbreviation, or full day name.
   * @default "narrow"
   */
  weekdayStyle?: AriaCalendarGridProps["weekdayStyle"];
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

export type UseCalendarProps<T extends DateValue> = Props<T> &
  CalendarVariantProps &
  AriaCalendarProps<T>;

export function useCalendar<T extends DateValue>(originalProps: UseCalendarProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, calendar.variantKeys);

  const providerContext = useProviderContext();

  const {
    ref,
    as,
    children,
    className,
    visibleMonths: visibleMonthsProp = 1,
    weekdayStyle = "narrow",
    navButtonProps = {},
    createCalendar: createCalendarProp = providerContext?.createCalendar ?? null,
    prevButtonProps: prevButtonPropsProp,
    nextButtonProps: nextButtonPropsProp,
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
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== "function"
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const {title, calendarProps, prevButtonProps, nextButtonProps, errorMessageProps} =
    useAriaCalendar(originalProps, state);

  const slots = useMemo(
    () =>
      calendar({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const baseStyles = clsx(classNames?.base, className);
  const disableAnimation = originalProps.disableAnimation ?? false;

  const commonButtonProps: ButtonProps = {
    size: "sm",
    variant: "light",
    radius: "full",
    isIconOnly: true,
    disableAnimation,
    ...navButtonProps,
  };

  const getPrevButtonProps = (props = {}) => {
    return {
      "data-slot": "prev-button",
      className: slots.prevButton({class: classNames?.prevButton}),
      ...mergeProps(commonButtonProps, prevButtonProps, prevButtonPropsProp, props),
    } as ButtonProps;
  };

  const getNextButtonProps = (props = {}) => {
    return {
      "data-slot": "next-button",
      className: slots.nextButton({class: classNames?.nextButton}),
      ...mergeProps(commonButtonProps, nextButtonProps, nextButtonPropsProp, props),
    } as ButtonProps;
  };

  const getErrorMessageProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "error-message",
      className: slots.errorMessage({class: classNames?.errorMessage}),
      ...errorMessageProps,
      ...props,
    };
  };

  const getCalendarProps = (props = {}): CalendarBaseProps<CalendarState> => {
    return {
      visibleMonths: visibleMonths,
      state: state,
      Component,
      slots,
      weekdayStyle,
      disableAnimation,
      calendarRef: domRef,
      calendarProps: calendarProps,
      prevButtonProps: getPrevButtonProps(),
      nextButtonProps: getNextButtonProps(),
      errorMessageProps: getErrorMessageProps(),
      className: slots.base({class: baseStyles}),
      classNames,
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      ...props,
    };
  };

  return {
    Component,
    children,
    domRef,
    state,
    slots,
    title,
    classNames,
    getCalendarProps,
    getPrevButtonProps,
    getNextButtonProps,
    getErrorMessageProps,
  };
}

export type UseCalendarReturn = ReturnType<typeof useCalendar>;
