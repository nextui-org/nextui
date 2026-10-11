"use client";

import type {Booleanish} from "../../utils/assertion";
import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {SelectVariants} from "@heroui/styles";
import type {KeyboardEvent as AriaKeyboardEvent} from "@react-types/shared";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {selectVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {OverlayTriggerStateContext} from "react-aria-components/Dialog";
import {Popover as PopoverPrimitive} from "react-aria-components/Popover";
import {
  Select as SelectPrimitive,
  SelectStateContext,
  SelectValue as SelectValuePrimitive,
} from "react-aria-components/Select";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {FieldSlotsGate} from "../../utils/field-slots-gate";
import {resolveOverlayOpen, useOverlayExitHold} from "../../utils/use-overlay-exit-hold";
import {CloseIcon, IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Select Context
 * -----------------------------------------------------------------------------------------------*/
type SelectState = React.ContextType<typeof SelectStateContext>;

type SelectContext = {
  slots?: ReturnType<typeof selectVariants>;
  onClear?: () => void;
  isDisabled?: boolean;
  /**
   * Whether a `Select.ClearButton` is mounted, which enables the trigger's clear
   * shortcut. Read at event time so registration never triggers a re-render.
   */
  hasClearButton?: () => boolean;
  /** Called by `Select.ClearButton` on mount. Returns its own cleanup. */
  registerClearButton?: () => () => void;
};

const SelectContext = createContext<SelectContext>({});

/**
 * Exposes the trigger's resolved disabled state, which accounts for both the root's
 * `isDisabled` and a `Select.Trigger`-level override.
 */
const SelectTriggerContext = createContext<{isDisabled?: boolean}>({});

const isSelectionEmpty = (state: SelectState) =>
  (state?.selectionManager.selectedKeys.size ?? 0) === 0;

const clearSelection = (state: SelectState, onClear?: () => void) => {
  state?.selectionManager.setSelectedKeys(new Set());
  onClear?.();
};

/* -------------------------------------------------------------------------------------------------
 * Select Root
 * -----------------------------------------------------------------------------------------------*/
interface SelectRootProps<T extends object, M extends "single" | "multiple" = "single">
  extends ComponentPropsWithRef<typeof SelectPrimitive<T, M>>, SelectVariants {
  items?: Iterable<T, M>;
  /** Handler that is called when the selection is cleared. */
  onClear?: () => void;
}

const SelectRoot = <T extends object = object, M extends "single" | "multiple" = "single">({
  children,
  className,
  fullWidth,
  isDisabled,
  onClear,
  variant,
  ...props
}: SelectRootProps<T, M>) => {
  const slots = React.useMemo(() => selectVariants({fullWidth, variant}), [fullWidth, variant]);
  const clearButtonCount = React.useRef(0);

  // Counted rather than a boolean so unmounting one clear button cannot switch the
  // shortcut off while another is still mounted.
  const registerClearButton = React.useCallback(() => {
    clearButtonCount.current += 1;

    return () => {
      clearButtonCount.current -= 1;
    };
  }, []);

  const hasClearButton = React.useCallback(() => clearButtonCount.current > 0, []);

  const context = React.useMemo<SelectContext>(
    () => ({hasClearButton, isDisabled, onClear, registerClearButton, slots}),
    [hasClearButton, isDisabled, onClear, registerClearButton, slots],
  );

  return (
    <FieldSlotsGate>
      <SelectContext value={context}>
        <SelectPrimitive
          data-slot="select"
          {...props}
          className={useResolvedClassName(className, slots?.base())}
          isDisabled={isDisabled}
        >
          {children}
        </SelectPrimitive>
      </SelectContext>
    </FieldSlotsGate>
  );
};

SelectRoot.displayName = "HeroUI.Select";

/* -------------------------------------------------------------------------------------------------
 * Select Trigger
 * -----------------------------------------------------------------------------------------------*/
interface SelectTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const SelectTrigger = ({children, className, onKeyDown, ...props}: SelectTriggerProps) => {
  const {hasClearButton, onClear, slots} = use(SelectContext);
  const state = use(SelectStateContext);

  // ARIA treats the children of a button as presentational, so Select.ClearButton can
  // never take focus. This shortcut is the only pointer-free way to clear, and it is
  // gated on a clear button being composed so a plain Select stays non-clearable.
  const handleKeyDown = (e: AriaKeyboardEvent) => {
    onKeyDown?.(e);

    const isClearKey = e.key === "Backspace" || e.key === "Delete";
    const canClear = Boolean(hasClearButton?.()) && !isSelectionEmpty(state);

    if (!isClearKey || !canClear || state?.isOpen) {
      // react-aria's useKeyboard swallows propagation unless a handler opts back in,
      // and the trigger had no keydown handler at all before this shortcut existed.
      e.continuePropagation();

      return;
    }

    e.preventDefault();
    clearSelection(state, onClear);
  };

  return (
    <ButtonPrimitive
      className={useResolvedClassName(className, slots?.trigger())}
      data-slot="select-trigger"
      {...props}
      onKeyDown={handleKeyDown}
    >
      {(values) => (
        <SelectTriggerContext value={{isDisabled: values.isDisabled}}>
          {typeof children === "function" ? children(values) : children}
        </SelectTriggerContext>
      )}
    </ButtonPrimitive>
  );
};

SelectTrigger.displayName = "HeroUI.Select.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Select Value
 * -----------------------------------------------------------------------------------------------*/
interface SelectValueProps extends ComponentPropsWithRef<typeof SelectValuePrimitive> {}

const SelectValue = ({children, className, ...props}: SelectValueProps) => {
  const {slots} = use(SelectContext);

  return (
    <SelectValuePrimitive
      className={useResolvedClassName(className, slots?.value())}
      data-slot="select-value"
      {...props}
    >
      {children}
    </SelectValuePrimitive>
  );
};

SelectValue.displayName = "HeroUI.Select.Value";

/* -------------------------------------------------------------------------------------------------
 * Select Indicator
 * -----------------------------------------------------------------------------------------------*/
interface SelectIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

const SelectIndicator = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: SelectIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SelectIndicatorProps<E>>) => {
  const {slots} = use(SelectContext);
  const state = use(SelectStateContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: "select-indicator";
        "data-open"?: Booleanish;
      }>,
      {
        ...(props as any),
        className: composeSlotClassName(slots?.indicator, className),
        "data-slot": "select-indicator",
        "data-open": dataAttr(state?.isOpen),
      },
    );
  }

  return (
    <IconChevronDown
      className={composeSlotClassName(slots?.indicator, className)}
      data-open={dataAttr(state?.isOpen)}
      data-slot="select-default-indicator"
      {...(props as any)}
    />
  );
};

