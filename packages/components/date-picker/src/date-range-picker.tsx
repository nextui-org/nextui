import type {DateValue} from "@internationalized/date";

import {ForwardedRef, ReactElement, Ref, useMemo} from "react";
import {cloneElement, isValidElement} from "react";
import {forwardRef} from "@nextui-org/system";
import {Button} from "@nextui-org/button";
import {DateInput, TimeInput, DateInputGroup} from "@nextui-org/date-input";
import {FreeSoloPopover} from "@nextui-org/popover";
import {RangeCalendar} from "@nextui-org/calendar";
import {AnimatePresence} from "framer-motion";
import {CalendarBoldIcon} from "@nextui-org/shared-icons";

import {UseDateRangePickerProps, useDateRangePicker} from "./use-date-range-picker";

export interface Props<T extends DateValue>
  extends Omit<UseDateRangePickerProps<T>, "hasMultipleMonths"> {}

function DateRangePicker<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    state,
    endContent,
    selectorIcon,
    showTimeField,
    groupProps,
    disableAnimation,
    isCalendarHeaderExpanded,
    getStartDateInputProps,
    getEndDateInputProps,
    getPopoverProps,
    getStartTimeInputProps,
    getEndTimeInputProps,
    getSelectorButtonProps,
    getSelectorIconProps,
    getCalendarProps,
    CalendarTopContent,
    CalendarBottomContent,
  } = useDateRangePicker<T>({...props, ref});

  const selectorContent = isValidElement(selectorIcon) ? (
    cloneElement(selectorIcon, getSelectorIconProps())
  ) : (
    <CalendarBoldIcon {...getSelectorIconProps()} />
  );

  const calendarBottomContent = useMemo(() => {
    if (isCalendarHeaderExpanded) return null;

    return showTimeField ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TimeInput {...getStartTimeInputProps()} />
        <TimeInput {...getEndTimeInputProps()} />
        {CalendarBottomContent}
      </div>
    ) : (
      CalendarBottomContent
    );
  }, [showTimeField, CalendarBottomContent, isCalendarHeaderExpanded]);

  const calendarTopContent = useMemo(() => {
    if (isCalendarHeaderExpanded) return null;

    return CalendarTopContent;
  }, [showTimeField, CalendarTopContent, isCalendarHeaderExpanded]);

  const popoverContent = state.isOpen ? (
    <FreeSoloPopover {...getPopoverProps()}>
      <RangeCalendar
        {...getCalendarProps()}
        bottomContent={calendarBottomContent}
        topContent={calendarTopContent}
      />
    </FreeSoloPopover>
  ) : null;

  return (
    <>
      <DateInputGroup
        {...getBaseProps()}
        as={as}
        description={description}
        descriptionProps={getDescriptionProps()}
        endContent={<Button {...getSelectorButtonProps()}>{endContent || selectorContent}</Button>}
        errorMessage={errorMessage}
        errorMessageProps={getErrorMessageProps()}
        groupProps={getInputWrapperProps()}
        helperWrapperProps={getHelperWrapperProps()}
        label={label}
        labelProps={getLabelProps()}
        shouldLabelBeOutside={shouldLabelBeOutside}
        startContent={startContent}
        wrapperProps={getInnerWrapperProps()}
      >
        <DateInput {...getStartDateInputProps()} />
        <span style={{padding: "0 4px"}}>–</span>
        <DateInput {...getEndDateInputProps()} />
      </DateInputGroup>

      {/* <DateInput
        {...getDateInputProps()}
        endContent={<Button {...getSelectorButtonProps()}>{endContent || selectorContent}</Button>}
      /> */}
      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </>
  );
}

DateRangePicker.displayName = "NextUI.DateRangePicker";

export type DateRangePickerProps<T extends DateValue = DateValue> = Props<T> & {
  ref?: Ref<HTMLElement>;
};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DateRangePicker) as <T extends DateValue>(
  props: DateRangePickerProps<T>,
) => ReactElement;
