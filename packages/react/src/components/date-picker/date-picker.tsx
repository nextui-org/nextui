"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {DatePickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {DateValue} from "react-aria-components/Calendar";

import {datePickerVariants} from "@heroui/styles";
import {mergeRefs} from "@react-aria/utils";
import React, {createContext, use, useEffect, useRef} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {
  DatePicker as DatePickerPrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components/DatePicker";
import {OverlayTriggerStateContext} from "react-aria-components/Dialog";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {resolveOverlayOpen, useOverlayExitHold} from "../../utils/use-overlay-exit-hold";
import {IconCalendar} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Context
 * -----------------------------------------------------------------------------------------------*/
type DatePickerContext = {
  slots?: ReturnType<typeof datePickerVariants>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const DatePickerContext = createContext<DatePickerContext>({
  triggerRef: {current: null},
});

/* -------------------------------------------------------------------------------------------------
 * DatePicker Root
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerRootProps<T extends DateValue>
  extends ComponentPropsWithRef<typeof DatePickerPrimitive<T>>, DatePickerVariants {}

const DatePickerRoot = <T extends DateValue>({
  children,
  className,
  onOpenChange,
  ...props
}: DatePickerRootProps<T>) => {
  const slots = React.useMemo(() => datePickerVariants(), []);
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
    <DatePickerContext value={contextValue}>
      <DatePickerPrimitive
        data-required={dataAttr(props.isRequired)}
        data-slot="date-picker"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
        onOpenChange={handleOpenChange}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </DatePickerPrimitive>
    </DatePickerContext>
  );
};

DatePickerRoot.displayName = "HeroUI.DatePicker";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const DatePickerTrigger = ({children, className, ref, ...props}: DatePickerTriggerProps) => {
  const {slots, triggerRef} = use(DatePickerContext);

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
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="date-picker-trigger"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </ButtonPrimitive>
  );
};

DatePickerTrigger.displayName = "HeroUI.DatePicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Trigger Indicator
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerTriggerIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

const DatePickerTriggerIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: DatePickerTriggerIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DatePickerTriggerIndicatorProps<E>>) => {
  const {slots} = use(DatePickerContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.triggerIndicator, className)}
      data-slot="date-picker-trigger-indicator"
      {...(props as any)}
    >
      {children || <IconCalendar />}
    </dom.span>
  );
};

DatePickerTriggerIndicator.displayName = "HeroUI.DatePicker.TriggerIndicator";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Popover
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const DatePickerPopover = ({
  children,
  className,
  defaultOpen,
  isExiting: isExitingProp,
  isOpen,
  placement = "bottom",
  ref,
  ...props
}: DatePickerPopoverProps) => {
  const {slots} = use(DatePickerContext);
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
        className={composeTwRenderProps(className, slots?.popover())}
        data-slot="date-picker-popover"
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

DatePickerPopover.displayName = "HeroUI.DatePicker.Popover";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DatePickerRoot, DatePickerTrigger, DatePickerTriggerIndicator, DatePickerPopover};

export type {
  DatePickerRootProps,
  DatePickerTriggerProps,
  DatePickerTriggerIndicatorProps,
  DatePickerPopoverProps,
};
