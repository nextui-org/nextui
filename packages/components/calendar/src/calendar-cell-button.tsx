import type {HTMLNextUIProps} from "@nextui-org/system";

import {useRef} from "react";
import {useHover} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {dataAttr} from "@nextui-org/shared-utils";

import {useCalendarCell} from "./calendar-cell-context";
import {useCalendarContext} from "./calendar-context";

export interface CalendarCellButtonProps extends HTMLNextUIProps<"div"> {
  children?: React.ReactNode;
}

export const CalendarCellButton = ({children, ...props}: CalendarCellButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {slots, classNames} = useCalendarContext();
  const {
    state,
    buttonProps,
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
  } = useCalendarCell();

  const {focusProps, isFocusVisible} = useFocusRing();
  const {hoverProps, isHovered} = useHover({
    isDisabled: isDisabled || isUnavailable || state.isReadOnly,
  });

  // Extract pressed from buttonProps using optional chaining
  const isPressed = buttonProps["aria-pressed"] === true;

  const {date} = useCalendarCell();

  return (
    <div
      {...mergeProps(buttonProps, hoverProps, focusProps, props)}
      ref={ref}
      className={slots?.cellButton({class: classNames?.cellButton})}
      data-disabled={dataAttr(isDisabled && !isInvalid)}
      data-focus-visible={dataAttr(isFocusVisible)}
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
      data-slot="cell-button"
      data-today={dataAttr(isToday)}
      data-unavailable={dataAttr(isUnavailable)}
    >
      {children ? children : date.day}
    </div>
  );
};

CalendarCellButton.displayName = "NextUI.CalendarCellButton";

export default CalendarCellButton;
