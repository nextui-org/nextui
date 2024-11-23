import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";

import {CalendarDate, getDayOfWeek, isSameDay, isSameMonth, isToday} from "@internationalized/date";
import {AriaCalendarCellProps, useCalendarCell} from "@react-aria/calendar";
import {HTMLNextUIProps} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {useLocale} from "@react-aria/i18n";
import {useFocusRing} from "@react-aria/focus";
import {useHover} from "@react-aria/interactions";
import {useRef} from "react";

import {CalendarCellContextType, CalendarCellProvider} from "./calendar-cell-context";
import {CalendarCellContentDefault} from "./calendar-cell-content-default";
import {useCalendarContext} from "./calendar-context";

export interface CalendarCellProps extends HTMLNextUIProps<"td">, AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  isPickerVisible?: boolean;
  slots?: CalendarReturnType;
  classNames?: SlotsToClasses<CalendarSlots>;
  currentMonth: CalendarDate;
}

export function CalendarCell(originalProps: CalendarCellProps) {
  const {state, slots, isPickerVisible, currentMonth, classNames, ...props} = originalProps;

  const ref = useRef<HTMLButtonElement>(null);
  const {cellContent} = useCalendarContext();

  const {
    cellProps,
    buttonProps,
    isPressed,
    isSelected,
    isDisabled,
    isFocused,
    isInvalid,
    formattedDate,
  } = useCalendarCell(
    {
      ...props,
      isDisabled: !isSameMonth(props.date, currentMonth) || isPickerVisible,
    },
    state,
    ref,
  );

  const isUnavailable = state.isCellUnavailable(props.date);
  const isLastSelectedBeforeDisabled =
    !isDisabled && !isInvalid && state.isCellUnavailable(props.date.add({days: 1}));
  const isFirstSelectedAfterDisabled =
    !isDisabled && !isInvalid && state.isCellUnavailable(props.date.subtract({days: 1}));
  const highlightedRange = "highlightedRange" in state && state.highlightedRange;
  const isSelectionStart =
    isSelected && highlightedRange ? isSameDay(props.date, highlightedRange.start) : false;
  const isSelectionEnd =
    isSelected && highlightedRange ? isSameDay(props.date, highlightedRange.end) : false;
  const {locale} = useLocale();
  const dayOfWeek = getDayOfWeek(props.date, locale);
  const isRangeStart =
    isSelected && (isFirstSelectedAfterDisabled || dayOfWeek === 0 || props.date.day === 1);
  const isRangeEnd =
    isSelected &&
    (isLastSelectedBeforeDisabled ||
      dayOfWeek === 6 ||
      props.date.day === currentMonth.calendar.getDaysInMonth(currentMonth));

  const {focusProps, isFocusVisible} = useFocusRing();
  const {hoverProps, isHovered} = useHover({
    isDisabled: isDisabled || isUnavailable || state.isReadOnly,
  });

  const cellContextValue: CalendarCellContextType = {
    // Core date and state
    date: props.date,
    state,
    buttonProps,
    formattedDate,

    // Selection states
    isSelected,
    isRangeSelection: isSelected && "highlightedRange" in state,
    isRangeStart,
    isRangeEnd,
    isSelectionStart,
    isSelectionEnd,

    // Interaction states
    isDisabled,
    isPressable: !isDisabled && !isUnavailable && !state.isReadOnly,
    isPressed,
    isFocused,
    isFocusVisible,
    isHovered,

    // Validation states
    isInvalid,
    isUnavailable,

    // Display states
    isOutsideMonth: !isSameMonth(props.date, currentMonth),
    isToday: isToday(props.date, state.timeZone),
    isReadOnly: state.isReadOnly,
  };

  return (
    <td className={slots?.cell({class: classNames?.cell})} data-slot="cell" {...cellProps}>
      <span
        {...mergeProps(buttonProps, hoverProps, focusProps)}
        ref={ref}
        className={slots?.cellButton({class: classNames?.cellButton})}
      >
        <CalendarCellProvider value={cellContextValue}>
          {typeof cellContent === "function"
            ? cellContent(props.date)
            : cellContent ?? <CalendarCellContentDefault date={props.date} />}
        </CalendarCellProvider>
      </span>
    </td>
  );
}
