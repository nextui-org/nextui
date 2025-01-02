import type {HTMLNextUIProps} from "@nextui-org/system";

import {dataAttr} from "@nextui-org/shared-utils";

import {useCalendarCell} from "./calendar-cell-context";
import {useCalendarContext} from "./calendar-context";

export interface CalendarCellHeaderProps extends HTMLNextUIProps<"div"> {
  children?: React.ReactNode;
}

export const CalendarCellHeader = ({children}: CalendarCellHeaderProps) => {
  const {slots, classNames} = useCalendarContext();
  const {
    date,
    state,
    isSelected,
    isDisabled,
    isInvalid,
    isOutsideMonth,
    isToday,
    isUnavailable,
    isRangeSelection,
    isRangeStart,
    isRangeEnd,
    isSelectionStart,
    isSelectionEnd,
    isFocused,
    isFocusVisible,
    isHovered,
    isPressed,
  } = useCalendarCell();

  return (
    <div
      className={slots?.cellHeaderWrapper({class: classNames?.cellHeaderWrapper})}
      data-range-end={dataAttr(isRangeEnd)}
      data-range-selection={dataAttr(isRangeSelection)}
      data-range-start={dataAttr(isRangeStart)}
      data-readonly={dataAttr(state.isReadOnly)}
      data-selected={dataAttr(isSelected)}
      data-selection-end={dataAttr(isSelectionEnd)}
      data-selection-start={dataAttr(isSelectionStart)}
    >
      <span
        className={slots?.cellHeader({class: classNames?.cellHeader})}
        data-disabled={dataAttr(isDisabled && !isInvalid)}
        data-focus-visible={dataAttr(isFocused && isFocusVisible)}
        data-hover={dataAttr(isHovered)}
        data-invalid={dataAttr(isInvalid)}
        data-outside-month={dataAttr(isOutsideMonth)}
        data-pressed={dataAttr(isPressed && !state.isReadOnly)}
        data-range-end={dataAttr(isRangeEnd)}
        data-range-selection={dataAttr(isRangeSelection)}
        data-range-start={dataAttr(isRangeStart)}
        data-readonly={dataAttr(state.isReadOnly)}
        data-selected={dataAttr(isSelected)}
        data-selection-end={dataAttr(isSelectionEnd)}
        data-selection-start={dataAttr(isSelectionStart)}
        data-slot="cell-header"
        data-today={dataAttr(isToday)}
        data-unavailable={dataAttr(isUnavailable)}
      >
        {children ? children : date.day}
      </span>
    </div>
  );
};

CalendarCellHeader.displayName = "NextUI.CalendarCellHeader";

export default CalendarCellHeader;
