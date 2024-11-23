import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";
import type {HTMLNextUIProps} from "@nextui-org/system";
import type {AriaCalendarCellProps} from "@react-aria/calendar";

import {useRef} from "react";
import {CalendarDate, getDayOfWeek, isSameDay, isSameMonth, isToday} from "@internationalized/date";
import {useCalendarCell as useAriaCalendarCell} from "@react-aria/calendar";
import {useLocale} from "@react-aria/i18n";

import {CalendarCellProvider} from "./calendar-cell-context";
import {useCalendarContext} from "./calendar-context";
import {CalendarCellContentDefault} from "./calendar-cell-content-default";

type CalendarCellBaseProps = Omit<HTMLNextUIProps<"td">, "children">;

export interface CalendarCellProps extends CalendarCellBaseProps, AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  isPickerVisible?: boolean;
  slots?: CalendarReturnType;
  classNames?: SlotsToClasses<CalendarSlots>;
  currentMonth: CalendarDate;
  cellContent?: ((date: CalendarDate) => React.ReactNode) | React.ReactNode;
}

export const CalendarCell = ({
  state,
  date,
  currentMonth,
  isPickerVisible,
  slots: propSlots,
  classNames: propClassNames,
  ...otherProps
}: CalendarCellProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {locale} = useLocale();
  const {slots: contextSlots, classNames: contextClassNames, cellContent} = useCalendarContext();

  const slots = propSlots || contextSlots;
  const classNames = propClassNames || contextClassNames;

  const {cellProps, buttonProps, isSelected, isDisabled, isInvalid, formattedDate} =
    useAriaCalendarCell(
      {
        ...otherProps,
        date,
        isDisabled: !isSameMonth(date, currentMonth) || isPickerVisible,
      },
      state,
      ref,
    );

  const isUnavailable = state.isCellUnavailable(date);
  const isOutsideMonth = !isSameMonth(date, currentMonth);
  const isTodayDate = isToday(date, state.timeZone);
  const isPressable = !isDisabled && !isUnavailable && !state.isReadOnly;

  // Special handling for range selection states
  const isLastSelectedBeforeDisabled =
    !isDisabled && !isInvalid && state.isCellUnavailable(date.add({days: 1}));
  const isFirstSelectedAfterDisabled =
    !isDisabled && !isInvalid && state.isCellUnavailable(date.subtract({days: 1}));
  const highlightedRange = "highlightedRange" in state && state.highlightedRange;
  const isSelectionStart = isSelected && highlightedRange ? isSameDay(date, highlightedRange.start) : false;
  const isSelectionEnd = isSelected && highlightedRange ? isSameDay(date, highlightedRange.end) : false;
  const isRangeStart =
    isSelected && (isFirstSelectedAfterDisabled || dayOfWeek === 0 || date.day === 1);
  const isRangeEnd =
    isSelected &&
    (isLastSelectedBeforeDisabled ||
      dayOfWeek === 6 ||
      date.day === currentMonth.calendar.getDaysInMonth(currentMonth));

  const cellContextValue = {
    date,
    state,
    buttonProps,
    isSelected,
    isDisabled,
    isInvalid,
    isUnavailable,
    isOutsideMonth,
    isToday: isTodayDate,
    isPressable,
    isRangeSelection: isSelected && "highlightedRange" in state,
    isRangeStart,
    isRangeEnd,
    isSelectionStart,
    isSelectionEnd,
    formattedDate,
  };

  return (
    <td {...cellProps} className={slots?.cell({class: classNames?.cell})} data-slot="cell">
      <CalendarCellProvider value={cellContextValue}>
        {typeof cellContent === "function"
          ? cellContent(date)
          : cellContent ?? <CalendarCellContentDefault date={date} />}
      </CalendarCellProvider>
    </td>
  );
};

CalendarCell.displayName = "NextUI.CalendarCell";
