import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {AriaCalendarGridProps} from "@react-aria/calendar";
import type {RefObject, HTMLAttributes, ReactNode} from "react";
import type {AriaButtonProps} from "@react-types/button";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";
import type {As, HTMLNextUIProps} from "@nextui-org/system";
import type {ButtonProps} from "@nextui-org/button";

import {useState} from "react";
import {useLocale} from "@react-aria/i18n";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {Button} from "@nextui-org/button";
import {chain, mergeProps} from "@react-aria/utils";
import {AnimatePresence, LazyMotion, domAnimation, MotionConfig} from "framer-motion";
import {ResizablePanel} from "@nextui-org/framer-utils";

import {ChevronLeftIcon} from "./chevron-left";
import {ChevronRightIcon} from "./chevron-right";
import {CalendarMonth} from "./calendar-month";
import {transition} from "./calendar-transitions";
import {CalendarHeader} from "./calendar-header";
import {CalendarPicker} from "./calendar-picker";

export interface CalendarBaseProps<T extends CalendarState | RangeCalendarState>
  extends HTMLNextUIProps<"div"> {
  state: T;
  isPickerVisible?: boolean;
  calendarProps: HTMLAttributes<HTMLElement>;
  nextButtonProps: AriaButtonProps;
  prevButtonProps: AriaButtonProps;
  buttonPickerProps?: ButtonProps;
  errorMessageProps: HTMLAttributes<HTMLElement>;
  calendarRef: RefObject<HTMLDivElement>;
  slots?: CalendarReturnType;
  Component?: As;
  visibleMonths?: number;
  errorMessage?: ReactNode;
  weekdayStyle?: AriaCalendarGridProps["weekdayStyle"];
  showMonthAndYearPickers?: boolean;
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
    buttonPickerProps,
    errorMessageProps,
    calendarRef: ref,
    classNames,
    weekdayStyle,
    disableAnimation,
    isPickerVisible,
    showMonthAndYearPickers,
    visibleMonths = 1,
    errorMessage,
    ...otherProps
  } = props;

  const [direction, setDirection] = useState<number>(0);

  const {direction: rtlDirection} = useLocale();

  const currentMonth = state.visibleRange.start;

  const headers = [];
  const calendars = [];

  // TODO: Send this part to a separated component so we can
  // control the header expanded state separately per calendar
  // and only show the pickers for the selected calendar
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
        <CalendarHeader
          buttonPickerProps={buttonPickerProps}
          classNames={classNames}
          currentMonth={currentMonth}
          date={d}
          direction={direction}
          disableAnimation={disableAnimation}
          isPickerVisible={isPickerVisible}
          showMonthAndYearPickers={showMonthAndYearPickers}
          slots={slots}
          state={state}
        />
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

    const calendarMonthContent = (
      <CalendarMonth
        {...props}
        key={i}
        currentMonth={currentMonth.month}
        direction={direction}
        disableAnimation={disableAnimation}
        startDate={d}
        state={state}
        weekdayStyle={weekdayStyle}
      />
    );

    calendars.push(
      showMonthAndYearPickers ? (
        <>
          {calendarMonthContent}
          <CalendarPicker
            classNames={classNames}
            currentMonth={currentMonth}
            date={d}
            disableAnimation={disableAnimation}
            slots={slots}
            state={state}
          />
        </>
      ) : (
        calendarMonthContent
      ),
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
        <div
          className={slots?.helperWrapper({class: classNames?.helperWrapper})}
          data-slot="helper-wrapper"
        >
          <span
            {...errorMessageProps}
            className={slots?.errorMessage({class: classNames?.errorMessage})}
            data-slot="error-message"
          >
            {errorMessage || "The date you selected is invalid. Please select a valid date."}
          </span>
        </div>
      )}
    </Component>
  );
}
