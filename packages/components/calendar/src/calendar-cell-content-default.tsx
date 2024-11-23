import React from "react";
import {CalendarDate} from "@internationalized/date";

import {CalendarCellContent} from "./calendar-cell-content";
import {CalendarCellHeader} from "./calendar-cell-header";

export interface CalendarCellContentDefaultProps {
  date: CalendarDate;
}

export const CalendarCellContentDefault: React.FC<CalendarCellContentDefaultProps> = ({date}) => {
  return (
    <CalendarCellContent>
      <CalendarCellHeader>{date.day}</CalendarCellHeader>
    </CalendarCellContent>
  );
};

CalendarCellContentDefault.displayName = "NextUI.CalendarCellContentDefault";
