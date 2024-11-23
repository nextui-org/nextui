import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement, Ref} from "react";
import type {CalendarDate} from "@internationalized/date";

import {forwardRef} from "@nextui-org/system";

import {UseCalendarProps, useCalendar} from "./use-calendar";
import {CalendarProvider} from "./calendar-context";
import {CalendarBase} from "./calendar-base";

interface Props<T extends DateValue>
  extends Omit<UseCalendarProps<T>, "isHeaderWrapperExpanded" | "children"> {
  /**
   * The calendar cell render function
   */
  children?: (date: CalendarDate) => React.ReactNode;
}

function Calendar<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
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
}

Calendar.displayName = "NextUI.Calendar";

export type CalendarProps<T extends DateValue = DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Calendar) as <T extends DateValue>(
  props: CalendarProps<T>,
) => ReactElement;
