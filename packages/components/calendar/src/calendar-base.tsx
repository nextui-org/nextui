import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {AriaCalendarGridProps} from "@react-aria/calendar";
import type {RefObject, HTMLAttributes, ReactNode} from "react";
import type {AriaButtonProps} from "@react-types/button";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";
import type {As, HTMLNextUIProps} from "@nextui-org/system";

import {useState} from "react";
import {useDateFormatter, useLocale} from "@react-aria/i18n";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {Button} from "@nextui-org/button";
import {chain, mergeProps} from "@react-aria/utils";
import {AnimatePresence, m, LazyMotion, domAnimation, MotionConfig} from "framer-motion";
import {ResizablePanel} from "@nextui-org/framer-transitions";

import {ChevronLeftIcon} from "./chevron-left";
import {ChevronRightIcon} from "./chevron-right";
import {CalendarMonth} from "./calendar-month";
import {slideVariants, transition} from "./calendar-transitions";

export interface CalendarBaseProps<T extends CalendarState | RangeCalendarState>
  extends HTMLNextUIProps<"div"> {
  state: T;
  calendarProps: HTMLAttributes<HTMLElement>;
  nextButtonProps: AriaButtonProps;
  prevButtonProps: AriaButtonProps;
  errorMessageProps: HTMLAttributes<HTMLElement>;
  calendarRef: RefObject<HTMLDivElement>;
  slots?: CalendarReturnType;
  Component?: As;
  visibleMonths?: number;
  errorMessage?: ReactNode;
  weekdayStyle?: AriaCalendarGridProps["weekdayStyle"];
  disableAnimation?: boolean;
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
    errorMessageProps,
    calendarRef: ref,
    classNames,
    weekdayStyle,
    disableAnimation,
    visibleMonths = 1,
    errorMessage,
    ...otherProps
  } = props;

  const [direction, setDirection] = useState<number>(0);

  const {direction: rtlDirection} = useLocale();

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
      <>
        {i === 0 && (
          <Button
            {...prevButtonProps}
            onPress={chain(prevButtonProps.onPress, () => setDirection(-1))}
          >
            {rtlDirection === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </Button>
        )}

        <header key={i} className={slots?.header({class: classNames?.header})} data-slot="header">
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
              {monthDateFormatter.format(d.toDate(state.timeZone))}
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
              variants={slideVariants}
            >
              {monthDateFormatter.format(d.toDate(state.timeZone))}
            </m.span>
          )}
        </header>
        {i === visibleMonths - 1 && (
          <Button
            {...nextButtonProps}
            onPress={chain(nextButtonProps.onPress, () => setDirection(1))}
          >
            {rtlDirection === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </Button>
        )}
      </>,
    );

    calendars.push(
      <CalendarMonth
        {...props}
        key={i}
        currentMonth={currentMonth.month}
        direction={direction}
        disableAnimation={disableAnimation}
        startDate={d}
        state={state}
        weekdayStyle={weekdayStyle}
      />,
    );
  }

  const calendarContent = (
    <>
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
    </>
  );

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
      {disableAnimation ? (
        calendarContent
      ) : (
        <ResizablePanel>
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <MotionConfig transition={transition}>
              <LazyMotion features={domAnimation}>{calendarContent}</LazyMotion>
            </MotionConfig>
          </AnimatePresence>
        </ResizablePanel>
      )}
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
      {state.isValueInvalid && (
        <span
          {...errorMessageProps}
          className={slots?.errorMessage({class: classNames?.errorMessage})}
          data-slot="error-message"
        >
          {errorMessage || "The date you selected is invalid. Please select a valid date."}
        </span>
      )}
    </Component>
  );
}
