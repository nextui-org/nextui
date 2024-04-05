import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {cloneElement, isValidElement} from "react";
import {forwardRef} from "@nextui-org/system";
import {Button} from "@nextui-org/button";
import {DateInput} from "@nextui-org/date-input";
import {FreeSoloPopover} from "@nextui-org/popover";
import {Calendar} from "@nextui-org/calendar";
import {AnimatePresence} from "framer-motion";
import {CalendarBoldIcon} from "@nextui-org/shared-icons";

import {UseDatePickerProps, useDatePicker} from "./use-date-picker";

export interface Props<T extends DateValue> extends UseDatePickerProps<T> {}

function DatePicker<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    Component,
    state,
    selectorIcon,
    disableAnimation,
    getBaseProps,
    getDateInputProps,
    getPopoverProps,
    getSelectorButtonProps,
    getSelectorIconProps,
    getCalendarProps,
  } = useDatePicker<T>({...props, ref});

  const selectorContent = isValidElement(selectorIcon) ? (
    cloneElement(selectorIcon, getSelectorIconProps())
  ) : (
    <CalendarBoldIcon {...getSelectorIconProps()} />
  );

  const popoverContent = state.isOpen ? (
    <FreeSoloPopover {...getPopoverProps()}>
      <Calendar {...getCalendarProps()} />
    </FreeSoloPopover>
  ) : null;

  return (
    <Component {...getBaseProps()}>
      <DateInput
        {...getDateInputProps()}
        endContent={<Button {...getSelectorButtonProps()}>{selectorContent}</Button>}
      />
      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </Component>
  );
}

DatePicker.displayName = "NextUI.DatePicker";

export type DatePickerProps<T extends DateValue = DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DatePicker) as <T extends DateValue>(
  props: DatePickerProps<T>,
) => ReactElement;
