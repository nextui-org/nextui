import React from "react";
import {CalendarDate} from "@internationalized/date";

import {CalendarCellContent} from "./calendar-cell-content";
import {CalendarCellButton} from "./calendar-cell-button";

export interface CalendarCellContentDefaultProps {
  date: CalendarDate;
}

export const CalendarCellContentDefault: React.FC<CalendarCellContentDefaultProps> = ({date}) => {
  return (
    <CalendarCellContent>
      <CalendarCellButton>{date.day}</CalendarCellButton>
    </CalendarCellContent>
  );
};

CalendarCellContentDefault.displayName = "NextUI.CalendarCellContentDefault";
