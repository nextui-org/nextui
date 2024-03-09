import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";
import type {CalendarDate} from "@internationalized/date";

import {useDateFormatter} from "@react-aria/i18n";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useCallback} from "react";

import {getMonthsInYear, getYearRange} from "./utils";

export type PickerValue = {
  value: string;
  label: string;
};

export interface CalendarPickerProps extends HTMLNextUIProps<"div"> {
  date: CalendarDate;
  currentMonth: CalendarDate;
  state: CalendarState | RangeCalendarState;
  slots?: CalendarReturnType;
  disableAnimation?: boolean;
  classNames?: SlotsToClasses<CalendarSlots>;
}

const EMPTY_ITEMS_OFFSET = 3;

export function CalendarPicker(props: CalendarPickerProps) {
  const {slots, date, currentMonth, state, classNames} = props;

  const monthDateFormatter = useDateFormatter({
    month: "long",
    era:
      currentMonth.calendar.identifier === "gregory" && currentMonth.era === "BC"
        ? "short"
        : undefined,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone,
  });

  // Used for the year/month pickers
  const years = getYearRange(state.minValue, state.maxValue)?.map((y) => ({
    value: y.year,
    label: y.year.toString(),
  }));
  const months = getMonthsInYear(date).map((m) => ({
    value: m.month,
    label: monthDateFormatter.format(m.toDate(state.timeZone)),
  }));

  const EmptyItem = useCallback(
    (props: HTMLNextUIProps<"div">) => (
      <div
        aria-hidden="true"
        className={slots?.pickerItem({class: classNames?.pickerItem})}
        data-slot="picker-item-empty"
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
        className={slots?.pickerHighlight({class: classNames?.pickerHighlight})}
        data-slot="picker-highlight"
      />
      <div
        className={slots?.pickerMonthList({class: classNames?.pickerMonthList})}
        data-slot="picker-month-list"
      >
        <PickerItemWrapper>
          {months.map((month) => (
            <button
              key={month.value}
              className={slots?.pickerItem({class: classNames?.pickerItem})}
              data-slot="picker-item"
            >
              {month.label}
            </button>
          ))}
        </PickerItemWrapper>
      </div>
      <div
        className={slots?.pickerYearList({class: classNames?.pickerYearList})}
        data-slot="picker-year-list"
      >
        <PickerItemWrapper>
          {years.map((year) => (
            <button
              key={year.value}
              className={slots?.pickerItem({class: classNames?.pickerItem})}
              data-slot="picker-item"
            >
              {year.label}
            </button>
          ))}
        </PickerItemWrapper>
      </div>
    </div>
  );
}
