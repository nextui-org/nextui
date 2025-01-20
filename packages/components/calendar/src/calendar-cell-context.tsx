import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarDate} from "@internationalized/date";
import type {DOMAttributes} from "@react-types/shared";

import {createContext} from "@nextui-org/react-utils";

export interface CalendarCellContextType {
  // Core date and state
  date: CalendarDate;
  state: CalendarState | RangeCalendarState;
  buttonProps: DOMAttributes;
  formattedDate: string;

  // Selection states
  isSelected: boolean;
  isRangeSelection: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isSelectionStart: boolean;
  isSelectionEnd: boolean;

  // Interaction states
  isDisabled: boolean;
  isPressable: boolean;
  isPressed: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isHovered: boolean;

  // Validation states
  isInvalid: boolean;
  isUnavailable: boolean;

  // Display states
  isOutsideMonth: boolean;
  isToday: boolean;
  isReadOnly: boolean;
}

export const [CalendarCellProvider, useCalendarCell] = createContext<CalendarCellContextType>({
  name: "CalendarCellContext",
  strict: true,
  errorMessage:
    "useCalendarCell: `context` is undefined. Seems you forgot to wrap component within the CalendarCellProvider",
});
