"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {CalendarYearPickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {CalendarHeadingProps, CalendarYearPickerProps} from "react-aria/useCalendar";

import {calendarYearPickerVariants} from "@heroui/styles";
import React from "react";
import {useCalendarHeading, useCalendarYearPicker} from "react-aria/useCalendar";
import {Button as ButtonPrimitive} from "react-aria-components/Button";

import {getYearRange} from "../../utils/calendar";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconChevronRight} from "../icons";

import {useCalendarOrRangeState} from "./use-calendar-state";
import {useYearPicker} from "./year-picker-context";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerTrigger
 *
 * Replaces Calendar.Heading. Shows "Month Year" with a chevron that rotates
 * when the year picker is open.  Toggles isYearPickerOpen from CalendarBaseContext.
 * -----------------------------------------------------------------------------------------------*/
interface CalendarYearPickerTriggerProps
  extends
    Omit<ComponentPropsWithRef<typeof ButtonPrimitive>, "children">,
    CalendarYearPickerVariants {
  children: React.ReactNode | ((values: CalendarYearPickerTriggerRenderProps) => React.ReactNode);
}

interface CalendarYearPickerTriggerRenderProps {
  isOpen: boolean;
  monthYear: string;
  toggle: () => void;
}

interface CalendarYearPickerTriggerHeadingProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
>
  extends
    DOMRenderProps<E, undefined>,
    CalendarYearPickerVariants,
    Pick<CalendarHeadingProps, "offset" | "format"> {
  children?: ReactNode | ((values: CalendarYearPickerTriggerRenderProps) => ReactNode);
  className?: string;
}

interface CalendarYearPickerTriggerIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
>
  extends DOMRenderProps<E, undefined>, CalendarYearPickerVariants {
  children?: ReactNode | ((values: CalendarYearPickerTriggerRenderProps) => ReactNode);
  className?: string;
}

interface CalendarYearPickerTriggerContextValue extends CalendarYearPickerTriggerRenderProps {
  slots: ReturnType<typeof calendarYearPickerVariants>;
}

const CalendarYearPickerTriggerContext =
  React.createContext<CalendarYearPickerTriggerContextValue | null>(null);

function useCalendarYearPickerTriggerContext(): CalendarYearPickerTriggerContextValue {
  const context = React.use(CalendarYearPickerTriggerContext);

  if (!context) {
    throw new Error(
      "CalendarYearPicker trigger components must be used within <CalendarYearPicker.Trigger>.",
    );
  }

  return context;
}

const CalendarYearPickerTrigger = ({
  children,
  className,
  onKeyDown,
  onPress,
  ...props
}: CalendarYearPickerTriggerProps) => {
  const {isYearPickerOpen, setIsYearPickerOpen} = useYearPicker();
  const state = useCalendarOrRangeState();
  const monthYear = useCalendarHeading({}, state);

  const slots = React.useMemo(() => calendarYearPickerVariants(), []);

  const handleToggle = React.useCallback(() => {
    setIsYearPickerOpen(!isYearPickerOpen);
  }, [isYearPickerOpen, setIsYearPickerOpen]);

  const handleKeyDown = (
    e: Parameters<NonNullable<CalendarYearPickerTriggerProps["onKeyDown"]>>[0],
  ) => {
    onKeyDown?.(e);

    if (e.defaultPrevented) {
      return;
    }

    if (e.key === "Escape" && isYearPickerOpen) {
      e.preventDefault();
      setIsYearPickerOpen(false);
    }
  };

  const values: CalendarYearPickerTriggerRenderProps = React.useMemo(
    () => ({
      isOpen: isYearPickerOpen,
      monthYear,
      toggle: handleToggle,
    }),
    [handleToggle, isYearPickerOpen, monthYear],
  );

  const contextValue = React.useMemo(
    () => ({
      ...values,
      slots,
    }),
    [slots, values],
  );

  return (
    <CalendarYearPickerTriggerContext value={contextValue}>
      <ButtonPrimitive
        aria-expanded={isYearPickerOpen}
        aria-label={`${monthYear}, year selector`}
        className={useResolvedClassName(className, slots.trigger())}
        data-open={isYearPickerOpen || undefined}
        data-slot="calendar-year-picker-trigger"
        slot={null}
        onKeyDown={handleKeyDown}
        onPress={(event) => {
          onPress?.(event);
          handleToggle();
        }}
        {...props}
      >
        {typeof children === "function" ? children(values) : children}
      </ButtonPrimitive>
    </CalendarYearPickerTriggerContext>
  );
};

