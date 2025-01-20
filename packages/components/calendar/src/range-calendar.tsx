import type {CalendarDate, DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement} from "react";

import {forwardRef} from "@heroui/system";

import {UseRangeCalendarProps, useRangeCalendar} from "./use-range-calendar";
import {CalendarProvider} from "./calendar-context";
import {CalendarBase} from "./calendar-base";

interface Props<T extends DateValue>
  extends Omit<
    UseRangeCalendarProps<T>,
    "isHeaderExpanded" | "onHeaderExpandedChange" | "isHeaderWrapperExpanded" | "children"
  > {
  children?: ((date: CalendarDate) => React.ReactNode) | React.ReactNode;
}

export type RangeCalendarProps<T extends DateValue = DateValue> = Props<T>;

const RangeCalendar = forwardRef(function RangeCalendar<T extends DateValue>(
  props: RangeCalendarProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {children, ...otherProps} = props;
  const {context, getBaseCalendarProps} = useRangeCalendar<T>({
    ...otherProps,
    ref,
    cellContent: children,
  });

  return (
    <CalendarProvider value={context}>
      <CalendarBase {...getBaseCalendarProps()} />
    </CalendarProvider>
  );
}) as <T extends DateValue>(props: RangeCalendarProps<T>) => ReactElement;

export default RangeCalendar;
