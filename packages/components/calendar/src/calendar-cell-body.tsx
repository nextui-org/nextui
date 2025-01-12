import type {HTMLNextUIProps} from "@nextui-org/system";

import React from "react";

import {useCalendarContext} from "./calendar-context";

interface Props extends HTMLNextUIProps<"div"> {
  children: React.ReactNode;
}

export type CalendarCellBodyProps = Props;

export const CalendarCellBody = React.forwardRef<HTMLDivElement, CalendarCellBodyProps>(
  ({children, ...props}, ref) => {
    const {slots, classNames} = useCalendarContext();
    const bodyProps = {
      ...props,
      ref: ref,
      className: slots?.cellBody({class: classNames?.cellBody}),
      "data-slot": "cell-body",
    };

    return <div {...bodyProps}>{children}</div>;
  },
);

CalendarCellBody.displayName = "NextUI.CalendarCellBody";

export default CalendarCellBody;
