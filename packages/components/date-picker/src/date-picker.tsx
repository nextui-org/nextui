import type {DateValue} from "@internationalized/date";

import {ForwardedRef, ReactElement, Ref, useMemo} from "react";
import {cloneElement, isValidElement} from "react";
import {forwardRef} from "@nextui-org/system";
import {Button} from "@nextui-org/button";
import {DateInput, TimeInput} from "@nextui-org/date-input";
import {FreeSoloPopover} from "@nextui-org/popover";
import {Calendar} from "@nextui-org/calendar";
import {AnimatePresence} from "framer-motion";
import {CalendarBoldIcon} from "@nextui-org/shared-icons";

import {UseDatePickerProps, useDatePicker} from "./use-date-picker";

export interface Props<T extends DateValue> extends UseDatePickerProps<T> {
  /**
   * The placement of the selector button.
   * @default "end"
   */
  selectorButtonPlacement?: "start" | "end";
}

function DatePicker<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {selectorButtonPlacement = "end", ...otherProps} = props;

  const {
    state,
    startContent,
    endContent,
    selectorIcon,
    showTimeField,
    disableAnimation,
    isCalendarHeaderExpanded,
    getDateInputProps,
    getPopoverProps,
    getTimeInputProps,
    getSelectorButtonProps,
    getSelectorIconProps,
    getCalendarProps,
    CalendarTopContent,
    CalendarBottomContent,
  } = useDatePicker<T>({...otherProps, ref});

  const selectorContent = isValidElement(selectorIcon) ? (
    cloneElement(selectorIcon, getSelectorIconProps())
  ) : (
    <CalendarBoldIcon {...getSelectorIconProps()} />
  );

  const calendarBottomContent = useMemo(() => {
    if (isCalendarHeaderExpanded) return null;

    return showTimeField ? (
      <>
        <TimeInput {...getTimeInputProps()} />
        {CalendarBottomContent}
      </>
    ) : (
      CalendarBottomContent
    );
  }, [state, showTimeField, CalendarBottomContent, isCalendarHeaderExpanded]);

  const calendarTopContent = useMemo(() => {
    if (isCalendarHeaderExpanded) return null;

    return CalendarTopContent;
  }, [showTimeField, CalendarTopContent, isCalendarHeaderExpanded]);

  const popoverContent = state.isOpen ? (
    <FreeSoloPopover {...getPopoverProps()}>
      <Calendar
        {...getCalendarProps()}
        bottomContent={calendarBottomContent}
        topContent={calendarTopContent}
      />
    </FreeSoloPopover>
  ) : null;

  const dateInputProps = {
    ...getDateInputProps(),
    endContent:
      selectorButtonPlacement === "end" ? (
        <Button {...getSelectorButtonProps()}>{endContent || selectorContent}</Button>
      ) : (
        endContent
      ),
    startContent:
      selectorButtonPlacement === "start" ? (
        <Button {...getSelectorButtonProps()}>{startContent || selectorContent}</Button>
      ) : (
        startContent
      ),
  };

  return (
    <>
      <DateInput {...dateInputProps} />
      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </>
  );
}

DatePicker.displayName = "NextUI.DatePicker";

export type DatePickerProps<T extends DateValue = DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DatePicker) as <T extends DateValue>(
  props: DatePickerProps<T>,
) => ReactElement;
