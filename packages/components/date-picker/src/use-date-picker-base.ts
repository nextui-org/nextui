import type {DateValue} from "@internationalized/date";
import type {AriaDatePickerBaseProps} from "@react-types/datepicker";
import type {DateInputProps, TimeInputProps} from "@nextui-org/date-input";
import type {ButtonProps} from "@nextui-org/button";
import type {CalendarProps} from "@nextui-org/calendar";
import type {PopoverProps} from "@nextui-org/popover";
import type {ReactNode} from "react";
import type {ValueBase} from "@react-types/shared";

import {dataAttr} from "@nextui-org/shared-utils";
import {dateInput, DatePickerVariantProps} from "@nextui-org/theme";
import {useState} from "react";
import {HTMLNextUIProps, mapPropsVariants, useProviderContext} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {useDOMRef} from "@nextui-org/react-utils";
import {useLocalizedStringFormatter} from "@react-aria/i18n";

import intlMessages from "../intl/messages";

type NextUIBaseProps<T extends DateValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaDatePickerBaseProps<T> | "onChange"
>;

interface Props<T extends DateValue> extends NextUIBaseProps<T> {
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
   * The width to be applied to the calendar component.
   *
   * @default 256
   */
  calendarWidth?: number;
  /**
   * Top content to be rendered in the calendar component.
   */
  CalendarTopContent?: CalendarProps["topContent"];
  /**
   * Bottom content to be rendered in the calendar component.
   */
  CalendarBottomContent?: CalendarProps["bottomContent"];
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
  calendarProps?: Partial<Omit<CalendarProps, "topContent" | "bottomContent">>;
  /**
   * Props to be passed to the time input component.
   *
   * @default {}
   */
  timeInputProps?: TimeInputProps;
  /**
   * Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.
   */
  isDateUnavailable?: CalendarProps["isDateUnavailable"];
  /**
   * Whether to disable all animations in the date picker. Including the DateInput, Button, Calendar, and Popover.
   *
   * @default false
   */
  disableAnimation?: boolean;
}

type Variants =
  | "color"
  | "size"
  | "isDisabled"
  | "disableAnimation"
  | "variant"
  | "radius"
  | "labelPlacement"
  | "fullWidth";

export type UseDatePickerBaseProps<T extends DateValue> = Props<T> &
  DatePickerVariantProps &
  Pick<
    DateInputProps<T>,
    Variants | "ref" | "createCalendar" | "startContent" | "endContent" | "inputRef"
  > &
  Omit<AriaDatePickerBaseProps<T>, keyof ValueBase<T> | "validate">;

export function useDatePickerBase<T extends DateValue>(originalProps: UseDatePickerBaseProps<T>) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);

  const [isCalendarHeaderExpanded, setIsCalendarHeaderExpanded] = useState(false);

  const {
    as,
    ref,
    label,
    endContent,
    selectorIcon,
    inputRef,
    isInvalid,
    errorMessage,
    description,
    startContent,
    validationState,
    validationBehavior,
    visibleMonths = 1,
    pageBehavior = "visible",
    calendarWidth = 256,
    isDateUnavailable,
    shouldForceLeadingZeros,
    showMonthAndYearPickers = false,
    selectorButtonProps: userSelectorButtonProps = {},
    popoverProps: userPopoverProps = {},
    timeInputProps: userTimeInputProps = {},
    calendarProps: userCalendarProps = {},
    CalendarTopContent,
    CalendarBottomContent,
    createCalendar,
  } = props;

  const domRef = useDOMRef(ref);
  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  let stringFormatter = useLocalizedStringFormatter(intlMessages) as any;

  const isDefaultColor = originalProps.color === "default" || !originalProps.color;
  const hasMultipleMonths = visibleMonths > 1;

  // Time field values
  const placeholder = originalProps?.placeholderValue;
  const timePlaceholder = placeholder && "hour" in placeholder ? placeholder : null;
  const timeMinValue =
    originalProps.minValue && "hour" in originalProps.minValue ? originalProps.minValue : null;
  const timeMaxValue =
    originalProps.maxValue && "hour" in originalProps.maxValue ? originalProps.maxValue : null;

  const slotsProps: {
    popoverProps: UseDatePickerBaseProps<T>["popoverProps"];
    selectorButtonProps: ButtonProps;
    calendarProps: CalendarProps;
  } = {
    popoverProps: mergeProps(
      {
        offset: 13,
        placement: "bottom",
        triggerScaleOnOpen: false,
        disableAnimation,
      },
      userPopoverProps,
    ),
    selectorButtonProps: mergeProps(
      {
        isIconOnly: true,
        radius: "full",
        size: "sm",
        variant: "light",
        disableAnimation,
      },
      userSelectorButtonProps,
    ),
    calendarProps: mergeProps(
      {
        showHelper: false,
        visibleMonths,
        pageBehavior,
        isDateUnavailable,
        showMonthAndYearPickers,
        onHeaderExpandedChange: setIsCalendarHeaderExpanded,
        color: isDefaultColor ? "primary" : originalProps.color,
        disableAnimation,
      },
      userCalendarProps,
    ),
  };

  const dateInputProps = {
    as,
    label,
    ref: domRef,
    inputRef,
    description,
    startContent,
    validationState,
    shouldForceLeadingZeros,
    isInvalid,
    errorMessage,
    validationBehavior,
    "data-invalid": dataAttr(originalProps?.isInvalid),
  } as DateInputProps;

  const timeInputProps = {
    ...userTimeInputProps,
    size: "sm",
    labelPlacement: "outside-left",
    label: userTimeInputProps?.label || stringFormatter.format("time"),
    placeholderValue: timePlaceholder,
    hourCycle: props.hourCycle,
    hideTimeZone: props.hideTimeZone,
    validationBehavior,
  } as TimeInputProps;

  const popoverProps: PopoverProps = {
    ...slotsProps.popoverProps,
    children: slotsProps.popoverProps?.children ?? [],
    triggerRef: domRef,
  };

  const calendarProps = {
    ...slotsProps.calendarProps,
    calendarWidth,
    "data-slot": "calendar",
  } as CalendarProps;

  const selectorButtonProps = {
    ...slotsProps.selectorButtonProps,
    "data-slot": "selector-button",
  } as ButtonProps;

  const selectorIconProps = {
    "data-slot": "selector-icon",
  };

  return {
    domRef,
    endContent,
    selectorIcon,
    createCalendar,
    stringFormatter,
    hasMultipleMonths,
    slotsProps,
    timeMinValue,
    timeMaxValue,
    visibleMonths,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    variantProps,
    dateInputProps,
    timeInputProps,
    popoverProps,
    calendarProps,
    userTimeInputProps,
    selectorButtonProps,
    selectorIconProps,
  };
}

export type UseDatePickerBaseReturn = ReturnType<typeof useDatePickerBase>;
