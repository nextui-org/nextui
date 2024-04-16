import type {CalendarPickerProps} from "./use-calendar-picker";

import {HTMLNextUIProps} from "@nextui-org/system";
import {useCallback} from "react";

import {CalendarPickerItem} from "./calendar-picker-item";
import {useCalendarPicker} from "./use-calendar-picker";

export type PickerValue = {
  value: string;
  label: string;
};

const EMPTY_ITEMS_OFFSET = 3;

export function CalendarPicker(props: CalendarPickerProps) {
  const {
    state,
    slots,
    months,
    years,
    highlightRef,
    monthsListRef,
    yearsListRef,
    classNames,
    getItemRef,
    isHeaderExpanded,
    onPickerItemPressed,
    onPickerItemKeyDown,
  } = useCalendarPicker(props);

  const EmptyItem = useCallback(
    (props: HTMLNextUIProps<"div">) => (
      <div
        aria-hidden="true"
        className={slots?.pickerItem({class: classNames?.pickerItem})}
        data-slot="picker-item-empty"
        tabIndex={-1}
        {...props}
      >
        &nbsp;
      </div>
    ),
    [slots, classNames?.pickerItem],
  );

  const PickerItemWrapper = useCallback(
    ({children}: HTMLNextUIProps<"div">) => (
      <>
        {Array.from({length: EMPTY_ITEMS_OFFSET}, (_, i) => (
          <EmptyItem key={i} />
        ))}
        {children}
        {Array.from({length: EMPTY_ITEMS_OFFSET}, (_, i) => (
          <EmptyItem key={i} />
        ))}
      </>
    ),
    [EmptyItem],
  );

  return (
    <div
      className={slots?.pickerWrapper({
        class: classNames?.pickerWrapper,
      })}
      data-slot="picker-wrapper"
    >
      <div
        ref={highlightRef}
        className={slots?.pickerHighlight({class: classNames?.pickerHighlight})}
        data-slot="picker-highlight"
      />
      <div
        ref={monthsListRef}
        className={slots?.pickerMonthList({class: classNames?.pickerMonthList})}
        data-slot="picker-month-list"
      >
        <PickerItemWrapper>
          {months.map((month) => (
            <CalendarPickerItem
              key={`picker-month-${month.value}`}
              ref={(node) => getItemRef(node, month.value, "months")}
              className={slots?.pickerItem({class: classNames?.pickerItem})}
              data-value={month.value}
              tabIndex={!isHeaderExpanded || state.focusedDate?.month !== month.value ? -1 : 0}
              onKeyDown={(e) => onPickerItemKeyDown(e, month.value, "months")}
              onPress={(e) => onPickerItemPressed(e, "months")}
            >
              {month.label}
            </CalendarPickerItem>
          ))}
        </PickerItemWrapper>
      </div>
      <div
        ref={yearsListRef}
        className={slots?.pickerYearList({class: classNames?.pickerYearList})}
        data-slot="picker-year-list"
      >
        <PickerItemWrapper>
          {years.map((year) => (
            <CalendarPickerItem
              key={`picker-year-${year.value}`}
              ref={(node) => getItemRef(node, year.value, "years")}
              className={slots?.pickerItem({class: classNames?.pickerItem})}
              data-value={year.value}
              tabIndex={!isHeaderExpanded || state.focusedDate?.year !== year.value ? -1 : 0}
              onKeyDown={(e) => onPickerItemKeyDown(e, year.value, "years")}
              onPress={(e) => onPickerItemPressed(e, "years")}
            >
              {year.label}
            </CalendarPickerItem>
          ))}
        </PickerItemWrapper>
      </div>
    </div>
  );
}
