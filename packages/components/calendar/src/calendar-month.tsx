import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";
import type {AriaCalendarGridProps} from "@react-aria/calendar";

import {CalendarDate, endOfMonth, getWeeksInMonth} from "@internationalized/date";
import {CalendarPropsBase} from "@react-types/calendar";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useLocale} from "@react-aria/i18n";
import {useCalendarGrid} from "@react-aria/calendar";
import {m} from "framer-motion";
import {dataAttr} from "@nextui-org/shared-utils";
import {useEffect, useState} from "react";

import {CalendarCell} from "./calendar-cell";
import {slideVariants} from "./calendar-transitions";

export interface CalendarMonthProps extends HTMLNextUIProps<"table">, CalendarPropsBase {
  state: CalendarState | RangeCalendarState;
  startDate: CalendarDate;
  currentMonth: number;
  direction: number;
  isPickerVisible?: boolean;
  disableAnimation?: boolean;
  weekdayStyle?: AriaCalendarGridProps["weekdayStyle"];
  slots?: CalendarReturnType;
  classNames?: SlotsToClasses<CalendarSlots>;
}

export function CalendarMonth(props: CalendarMonthProps) {
  const {
    startDate,
    slots,
    state: stateProp,
    direction,
    currentMonth,
    weekdayStyle,
    isPickerVisible,
    disableAnimation,
    classNames,
  } = props;

  const {locale} = useLocale();
  const weeksInMonth = getWeeksInMonth(startDate, locale);

  const [state, setState] = useState<CalendarState | RangeCalendarState>(() => stateProp);

  /**
   * This avoid focusing the date cell when navigating through the picker'
   * months/years with the keyboard.
   */
  useEffect(() => {
    if (isPickerVisible) {
      return;
    }

    setState(stateProp);
  }, [stateProp, isPickerVisible]);

  const {gridProps, headerProps, weekDays} = useCalendarGrid(
    {
      ...props,
      weekdayStyle,
      endDate: endOfMonth(startDate),
    },
    state,
  );

  const bodyContent = [...new Array(weeksInMonth).keys()].map((weekIndex) => (
    <tr
      key={weekIndex}
      className={slots?.gridBodyRow({class: classNames?.gridBodyRow})}
      data-slot="grid-body-row"
    >
      {state
        .getDatesInWeek(weekIndex, startDate)
        .map((date, i) =>
          date ? (
            <CalendarCell
              key={i}
              classNames={classNames}
              currentMonth={startDate}
              date={date}
              isPickerVisible={isPickerVisible}
              slots={slots}
              state={state}
            />
          ) : (
            <td key={i} />
          ),
        )}
    </tr>
  ));

  return (
    <table
      {...gridProps}
      aria-hidden={dataAttr(isPickerVisible)}
      className={slots?.grid({class: classNames?.grid})}
      data-slot="grid"
      tabIndex={-1}
    >
      <thead
        {...headerProps}
        className={slots?.gridHeader({class: classNames?.gridHeader})}
        data-slot="grid-header"
      >
        <tr
          className={slots?.gridHeaderRow({class: classNames?.gridHeaderRow})}
          data-slot="grid-header-row"
        >
          {weekDays.map((day, index) => (
            <th
              key={index}
              className={slots?.gridHeaderCell({class: classNames?.gridHeaderCell})}
              data-slot="grid-header-cell"
            >
              <span>{day}</span>
            </th>
          ))}
        </tr>
      </thead>
      {disableAnimation ? (
        <tbody
          key={currentMonth}
          className={slots?.gridBody({class: classNames?.gridBody})}
          data-slot="grid-body"
          tabIndex={isPickerVisible ? -1 : 0}
        >
          {bodyContent}
        </tbody>
      ) : (
        <m.tbody
          key={currentMonth}
          animate="center"
          className={slots?.gridBody({class: classNames?.gridBody})}
          custom={direction}
          data-slot="grid-body"
          exit="exit"
          initial="enter"
          variants={slideVariants}
        >
          {bodyContent}
        </m.tbody>
      )}
    </table>
  );
}