CalendarYearPickerTrigger.displayName = "HeroUI.CalendarYearPicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerTriggerHeading
 * -----------------------------------------------------------------------------------------------*/
const CalendarYearPickerTriggerHeading = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  format,
  offset,
  ...props
}: CalendarYearPickerTriggerHeadingProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CalendarYearPickerTriggerHeadingProps<E>>) => {
  const {monthYear, slots, ...values} = useCalendarYearPickerTriggerContext();
  const state = useCalendarOrRangeState();
  const heading = useCalendarHeading({format, offset}, state);

  return (
    <dom.span
      className={composeSlotClassName(slots.triggerHeading, className)}
      data-slot="calendar-year-picker-trigger-heading"
      {...(props as any)}
    >
      {typeof children === "function" ? children({monthYear, ...values}) : children || heading}
    </dom.span>
  );
};

CalendarYearPickerTriggerHeading.displayName = "HeroUI.CalendarYearPicker.TriggerHeading";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerTriggerIndicator
 * -----------------------------------------------------------------------------------------------*/
const CalendarYearPickerTriggerIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: CalendarYearPickerTriggerIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CalendarYearPickerTriggerIndicatorProps<E>>) => {
  const {monthYear, slots, ...values} = useCalendarYearPickerTriggerContext();

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots.triggerIndicator, className)}
      data-slot="calendar-year-picker-trigger-indicator"
      {...(props as any)}
    >
      {typeof children === "function"
        ? children({monthYear, ...values})
        : children || <IconChevronRight height="1em" width="1em" />}
    </dom.span>
  );
};

CalendarYearPickerTriggerIndicator.displayName = "HeroUI.CalendarYearPicker.TriggerIndicator";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerGrid
 *
 * Renders a 3-column grid of year buttons. Hidden via CSS opacity when closed,
 * visible when data-open="true".  tabIndex is toggled so only the active view
 * receives keyboard focus.
 * -----------------------------------------------------------------------------------------------*/
interface CalendarYearPickerGridProps<E extends keyof React.JSX.IntrinsicElements = "div">
  extends
    DOMRenderProps<E, undefined>,
    CalendarYearPickerVariants,
    Pick<CalendarYearPickerProps, "format" | "visibleYears"> {
  children?: ReactNode;
  className?: string;
}

interface CalendarYearPickerCellRenderProps {
  year: number;
  formattedYear: string;
  isSelected: boolean;
  isCurrentYear: boolean;
  isOpen: boolean;
  selectYear: () => void;
}

interface CalendarYearPickerGridBodyProps {
  children?: (values: CalendarYearPickerCellRenderProps) => React.ReactNode;
}

interface CalendarYearPickerCellProps
  extends
    Omit<ComponentPropsWithRef<typeof ButtonPrimitive>, "children">,
    CalendarYearPickerVariants {
  year: number;
  children?: React.ReactNode | ((values: CalendarYearPickerCellRenderProps) => React.ReactNode);
}

interface CalendarYearPickerGridContextValue {
  slots: ReturnType<typeof calendarYearPickerVariants>;
  isYearPickerOpen: boolean;
  activeYear: number;
  currentYear: number;
  focusedYear: number;
  years: number[];
  getFormattedYear: (year: number) => string;
  selectYear: (year: number) => void;
  setActiveYear: (year: number) => void;
}

const CalendarYearPickerGridContext =
  React.createContext<CalendarYearPickerGridContextValue | null>(null);

function useCalendarYearPickerGridContext(): CalendarYearPickerGridContextValue {
  const context = React.use(CalendarYearPickerGridContext);

  if (!context) {
    throw new Error("CalendarYearPicker components must be used within <CalendarYearPicker.Grid>.");
  }

  return context;
}

