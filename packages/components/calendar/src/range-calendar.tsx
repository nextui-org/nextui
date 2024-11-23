import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement, Ref} from "react";
import type {CalendarDate} from "@internationalized/date";

import {forwardRef} from "@nextui-org/system";

import {UseRangeCalendarProps, useRangeCalendar} from "./use-range-calendar";
import {CalendarProvider} from "./calendar-context";
import {CalendarBase} from "./calendar-base";

interface Props<T extends DateValue>
  extends Omit<
    UseRangeCalendarProps<T>,
    | "isHeaderExpanded"
    | "onHeaderExpandedChange"
    | "isHeaderWrapperExpanded"
    | "showMonthAndYearPickers"
    | "children"
  > {
  /**
   * The calendar cell render function
   */
  children?: (date: CalendarDate) => React.ReactNode;
}

function RangeCalendar<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
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
}

RangeCalendar.displayName = "NextUI.RangeCalendar";

export type RangeCalendarProps<T extends DateValue = DateValue> = Props<T> & {
  ref?: Ref<HTMLElement>;
};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(RangeCalendar) as <T extends DateValue>(
  props: RangeCalendarProps<T>,
) => ReactElement;
