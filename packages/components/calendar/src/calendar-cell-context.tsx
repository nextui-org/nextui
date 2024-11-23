import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarDate} from "@internationalized/date";
import type {DOMAttributes} from "@react-types/shared";

import {createContext} from "@nextui-org/react-utils";

export interface CalendarCellContextType {
  date: CalendarDate;
  state: CalendarState | RangeCalendarState;
  buttonProps: DOMAttributes;
  isSelected: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  isUnavailable: boolean;
  isOutsideMonth: boolean;
  isToday: boolean;
  isPressable: boolean;
  isRangeSelection: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isSelectionStart: boolean;
  isSelectionEnd: boolean;
  formattedDate: string;
}

export const [CalendarCellProvider, useCalendarCell] = createContext<CalendarCellContextType>({
  name: "CalendarCellContext",
  strict: true,
  errorMessage:
    "useCalendarCell: `context` is undefined. Seems you forgot to wrap component within the CalendarCellProvider",
});