const CalendarYearPickerGrid = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  format,
  onKeyDown,
  visibleYears: visibleYearsProp,
  ...props
}: CalendarYearPickerGridProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CalendarYearPickerGridProps<E>>) => {
  const {calendarGridSlot, calendarRef, isYearPickerOpen, setIsYearPickerOpen} = useYearPicker();
  const state = useCalendarOrRangeState();
  const gridRef = React.useRef<HTMLDivElement>(null);

  const slots = React.useMemo(() => calendarYearPickerVariants(), []);

  const visibleYears = React.useMemo(() => {
    if (visibleYearsProp != null) {
      return visibleYearsProp;
    }

    if (!state.minValue || !state.maxValue) {
      return 20;
    }

    return getYearRange(state.minValue, state.maxValue).length;
  }, [state.maxValue, state.minValue, visibleYearsProp]);

  const {
    "aria-label": yearGridAriaLabel,
    items,
    onChange,
    value: focusedItemId,
  } = useCalendarYearPicker({format, visibleYears}, state);

  // useCalendarYearPicker returns a new `items` array every render — derive a stable
  // key so effects don't re-run and steal focus back to the selected year.
  const itemsKey = items.map((item) => `${item.id}:${item.date.year}`).join("|");

  // `item.formatted` depends on locale, time zone and the `format` prop, none of which
  // `itemsKey` encodes — so anything serving `formatted` needs its own key, or it keeps
  // rendering year labels in the previous format. Kept separate from `itemsKey` so a
  // locale change cannot perturb the focus effects below.
  const labelsKey = items.map((item) => item.formatted).join("|");

  // Keyed on `itemsKey` rather than `items` because `items` is a fresh array every
  // render; `itemsKey` captures the same content with a stable identity. Without this
  // the effects below re-run on every render and steal focus back to the selected year.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const years = React.useMemo(() => items.map((item) => item.date.year), [itemsKey]);
  const itemByYear = React.useMemo(
    () => new Map(items.map((item) => [item.date.year, item])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemsKey, labelsKey],
  );
  const focusedYear = items[focusedItemId as number]?.date.year ?? state.focusedDate.year;

  const getFormattedYear = React.useCallback(
    (year: number) => itemByYear.get(year)?.formatted ?? String(year),
    [itemByYear],
  );

  const [activeYear, setActiveYear] = React.useState(focusedYear);

  if (isYearPickerOpen && years.length > 0 && !years.includes(activeYear)) {
    setActiveYear(years[0]!);
  }
  const wasYearPickerOpenRef = React.useRef(false);

  // Position the year grid to overlay the day grid
  React.useEffect(() => {
    const yearGrid = gridRef.current;

    if (!yearGrid) return;

    const calendar = calendarRef.current;
    const calendarGrid = calendar?.querySelector(
      `[data-slot='${calendarGridSlot}']`,
    ) as HTMLElement | null;

    if (calendarGrid) {
      yearGrid.style.top = `${calendarGrid.offsetTop}px`;
      yearGrid.style.height = `${calendarGrid.offsetHeight}px`;
    }
  }, [calendarGridSlot, calendarRef, state.focusedDate]);

  const focusYearCell = React.useCallback((year: number) => {
    const yearGrid = gridRef.current;

    if (!yearGrid) return;

    const yearCell = yearGrid.querySelector<HTMLElement>(`[data-year='${year}']`);

    if (yearCell) {
      yearCell.focus();
    }
  }, []);

  // Anchor keyboard focus to the selected year only when the picker opens — not on
  // every render while open (items from useCalendarYearPicker is unstable).
  React.useEffect(() => {
    const justOpened = isYearPickerOpen && !wasYearPickerOpenRef.current;

    wasYearPickerOpenRef.current = isYearPickerOpen;

    if (!justOpened || years.length === 0) return;

    const [firstYear] = years;

    if (firstYear == null) return;

    const nextActiveYear = years.includes(focusedYear) ? focusedYear : firstYear;

    const rafId = requestAnimationFrame(() => {
      setActiveYear(nextActiveYear);
      focusYearCell(nextActiveYear);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [focusYearCell, focusedYear, isYearPickerOpen, itemsKey, years]);

  const handleYearSelect = React.useCallback(
    (year: number) => {
      const item = itemByYear.get(year);

      if (item == null) {
        return;
      }

      setIsYearPickerOpen(false);
      onChange(item.id);
    },
    [itemByYear, onChange, setIsYearPickerOpen],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    (onKeyDown as React.KeyboardEventHandler<HTMLDivElement>)?.(e);

    if (e.defaultPrevented) {
      return;
    }

    if (e.key === "Escape" && isYearPickerOpen) {
      e.preventDefault();
      setIsYearPickerOpen(false);

      return;
    }

    if (!isYearPickerOpen || years.length === 0) {
      return;
    }

    const currentIndex = years.indexOf(activeYear);

    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = Math.min(currentIndex + 1, years.length - 1);
        break;
      case "ArrowLeft":
        nextIndex = Math.max(currentIndex - 1, 0);
        break;
      case "ArrowDown":
        nextIndex = Math.min(currentIndex + 3, years.length - 1);
        break;
      case "ArrowUp":
        nextIndex = Math.max(currentIndex - 3, 0);
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = years.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      const nextYear = years[nextIndex];

      if (nextYear == null) return;

      e.preventDefault();
      setActiveYear(nextYear);
      focusYearCell(nextYear);
    }
  };

  // Hoisted out of the cells so a grid renders one Date instead of one per year, and
  // read per render rather than memoized on [] so it stays correct across midnight on
  // Dec 31. It's a number, so the context memo below still compares it by value.
  const currentYear = new Date().getFullYear();

  const contextValue = React.useMemo(
    () => ({
      activeYear,
      currentYear,
      focusedYear,
      getFormattedYear,
      isYearPickerOpen,
      selectYear: handleYearSelect,
      setActiveYear,
      slots,
      years,
    }),
    [
      activeYear,
      currentYear,
      focusedYear,
      getFormattedYear,
      handleYearSelect,
      isYearPickerOpen,
      slots,
      years,
    ],
  );

  return (
    <CalendarYearPickerGridContext value={contextValue}>
      <dom.div
        ref={gridRef}
        aria-hidden={!isYearPickerOpen}
        aria-label={yearGridAriaLabel}
        className={composeSlotClassName(slots.yearGrid, className)}
        data-open={isYearPickerOpen || undefined}
        data-slot="calendar-year-picker-grid"
        role="listbox"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        {...(props as any)}
      >
        {children}
      </dom.div>
    </CalendarYearPickerGridContext>
  );
};

CalendarYearPickerGrid.displayName = "HeroUI.CalendarYearPicker.Grid";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerGridBody
 * -----------------------------------------------------------------------------------------------*/
const CalendarYearPickerGridBody = ({children}: CalendarYearPickerGridBodyProps) => {
  const {currentYear, focusedYear, getFormattedYear, isYearPickerOpen, selectYear, years} =
    useCalendarYearPickerGridContext();

  return (
    <>
      {years.map((year) => {
        const isSelected = year === focusedYear;
        const formattedYear = getFormattedYear(year);
        const values: CalendarYearPickerCellRenderProps = {
          formattedYear,
          isCurrentYear: year === currentYear,
          isOpen: isYearPickerOpen,
          isSelected,
          selectYear: () => selectYear(year),
          year,
        };

        return (
          <React.Fragment key={year}>
            {typeof children === "function" ? (
              children(values)
            ) : (
              <CalendarYearPickerCell year={year} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

CalendarYearPickerGridBody.displayName = "HeroUI.CalendarYearPicker.GridBody";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerCell
 * -----------------------------------------------------------------------------------------------*/
const CalendarYearPickerCell = ({
  children,
  className,
  excludeFromTabOrder,
  onFocus,
  onPress,
  year,
  ...props
}: CalendarYearPickerCellProps) => {
  const {
    activeYear,
    currentYear,
    focusedYear,
    getFormattedYear,
    isYearPickerOpen,
    selectYear,
    setActiveYear,
    slots,
  } = useCalendarYearPickerGridContext();
  const isSelected = year === focusedYear;
  const isActive = year === activeYear;
  const formattedYear = getFormattedYear(year);
  const values: CalendarYearPickerCellRenderProps = {
    formattedYear,
    isCurrentYear: year === currentYear,
    isOpen: isYearPickerOpen,
    isSelected,
    selectYear: () => selectYear(year),
    year,
  };

  return (
    <ButtonPrimitive
      aria-label={formattedYear}
      aria-selected={isSelected}
      className={useResolvedClassName(className, slots.yearCell())}
      data-selected={isSelected || undefined}
      data-slot="calendar-year-picker-year-cell"
      data-year={year}
      excludeFromTabOrder={excludeFromTabOrder ?? !(isYearPickerOpen && isActive)}
      slot={null}
      onFocus={(event) => {
        onFocus?.(event);
        setActiveYear(year);
      }}
      onPress={(event) => {
        onPress?.(event);
        selectYear(year);
      }}
      {...props}
    >
      {typeof children === "function" ? children(values) : children || formattedYear}
    </ButtonPrimitive>
  );
};

CalendarYearPickerCell.displayName = "HeroUI.CalendarYearPicker.Cell";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  CalendarYearPickerTrigger,
  CalendarYearPickerTriggerHeading,
  CalendarYearPickerTriggerIndicator,
  CalendarYearPickerGrid,
  CalendarYearPickerGridBody,
  CalendarYearPickerCell,
};
export type {
  CalendarYearPickerTriggerProps,
  CalendarYearPickerTriggerHeadingProps,
  CalendarYearPickerTriggerIndicatorProps,
  CalendarYearPickerTriggerRenderProps,
  CalendarYearPickerGridProps,
  CalendarYearPickerGridBodyProps,
  CalendarYearPickerCellProps,
  CalendarYearPickerCellRenderProps,
};
