import type {DatePickerVariantProps, DatePickerSlots, SlotsToClasses} from "@nextui-org/theme";
import type {DateValue} from "@internationalized/date";
import type {AriaDatePickerProps} from "@react-types/datepicker";
import type {DateInputProps} from "@nextui-org/date-input";
import type {DOMAttributes, PropGetter} from "@nextui-org/system";
import type {DatePickerState} from "@react-stately/datepicker";
import type {ButtonProps} from "@nextui-org/button";
import type {CalendarProps} from "@nextui-org/calendar";
import type {PopoverProps} from "@nextui-org/popover";
import type {ReactNode} from "react";

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
   * Props to be passed to the popover component.
   *
   * @default { placement: "bottom", triggerScaleOnOpen: false, offset: 5 }
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

  const {
    ref,
    as,
    selectorIcon,
    popoverProps = {},
    selectorButtonProps = {},
    calendarProps: userCalendarProps = {},
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
    shouldCloseOnSelect: () => !state.hasTime,
  });

  let {groupProps, fieldProps, buttonProps, dialogProps, calendarProps} = useAriaDatePicker(
    originalProps,
    state,
    targetRef,
  );

  const slots = useMemo(
    () =>
      datePicker({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const baseStyles = clsx(classNames?.base, className);

  const slotsProps: {
    inputProps: DateInputProps<T>;
    popoverProps: UseDatePickerProps<T>["popoverProps"];
    selectorButtonProps: ButtonProps;
    calendarProps: CalendarProps;
  } = {
    inputProps: mergeProps(
      {
        ref: targetRef,
        onClick: state.toggle,
        fullWidth: true,
        isClearable: false,
        disableAnimation,
      },
      otherProps,
    ),
    popoverProps: mergeProps(
      {
        offset: 5,
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
        disableAnimation,
      },
      userCalendarProps,
    ),
  };

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
      ...props,
      state,
      dialogProps,
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
      className: slots.calendar({class: classNames?.calendar}),
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
