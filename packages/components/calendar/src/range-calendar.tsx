import type {DateValue} from "@react-types/calendar";
import type {ForwardedRef, ReactElement, Ref} from "react";

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
  > {}

function RangeCalendar<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {context, getBaseCalendarProps} = useRangeCalendar({...props, ref});

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
