import type {CalendarDate} from "@internationalized/date";
import type {PressEvent} from "@react-types/shared";

import {useDateFormatter} from "@react-aria/i18n";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useCallback, useEffect, useRef} from "react";
import scrollIntoView from "scroll-into-view-if-needed";

import {getMonthsInYear, getYearRange} from "./utils";
import {useCalendarContext} from "./calendar-context";

export type PickerValue = {
  value: string;
  label: string;
};

export interface CalendarPickerProps extends HTMLNextUIProps<"div"> {
  date: CalendarDate;
  currentMonth: CalendarDate;
}

type ItemsRefMap = Map<number, HTMLElement>;
type CalendarPickerListType = "months" | "years";

export function useCalendarPicker(props: CalendarPickerProps) {
  const {date, currentMonth} = props;

  const {slots, state, headerRef, isHeaderExpanded, setIsHeaderExpanded, classNames} =
    useCalendarContext();

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

  const yearDateFormatter = useDateFormatter({
    year: "numeric",
    timeZone: state.timeZone,
  });

  // Used for the year/month pickers
  const years = getYearRange(state.minValue, state.maxValue)?.map((y) => ({
    value: y.year,
    label: yearDateFormatter.format(y.toDate(state.timeZone)),
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

  // scroll to the selected month/year when the component is mounted/opened/closed
  useEffect(() => {
    if (!isHeaderExpanded) return;

    scrollTo(date.month, "months", false);
    scrollTo(date.year, "years", false);
  }, [isHeaderExpanded]);

  function scrollTo(value: number, list: CalendarPickerListType, smooth = true) {
    const mapListRef = list === "months" ? monthsItemsRef : yearsItemsRef;
    const listRef = list === "months" ? monthsListRef : yearsListRef;

    const map = getItemsRefMap(mapListRef);

    const node = map.get(value);

    if (!node) return;
    let date = state.focusedDate.set(list === "months" ? {month: value} : {year: value});

    state.setFocusedDate(date);

    // scroll picker list to the selected item
    scrollIntoView(node, {
      scrollMode: "always",
      behavior: smooth ? "smooth" : "auto",
      boundary: listRef.current,
    });
  }

  const onPickerItemPressed = useCallback(
    (e: PressEvent, list: CalendarPickerListType) => {
      const target = e.target as HTMLElement;
      const value = Number(target.getAttribute("data-value"));

      if (!value) return;

      scrollTo(value, list);
    },
    [state],
  );

  const onPickerItemKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, value: number, list: CalendarPickerListType) => {
      const map = getItemsRefMap(list === "months" ? monthsItemsRef : yearsItemsRef);

      if (
        [
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End",
          "PageUp",
          "PageDown",
          "Escape",
          "Enter",
          " ",
        ].includes(e.key)
      ) {
        e.preventDefault();
      }

      const node = map.get(value);

      if (!node) return;

      let nextValue = value;

      switch (e.key) {
        case "ArrowDown":
          nextValue = value + 1;
          break;
        case "ArrowUp":
          nextValue = value - 1;
          break;
        case "Home":
          nextValue = 1;
          break;
        case "End":
          nextValue = months.length;
          break;
        case "PageUp":
          nextValue = value - 3;
          break;
        case "PageDown":
          nextValue = value + 3;
          break;
        case "Escape":
        case "Enter":
        case " ":
          setIsHeaderExpanded?.(false);
          headerRef?.current?.focus();

          return;
      }

      const nextItem = map.get(nextValue);

      scrollTo(nextValue, list);

      nextItem?.focus();
    },
    [state],
  );

  const onPickerItemKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, value: number, list: CalendarPickerListType) => {
      const listRef = list === "months" ? monthsListRef : yearsListRef;

      // When the key up events fires we do a safety scroll to the element that fired it.
      // Part of fixing issue #3789
      if (e.currentTarget) {
        scrollIntoView(e.currentTarget, {
          scrollMode: "always",
          behavior: "smooth",
          boundary: listRef.current,
        });
      }
    },
    [state],
  );

  return {
    state,
    slots,
    classNames,
    years,
    months,
    highlightRef,
    monthsListRef,
    yearsListRef,
    getItemRef,
    isHeaderExpanded,
    onPickerItemPressed,
    onPickerItemKeyDown,
    onPickerItemKeyUp,
  };
}

export type UseCalendarPickerReturn = ReturnType<typeof useCalendarPicker>;
