import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";
import type {ButtonProps} from "@nextui-org/button";
import type {CalendarDate} from "@internationalized/date";

import {HTMLNextUIProps} from "@nextui-org/system";
import {useDateFormatter} from "@react-aria/i18n";
import {m} from "framer-motion";
import {Button} from "@nextui-org/button";

import {slideVariants} from "./calendar-transitions";
import {ChevronDownIcon} from "./chevron-down";

export interface CalendarHeaderProps extends HTMLNextUIProps<"header"> {
  slots?: CalendarReturnType;
  direction: number;
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  buttonPickerProps?: ButtonProps;
  isPickerVisible?: boolean;
  showMonthAndYearPickers?: boolean;
  disableAnimation?: boolean;
  classNames?: SlotsToClasses<CalendarSlots>;
}

export function CalendarHeader(props: CalendarHeaderProps) {
  const {
    slots,
    direction,
    date,
    state,
    currentMonth,
    buttonPickerProps,
    isPickerVisible,
    showMonthAndYearPickers,
    disableAnimation,
    classNames,
  } = props;

  const monthAndYearDateFormatter = useDateFormatter({
    month: "long",
    era:
      currentMonth.calendar.identifier === "gregory" && currentMonth.era === "BC"
        ? "short"
        : undefined,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone,
    year: "numeric",
  });

  const monthDateContent = monthAndYearDateFormatter.format(date.toDate(state.timeZone));

  const headerTitle = (
    <>
      {/* // We have a visually hidden heading describing the entire visible range,
          // and the calendar itself describes the individual month
          // so we don't need to repeat that here for screen reader users. */}
      {disableAnimation ? (
        <span
          key={currentMonth.month}
          aria-hidden={true}
          className={slots?.title({class: classNames?.title})}
          data-slot="title"
        >
          {monthDateContent}
        </span>
      ) : (
        <m.span
          key={currentMonth.month}
          animate="center"
          aria-hidden={true}
          className={slots?.title({class: classNames?.title})}
          custom={direction}
          data-slot="title"
          exit="exit"
          initial="enter"
          variants={isPickerVisible ? {} : slideVariants}
        >
          {monthDateContent}
        </m.span>
      )}
    </>
  );

  const headerProps = {
    className: slots?.header({class: classNames?.header}),
    "data-slot": "header",
  };

  return showMonthAndYearPickers ? (
    <Button
      {...headerProps}
      disableAnimation={disableAnimation}
      endContent={<ChevronDownIcon className="chevron-icon" />}
      {...buttonPickerProps}
    >
      {headerTitle}
    </Button>
  ) : (
    <header {...headerProps}>{headerTitle}</header>
  );
}
