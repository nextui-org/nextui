import type {CalendarDate} from "@internationalized/date";
import type {PressEvent} from "@react-types/shared";

import {useDateFormatter} from "@react-aria/i18n";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useCallback, useEffect, useRef} from "react";
import scrollIntoView from "scroll-into-view-if-needed";

import {getMonthsInYear, getYearRange} from "./utils";
import {useCalendarContext} from "./calendar-context";
import useScrollEndCallback from "./use-scroll-end-callback";
import {useKeyRepeatBlocker} from "./use-key-repeat-blocker";

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

const DEFAULT_BOUNDARY_VALUE = {
  max: {months: 12, years: 2099},
  min: {months: 1, years: 1900},
} as const;

const LISTENED_NAVIGATION_KEYS = [
  "ArrowDown",
  "ArrowUp",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "Escape",
  "Enter",
  " ",
];

const OF_100_MILLISECONDS = 100;

const HOME_AND_END_NEED_DEFERRED_FOCUS = ["Home", "End"];

function needsDeferredFocus(e: React.KeyboardEvent<HTMLElement>) {
  return HOME_AND_END_NEED_DEFERRED_FOCUS.includes(e.key);
}

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

  const {onScrollEnd, abortRef} = useScrollEndCallback(OF_100_MILLISECONDS);
  const {handleKeyDown, handleKeyUp, isKeyDown} = useKeyRepeatBlocker(
    HOME_AND_END_NEED_DEFERRED_FOCUS,
  );

  // Destructure before useCallback to ring-fence the dependency
  const {maxValue, minValue} = state;

  const getBoundaryValue = useCallback(
    (list: CalendarPickerListType, bound: "min" | "max") => {
      let boundaryDate = bound === "min" ? minValue : maxValue;
      const fromState = list === "months" ? boundaryDate?.month : boundaryDate?.year;

      return fromState ?? DEFAULT_BOUNDARY_VALUE[bound][list];
    },
    [minValue, maxValue],
  );

  const onPickerItemKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, value: number, list: CalendarPickerListType) => {
      const map = getItemsRefMap(list === "months" ? monthsItemsRef : yearsItemsRef);

      if (LISTENED_NAVIGATION_KEYS.includes(e.key)) {
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
          nextValue = getBoundaryValue(list, "min");
          break;
        case "End":
          nextValue = getBoundaryValue(list, "max");
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

      if (needsDeferredFocus(e)) {
        if (!isKeyDown(e.key)) {
          scrollTo(nextValue, list);
          if (abortRef.current) {
            abortRef.current();
          }
          onScrollEnd(list === "months" ? monthsListRef.current : yearsListRef.current, () => {
            nextItem?.focus();
          });
          handleKeyDown(e.key);
        }
      } else {
        scrollTo(nextValue, list);
        if (abortRef.current) {
          abortRef.current();
        }
        nextItem?.focus();
      }
    },
    [state, handleKeyDown, isKeyDown],
  );

  const onPickerItemKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, value: number, list: CalendarPickerListType) => {
      const listRef = list === "months" ? monthsListRef : yearsListRef;

      if (LISTENED_NAVIGATION_KEYS.includes(e.key)) {
        e.preventDefault();
      }

      // When the key up events fires we do a safety scroll to the element that fired it.
      // Part of fixing issue #3789
      if (e.currentTarget) {
        if (needsDeferredFocus(e)) {
          handleKeyUp(e.key);
        } else {
          scrollIntoView(e.currentTarget, {
            scrollMode: "always",
            behavior: "smooth",
            boundary: listRef.current,
          });
        }
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
