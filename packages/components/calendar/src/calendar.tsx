import type {CalendarDate, DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement} from "react";

import {forwardRef} from "@nextui-org/system";

import {UseCalendarProps, useCalendar} from "./use-calendar";
import {CalendarProvider} from "./calendar-context";
import {CalendarBase} from "./calendar-base";

interface Props<T extends DateValue>
  extends Omit<UseCalendarProps<T>, "isHeaderWrapperExpanded" | "children"> {
  children?: ((date: CalendarDate) => React.ReactNode) | React.ReactNode;
}

export type CalendarProps<T extends DateValue = DateValue> = Props<T>;

const Calendar = forwardRef(function Calendar<T extends DateValue>(
  props: CalendarProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {children, ...otherProps} = props;
  const {context, getBaseCalendarProps} = useCalendar<T>({
    ...otherProps,
    ref,
    cellContent: children,
  });

  return (
    <CalendarProvider value={context}>
      <CalendarBase {...getBaseCalendarProps()} />
    </CalendarProvider>
  );
}) as <T extends DateValue>(props: CalendarProps<T>) => ReactElement;

export default Calendar;
