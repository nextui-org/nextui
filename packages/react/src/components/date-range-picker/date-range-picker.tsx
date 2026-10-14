"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {DateRangePickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {DateValue} from "react-aria-components/Calendar";

import {dateRangePickerVariants} from "@heroui/styles";
import {mergeRefs} from "@react-aria/utils";
import React, {createContext, use, useEffect, useRef} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {
  DateRangePicker as DateRangePickerPrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components/DateRangePicker";
import {OverlayTriggerStateContext} from "react-aria-components/Dialog";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {resolveOverlayOpen, useOverlayExitHold} from "../../utils/use-overlay-exit-hold";
import {IconCalendar} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Context
 * -----------------------------------------------------------------------------------------------*/
type DateRangePickerContext = {
  slots?: ReturnType<typeof dateRangePickerVariants>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const DateRangePickerContext = createContext<DateRangePickerContext>({
  triggerRef: {current: null},
});

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Root
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerRootProps<T extends DateValue>
  extends ComponentPropsWithRef<typeof DateRangePickerPrimitive<T>>, DateRangePickerVariants {}

const DateRangePickerRoot = <T extends DateValue>({
  children,
  className,
  onOpenChange,
  ...props
}: DateRangePickerRootProps<T>) => {
  const slots = React.useMemo(() => dateRangePickerVariants(), []);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const shouldRestoreFocusToTriggerRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey && !event.altKey) {
        shouldRestoreFocusToTriggerRef.current = true;
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, [isOpen]);

  const handleOpenChange = (nextIsOpen: boolean) => {
    setIsOpen(nextIsOpen);

    if (!nextIsOpen && shouldRestoreFocusToTriggerRef.current) {
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }

    shouldRestoreFocusToTriggerRef.current = false;
    onOpenChange?.(nextIsOpen);
  };

  const contextValue = React.useMemo(() => ({slots, triggerRef}), [slots, triggerRef]);

  return (
    <DateRangePickerContext value={contextValue}>
      <DateRangePickerPrimitive
        data-required={dataAttr(props.isRequired)}
        data-slot="date-range-picker"
        {...props}
        className={useResolvedClassName(className, slots?.base())}
        onOpenChange={handleOpenChange}
      >
        {children}
      </DateRangePickerPrimitive>
    </DateRangePickerContext>
  );
};

DateRangePickerRoot.displayName = "HeroUI.DateRangePicker";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const DateRangePickerTrigger = ({
  children,
  className,
  ref,
  ...props
}: DateRangePickerTriggerProps) => {
  const {slots, triggerRef} = use(DateRangePickerContext);

  const contextRefCallback = React.useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
    },
    [triggerRef],
  );
  const mergedRef = React.useMemo(
    () => mergeRefs(contextRefCallback, ref),
    [contextRefCallback, ref],
  );

  return (
    <ButtonPrimitive
      ref={mergedRef}
      className={useResolvedClassName(className, slots?.trigger())}
      data-slot="date-range-picker-trigger"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

DateRangePickerTrigger.displayName = "HeroUI.DateRangePicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Trigger Indicator
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerTriggerIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

const DateRangePickerTriggerIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: DateRangePickerTriggerIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DateRangePickerTriggerIndicatorProps<E>>) => {
  const {slots} = use(DateRangePickerContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.triggerIndicator, className)}
      data-slot="date-range-picker-trigger-indicator"
      {...(props as any)}
    >
      {children || <IconCalendar />}
    </dom.span>
  );
};

DateRangePickerTriggerIndicator.displayName = "HeroUI.DateRangePicker.TriggerIndicator";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Range Separator
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerRangeSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DateRangePickerRangeSeparator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children = " - ",
  className,
  ...props
}: DateRangePickerRangeSeparatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DateRangePickerRangeSeparatorProps<E>>) => {
  const {slots} = use(DateRangePickerContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.rangeSeparator, className)}
      data-slot="date-range-picker-range-separator"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

DateRangePickerRangeSeparator.displayName = "HeroUI.DateRangePicker.RangeSeparator";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Popover
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const DateRangePickerPopover = ({
  children,
  className,
  defaultOpen,
  isExiting: isExitingProp,
  isOpen,
  placement = "bottom",
  ref,
  ...props
}: DateRangePickerPopoverProps) => {
  const {slots} = use(DateRangePickerContext);
  const overlayState = use(OverlayTriggerStateContext);
  const {isExiting, ref: overlayRef} = useOverlayExitHold(
    resolveOverlayOpen(isOpen, defaultOpen, overlayState),
    {ref},
  );

  return (
    <SurfaceContext
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <PopoverPrimitive
        {...props}
        ref={overlayRef}
        className={useResolvedClassName(className, slots?.popover())}
        data-slot="date-range-picker-popover"
        defaultOpen={defaultOpen}
        isExiting={isExiting || isExitingProp}
        isOpen={isOpen}
        placement={placement}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
};

DateRangePickerPopover.displayName = "HeroUI.DateRangePicker.Popover";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DateRangePickerRoot,
  DateRangePickerTrigger,
  DateRangePickerTriggerIndicator,
  DateRangePickerRangeSeparator,
  DateRangePickerPopover,
};

export type {
  DateRangePickerRootProps,
  DateRangePickerTriggerProps,
  DateRangePickerTriggerIndicatorProps,
  DateRangePickerRangeSeparatorProps,
  DateRangePickerPopoverProps,
};
