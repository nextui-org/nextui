import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {RefObject, HTMLAttributes} from "react";
import type {AriaButtonProps} from "@react-types/button";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";

import {As, HTMLNextUIProps} from "@nextui-org/system";
import {useDateFormatter, useLocale} from "@react-aria/i18n";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {Button} from "@nextui-org/button";
import {mergeProps} from "@react-aria/utils";

import {ChevronLeftIcon} from "./chevron-left";
import {ChevronRightIcon} from "./chevron-right";
import {CalendarMonth} from "./calendar-month";

export interface CalendarBaseProps<T extends CalendarState | RangeCalendarState>
  extends HTMLNextUIProps<"div"> {
  state: T;
  slots?: CalendarReturnType;
  Component?: As;
  visibleMonths?: number;
  calendarProps: HTMLAttributes<HTMLElement>;
  nextButtonProps: AriaButtonProps;
  prevButtonProps: AriaButtonProps;
  errorMessageProps: HTMLAttributes<HTMLElement>;
  calendarRef: RefObject<HTMLDivElement>;
  classNames?: SlotsToClasses<CalendarSlots>;
}

export function CalendarBase<T extends CalendarState | RangeCalendarState>(
  props: CalendarBaseProps<T>,
) {
  const {
    state,
    slots,
    Component = "div",
    calendarProps,
    nextButtonProps,
    prevButtonProps,
    // errorMessageProps,
    calendarRef: ref,
    classNames,
    visibleMonths = 1,
    ...otherProps
  } = props;

  const {direction} = useLocale();

  const currentMonth = state.visibleRange.start;

  const monthDateFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    era:
      currentMonth.calendar.identifier === "gregory" && currentMonth.era === "BC"
        ? "short"
        : undefined,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone,
  });

  const headers = [];
  const calendars = [];

  for (let i = 0; i < visibleMonths; i++) {
    let d = currentMonth.add({months: i});

    headers.push(
      <header key={i} className={slots?.header({class: classNames?.header})} data-slot="header">
        {i === 0 && (
          <Button {...prevButtonProps}>
            {direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </Button>
        )}
        <span
          // We have a visually hidden heading describing the entire visible range,
          // and the calendar itself describes the individual month
          // so we don't need to repeat that here for screen reader users.
          aria-hidden
          className={slots?.title({class: classNames?.title})}
          data-slot="title"
        >
          {monthDateFormatter.format(d.toDate(state.timeZone))}
        </span>
        {i === visibleMonths - 1 && (
          <Button {...nextButtonProps}>
            {direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </Button>
        )}
      </header>,
    );

    calendars.push(<CalendarMonth {...props} key={i} startDate={d} state={state} />);
  }

  return (
    <Component {...mergeProps(calendarProps, otherProps)} ref={ref}>
      {/* Add a screen reader only description of the entire visible range rather than
       * a separate heading above each month grid. This is placed first in the DOM order
       * so that it is the first thing a touch screen reader user encounters.
       * In addition, VoiceOver on iOS does not announce the aria-label of the grid
       * elements, so the aria-label of the Calendar is included here as well. */}
      <VisuallyHidden>
        <h2>{calendarProps["aria-label"]}</h2>
      </VisuallyHidden>
      <div
        className={slots?.headerWrapper({class: classNames?.headerWrapper})}
        data-slot="header-wrapper"
      >
        {headers}
      </div>
      <div
        className={slots?.gridWrapper({class: classNames?.gridWrapper})}
        data-slot="grid-wrapper"
      >
        {calendars}
      </div>
      {/* For touch screen readers, add a visually hidden next button after the month grid
       * so it's easy to navigate after reaching the end without going all the way
       * back to the start of the month. */}
      <VisuallyHidden>
        <button
          aria-label={nextButtonProps["aria-label"]}
          disabled={nextButtonProps.isDisabled}
          tabIndex={-1}
          onClick={() => state.focusNextPage()}
        />
      </VisuallyHidden>
      {/* {state.isValueInvalid && (
        <HelpText
          showErrorIcon
          errorMessage={
            props.errorMessage ||
            stringFormatter.format("invalidSelection", {
              selectedCount: "highlightedRange" in state ? 2 : 1,
            })
          }
          errorMessageProps={errorMessageProps}
          isInvalid
          // Intentionally a global class name so it can be targeted in DatePicker CSS...
          UNSAFE_className="spectrum-Calendar-helpText"
        />
      )} */}
    </Component>
  );
}
