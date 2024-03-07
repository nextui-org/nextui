import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";
import type {AriaCalendarGridProps} from "@react-aria/calendar";

import {CalendarDate, endOfMonth, getWeeksInMonth} from "@internationalized/date";
import {CalendarPropsBase} from "@react-types/calendar";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useLocale} from "@react-aria/i18n";
import {useCalendarGrid} from "@react-aria/calendar";
import {m} from "framer-motion";

import {CalendarCell} from "./calendar-cell";
import {slideVariants} from "./calendar-transitions";

export interface CalendarMonthProps extends HTMLNextUIProps<"table">, CalendarPropsBase {
  state: CalendarState | RangeCalendarState;
  startDate: CalendarDate;
  currentMonth: number;
  direction: number;
  disableAnimation?: boolean;
  weekdayStyle?: AriaCalendarGridProps["weekdayStyle"];
  slots?: CalendarReturnType;
  classNames?: SlotsToClasses<CalendarSlots>;
}

export function CalendarMonth(props: CalendarMonthProps) {
  const {
    state,
    startDate,
    slots,
    direction,
    currentMonth,
    weekdayStyle,
    disableAnimation,
    classNames,
  } = props;

  const {locale} = useLocale();
  const weeksInMonth = getWeeksInMonth(startDate, locale);

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
    <table {...gridProps} className={slots?.grid({class: classNames?.grid})} data-slot="grid">
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
