import type {DatePickerVariantProps, DatePickerSlots, SlotsToClasses} from "@nextui-org/theme";
import type {DateValue} from "@internationalized/date";
import type {AriaDatePickerProps} from "@react-types/datepicker";
import type {DateInputProps} from "@nextui-org/date-input";
import type {DatePickerState} from "@react-stately/datepicker";
import type {ButtonProps} from "@nextui-org/button";
import type {CalendarProps} from "@nextui-org/calendar";
import type {PopoverProps} from "@nextui-org/popover";
import type {ReactNode} from "react";

import {DOMAttributes, PropGetter, useProviderContext} from "@nextui-org/system";
import {CalendarDate} from "@internationalized/date";
import {useDatePickerState} from "@react-stately/datepicker";
import {useDatePicker as useAriaDatePicker} from "@react-aria/datepicker";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {datePicker} from "@nextui-org/theme";
import {chain, mergeProps} from "@react-aria/utils";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {useMemo, useRef} from "react";

type NextUIBaseProps<T extends DateValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaDatePickerProps<T> | "onChange"
>;

interface Props<T extends DateValue> extends NextUIBaseProps<T> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The icon to toggle the date picker popover. Usually a calendar icon.
   */
  selectorIcon?: ReactNode;
  /**
   * Controls the behavior of paging. Pagination either works by advancing the visible page by visibleDuration (default) or one unit of visibleDuration.
   * @default visible
   */
  pageBehavior?: CalendarProps["pageBehavior"];
  /**
   * The number of months to display at once. Up to 3 months are supported.
   * Passing a number greater than 1 will disable the `showMonthAndYearPickers` prop.
   *
   * @default 1
   */
  visibleMonths?: CalendarProps["visibleMonths"];
  /**
   * Whether the calendar should show month and year pickers.
   *
   * @default false
   */
  showMonthAndYearPickers?: CalendarProps["showMonthAndYearPickers"];
  /**
   * Props to be passed to the popover component.
   *
   * @default { placement: "bottom", triggerScaleOnOpen: false, offset: 13 }
   */
  popoverProps?: Partial<PopoverProps>;
  /**
   * Props to be passed to the selector button component.
   * @default { size: "sm", variant: "light", radius: "full", isIconOnly: true }
   */
  selectorButtonProps?: Partial<ButtonProps>;
  /**
   * Props to be passed to the calendar component.
   * @default {}
   */
  calendarProps?: Partial<CalendarProps>;
  /**
   * Whether to disable all animations in the date picker. Including the DateInput, Button, Calendar, and Popover.
   *
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <DatePicker classNames={{
   *    base:"base-classes",
   *  // TODO:
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<DatePickerSlots>;
}

export type UseDatePickerProps<T extends DateValue> = Props<T> &
  DatePickerVariantProps &
  DateInputProps<T>;

export function useDatePicker<T extends DateValue>(originalProps: UseDatePickerProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, datePicker.variantKeys);

  const providerContext = useProviderContext();

  const {
    ref,
    as,
    selectorIcon,
    visibleMonths = 1,
    pageBehavior = "visible",
    showMonthAndYearPickers = false,
    popoverProps = {},
    selectorButtonProps = {},
    calendarProps: userCalendarProps = {},
    minValue = providerContext?.defaultDates?.minDate ?? new CalendarDate(1900, 1, 1),
    maxValue = providerContext?.defaultDates?.maxDate ?? new CalendarDate(2099, 12, 31),
    disableAnimation = false,
    className,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);
  let targetRef = useRef<HTMLDivElement>(null);

  let state: DatePickerState = useDatePickerState({
    ...originalProps,
    minValue,
    maxValue,
    shouldCloseOnSelect: () => !state.hasTime,
  });

  let {groupProps, fieldProps, buttonProps, dialogProps, calendarProps} = useAriaDatePicker(
    originalProps,
    state,
    targetRef,
  );

  const baseStyles = clsx(classNames?.base, className);

  const isDefaultColor = originalProps.color === "default" || !originalProps.color;
  const hasMultipleMonths = visibleMonths > 1;

  const slotsProps: {
    inputProps: DateInputProps<T>;
    popoverProps: UseDatePickerProps<T>["popoverProps"];
    selectorButtonProps: ButtonProps;
    calendarProps: CalendarProps;
  } = {
    inputProps: mergeProps(
      {
        ref: targetRef,
        minValue,
        maxValue,
        fullWidth: true,
        isClearable: false,
        disableAnimation,
      },
      otherProps,
    ),
    popoverProps: mergeProps(
      {
        offset: 13,
        placement: "bottom",
        triggerScaleOnOpen: false,
        disableAnimation,
      },
      popoverProps,
    ),
    selectorButtonProps: mergeProps(
      {
        isIconOnly: true,
        radius: "full",
        size: "sm",
        variant: "light",
        disableAnimation,
      },
      selectorButtonProps,
    ),
    calendarProps: mergeProps(
      {
        visibleMonths,
        pageBehavior,
        showMonthAndYearPickers,
        color:
          (originalProps.variant === "bordered" || originalProps.variant === "underlined") &&
          isDefaultColor
            ? "foreground"
            : isDefaultColor
            ? "primary"
            : originalProps.color,
        disableAnimation,
      },
      userCalendarProps,
    ),
  };

  const slots = useMemo(
    () =>
      datePicker({
        ...variantProps,
        hasMultipleMonths,
        className,
      }),
    [objectToDeps(variantProps), hasMultipleMonths, className],
  );

  const getBaseProps: PropGetter = () => ({
    ...groupProps,
    "data-invalid": dataAttr(originalProps?.isInvalid),
    "data-open": dataAttr(state.isOpen),
    className: slots.base({class: baseStyles}),
  });

  const getDateInputProps = () => {
    return {
      ...mergeProps(fieldProps, slotsProps.inputProps),
      onClick: chain(slotsProps.inputProps.onClick, otherProps.onClick),
    } as unknown as DateInputProps;
  };

  const getPopoverProps = (props: DOMAttributes = {}) => {
    return {
      state,
      ...mergeProps(slotsProps.popoverProps, dialogProps, props),
      triggerRef: targetRef,
      classNames: {
        content: slots.popoverContent({
          class: clsx(
            classNames?.popoverContent,
            slotsProps.popoverProps?.classNames?.["content"],
            props.className,
          ),
        }),
      },
    } as unknown as PopoverProps;
  };

  const getCalendarProps = () => {
    return {
      ...calendarProps,
      ...slotsProps.calendarProps,
      "data-slot": "calendar",
      classNames: {
        base: slots.calendar({class: classNames?.calendar}),
        content: slots.calendarContent({class: classNames?.calendarContent}),
        headerWrapper: slots.calendarHeader({class: classNames?.calendarHeader}),
        gridWrapper: slots.calendarGrid({class: classNames?.calendarGrid}),
      },
    } as unknown as CalendarProps;
  };

  const getSelectorButtonProps = () => {
    return {
      ...buttonProps,
      ...slotsProps.selectorButtonProps,
      "data-slot": "selector-button",
      className: slots.selectorButton({class: classNames?.selectorButton}),
    } as unknown as ButtonProps;
  };

  const getSelectorIconProps = () => {
    return {
      "data-slot": "selector-icon",
      className: slots.selectorIcon({class: classNames?.selectorIcon}),
    };
  };

  return {
    state,
    Component,
    domRef,
    selectorIcon,
    disableAnimation,
    getBaseProps,
    getDateInputProps,
    getPopoverProps,
    getSelectorButtonProps,
    getCalendarProps,
    getSelectorIconProps,
  };
}

export type UseDatePickerReturn = ReturnType<typeof useDatePicker>;
