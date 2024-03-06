import type {DateValue} from "@react-types/calendar";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {forwardRef} from "@nextui-org/system";

import {UseCalendarProps, useCalendar} from "./use-calendar";

interface Props<T extends DateValue> extends UseCalendarProps<T> {}

function Calendar<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {Component, domRef, children, styles, ...otherProps} = useCalendar({...props, ref});

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {/* TODO: CalendarBase */}
      {children}
    </Component>
  );
}

Calendar.displayName = "NextUI.Calendar";

export type CalendarProps<T extends DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Calendar) as <T extends DateValue>(
  props: CalendarProps<T>,
) => ReactElement;
