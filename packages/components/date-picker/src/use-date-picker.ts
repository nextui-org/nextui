import type {DatePickerVariantProps} from "@nextui-org/theme";
import type {DateValue} from "@internationalized/date";
import type {AriaDatePickerProps} from "@react-types/datepicker";
import type {DatePickerState} from "@react-stately/datepicker";

import {useDatePickerState} from "@react-stately/datepicker";
import {useDatePicker as useAriaDatePicker} from "@react-aria/datepicker";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {datePicker} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {objectToDeps} from "@nextui-org/shared-utils";
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
   * Whether to disable all animations in the date picker. Including the DateInput, Button, Calendar, and Popover.
   *
   * @default false
   */
  disableAnimation?: boolean;
}

export type UseDatePickerProps<T extends DateValue> = Props<T> &
  DatePickerVariantProps &
  AriaDatePickerProps<T>;

export function useDatePicker<T extends DateValue>(originalProps: UseDatePickerProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, datePicker.variantKeys);

  const {ref, as, disableAnimation = false, className} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);
  let targetRef = useRef<HTMLDivElement>(null);

  let state: DatePickerState = useDatePickerState({
    ...originalProps,
    shouldCloseOnSelect: () => !state.hasTime,
  });

  let {
    groupProps,
    labelProps,
    fieldProps,
    descriptionProps,
    errorMessageProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useAriaDatePicker(originalProps, state, targetRef);

  const slots = useMemo(
    () =>
      datePicker({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  return {
    state,
    Component,
    domRef,
    targetRef,
    groupProps,
    labelProps,
    fieldProps,
    disableAnimation,
    descriptionProps,
    errorMessageProps,
    buttonProps,
    dialogProps,
    calendarProps,
    slots,
  };
}

export type UseDatePickerReturn = ReturnType<typeof useDatePicker>;
