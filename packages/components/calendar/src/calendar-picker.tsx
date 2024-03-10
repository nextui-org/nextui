import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@nextui-org/theme";
import type {CalendarDate, DateValue} from "@internationalized/date";

import {useDateFormatter} from "@react-aria/i18n";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useCallback, useRef, forwardRef, useEffect} from "react";
import debounce from "lodash.debounce";
import {areRectsIntersecting} from "@nextui-org/react-utils";
import {RangeValue} from "@react-types/shared";

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

const CalendarPickerItem = forwardRef<HTMLButtonElement, HTMLNextUIProps<"button">>(
  (props, ref) => {
    return <button {...props} ref={ref} />;
  },
);

CalendarPickerItem.displayName = "CalendarPickerItem";

type ItemsRefMap = Map<number, HTMLElement>;
type CalendarPickerListType = "months" | "years";
type CalendarStateValue = CalendarDate & RangeValue<DateValue>;

const EMPTY_ITEMS_OFFSET = 3;
const SCROLL_DEBOUNCE_TIME = 200;

// TODO: Position the highlight element to the initial focused month/year
export function CalendarPicker(props: CalendarPickerProps) {
  const {slots, date, currentMonth, state, classNames} = props;

  const highlightRef = useRef<HTMLDivElement>(null);
  const yearsListRef = useRef<HTMLDivElement>(null);
  const monthsListRef = useRef<HTMLDivElement>(null);

  const monthsItemsRef = useRef<ItemsRefMap>();
  const yearsItemsRef = useRef<ItemsRefMap>();

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

  function getItemsRefMap(itemsRef: React.MutableRefObject<ItemsRefMap | undefined>) {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }

    return itemsRef.current;
  }

  function getItemRef(node: HTMLElement | null, value: number, list: CalendarPickerListType) {
    const map = getItemsRefMap(list === "months" ? monthsItemsRef : yearsItemsRef);

    if (node) {
      map.set(value, node);
    } else {
      map.delete(value);
    }
  }

  const handleListScroll = useCallback(
    (e: Event, highlightEl: HTMLElement | null, list: CalendarPickerListType) => {
      if (!(e.target instanceof HTMLElement)) return;

      const map = getItemsRefMap(list === "months" ? monthsItemsRef : yearsItemsRef);

      const items = Array.from(map.values());

      const item = items.find((itemEl) => {
        const rect1 = itemEl.getBoundingClientRect();
        const rect2 = highlightEl?.getBoundingClientRect();

        if (!rect2) {
          return false;
        }

        return areRectsIntersecting(rect1, rect2);
      });

      const itemValue = Number(item?.getAttribute("data-value"));

      if (!itemValue) return;

      let date = state.focusedDate.set(list === "months" ? {month: itemValue} : {year: itemValue});

      state.setFocusedDate(date);
      state.setValue(date as CalendarStateValue);
    },
    [],
  );

  useEffect(() => {
    // add scroll event listener to monthsListRef
    const monthsList = monthsListRef.current;
    const yearsList = yearsListRef.current;
    const highlightEl = highlightRef.current;

    if (!highlightEl) return;

    const debouncedHandleMonthsScroll = debounce(
      (e: Event) => handleListScroll(e, highlightEl, "months"),
      SCROLL_DEBOUNCE_TIME,
    );
    const debouncedHandleYearsScroll = debounce(
      (e: Event) => handleListScroll(e, highlightEl, "years"),
      SCROLL_DEBOUNCE_TIME,
    );

    monthsList?.addEventListener("scroll", debouncedHandleMonthsScroll);
    yearsList?.addEventListener("scroll", debouncedHandleYearsScroll);

    return () => {
      if (debouncedHandleMonthsScroll) {
        monthsList?.removeEventListener("scroll", debouncedHandleMonthsScroll);
      }
      if (debouncedHandleYearsScroll) {
        yearsList?.removeEventListener("scroll", debouncedHandleYearsScroll);
      }
    };
  }, [handleListScroll]);

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
              key={month.value}
              ref={(node) => getItemRef(node, month.value, "months")}
              className={slots?.pickerItem({class: classNames?.pickerItem})}
              data-slot="picker-item"
              data-value={month.value}
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
              key={year.value}
              ref={(node) => getItemRef(node, year.value, "years")}
              className={slots?.pickerItem({class: classNames?.pickerItem})}
              data-slot="picker-item"
              data-value={year.value}
            >
              {year.label}
            </CalendarPickerItem>
          ))}
        </PickerItemWrapper>
      </div>
    </div>
  );
}
