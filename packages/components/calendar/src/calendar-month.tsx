import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";

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
import {useCalendarContext} from "./calendar-context";

export interface CalendarMonthProps extends HTMLNextUIProps<"table">, CalendarPropsBase {
  startDate: CalendarDate;
  currentMonth: number;
  direction: number;
}

export function CalendarMonth(props: CalendarMonthProps) {
  const {startDate, direction, currentMonth} = props;

  const {locale} = useLocale();
  const weeksInMonth = getWeeksInMonth(startDate, locale);

  const {
    state: stateProp,
    slots,
    weekdayStyle,
    isHeaderExpanded,
    disableAnimation,
    classNames,
  } = useCalendarContext();

  // Self-controlled state
  const [state, setState] = useState<CalendarState | RangeCalendarState>(() => stateProp);

  /**
   * This avoid focusing the date cell when navigating through the picker'
   * months/years with the keyboard.
   */
  useEffect(() => {
    if (isHeaderExpanded) {
      return;
    }

    setState(stateProp);
  }, [stateProp, isHeaderExpanded]);

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
              isPickerVisible={isHeaderExpanded}
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
      aria-hidden={dataAttr(isHeaderExpanded)}
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
          tabIndex={isHeaderExpanded ? -1 : 0}
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