SelectIndicator.displayName = "HeroUI.Select.Indicator";

/* -------------------------------------------------------------------------------------------------
 * Select Clear Button
 * -----------------------------------------------------------------------------------------------*/
interface SelectClearButtonProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SelectClearButton = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  onClick,
  onPointerDown,
  ...props
}: SelectClearButtonProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SelectClearButtonProps<E>>) => {
  const {isDisabled: rootDisabled, onClear, registerClearButton, slots} = use(SelectContext);
  const {isDisabled: triggerDisabled} = use(SelectTriggerContext);
  const state = use(SelectStateContext);

  const isDisabled = triggerDisabled ?? rootDisabled ?? false;
  const isEmpty = isSelectionEmpty(state);

  // Opts the trigger into the Backspace/Delete shortcut, which is how keyboard and
  // screen reader users clear. See SelectTrigger.
  React.useEffect(() => registerClearButton?.(), [registerClearButton]);

  const handlePointerDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    // Select.Trigger is a <button>, and nesting a <button> in one is invalid HTML, so
    // this control is a span. Keep the press off the trigger so the menu stays closed.
    // The default is left intact so focus still lands on the trigger, which is where
    // the clear shortcut lives.
    e.stopPropagation();
    onPointerDown?.(e as any);
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Clearing happens here rather than on pointer down so that only a primary-button
    // click clears; `pointerdown` also fires for secondary and middle buttons.
    if (!isDisabled && !isEmpty) {
      clearSelection(state, onClear);
    }

    onClick?.(e as any);
  };

  return (
    <dom.span
      aria-hidden
      className={slots?.clearButton({className})}
      data-empty={dataAttr(isEmpty)}
      data-slot="select-clear-button"
      {...(props as any)}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
    >
      {children ?? <CloseIcon data-slot="select-clear-button-icon" />}
    </dom.span>
  );
};

SelectClearButton.displayName = "HeroUI.Select.ClearButton";

/* -------------------------------------------------------------------------------------------------
 * Select Popover
 * -----------------------------------------------------------------------------------------------*/
interface SelectPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const SelectPopover = ({
  children,
  className,
  defaultOpen,
  isExiting: isExitingProp,
  isOpen,
  placement = "bottom",
  ref,
  ...props
}: SelectPopoverProps) => {
  const {slots} = use(SelectContext);
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
        data-slot="select-popover"
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

SelectPopover.displayName = "HeroUI.Select.Popover";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SelectRoot, SelectTrigger, SelectValue, SelectIndicator, SelectClearButton, SelectPopover};

export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIndicatorProps,
  SelectClearButtonProps,
  SelectPopoverProps,
};
