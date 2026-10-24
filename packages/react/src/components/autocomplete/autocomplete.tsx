"use client";

import type {Booleanish} from "../../utils/assertion";
import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {AutocompleteVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode, RefObject} from "react";

import {autocompleteVariants} from "@heroui/styles";
import {mergeRefs, useResizeObserver} from "@react-aria/utils";
import React, {createContext, use, useCallback, useRef, useState} from "react";
import {useIsHidden} from "react-aria/private/collections/Hidden";
import {Autocomplete as AutocompletePrimitive} from "react-aria-components/Autocomplete";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {Group as GroupPrimitive} from "react-aria-components/Group";
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
import {usePopoverExitHold} from "../../utils/use-popover-exit-hold";
import {CloseIcon, IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Context
 * -----------------------------------------------------------------------------------------------*/
type AutocompleteContext = {
  slots?: ReturnType<typeof autocompleteVariants>;
  onClear?: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  clearButtonRef: RefObject<HTMLButtonElement | null>;
  isDisabled?: boolean;
};

const AutocompleteContext = createContext<AutocompleteContext>({
  triggerRef: {current: null} as RefObject<HTMLElement | null>,
  clearButtonRef: {current: null} as RefObject<HTMLButtonElement | null>,
  isDisabled: false,
});

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Root
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteRootProps<T extends object, M extends "single" | "multiple" = "single">
  extends ComponentPropsWithRef<typeof SelectPrimitive<T, M>>, AutocompleteVariants {
  items?: Iterable<T, M>;
  // Handler that is called when the clear button is pressed.
  onClear?: () => void;
}

const AutocompleteRoot = <T extends object = object, M extends "single" | "multiple" = "single">({
  children,
  className,
  fullWidth,
  isDisabled,
  onClear,
  variant,
  ...props
}: AutocompleteRootProps<T, M>) => {
  const slots = React.useMemo(
    () => autocompleteVariants({fullWidth, variant}),
    [fullWidth, variant],
  );
  const triggerRef = useRef<HTMLElement | null>(null);
  const clearButtonRef = useRef<HTMLButtonElement | null>(null);

  const context = React.useMemo<AutocompleteContext>(
    () => ({slots, triggerRef, clearButtonRef, onClear, isDisabled}),
    [slots, onClear, isDisabled],
  );

  return (
    <FieldSlotsGate>
      <AutocompleteContext value={context}>
        <SelectPrimitive
          data-slot="autocomplete"
          {...props}
          className={useResolvedClassName(className, slots?.base())}
          isDisabled={isDisabled}
        >
          {children}
        </SelectPrimitive>
      </AutocompleteContext>
    </FieldSlotsGate>
  );
};

AutocompleteRoot.displayName = "HeroUI.Autocomplete";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Trigger
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteTriggerProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const AutocompleteTrigger = ({
  children,
  className,
  isDisabled: isDisabledProp,
  onClick,
  ref,
  ...props
}: AutocompleteTriggerProps) => {
  const {clearButtonRef, isDisabled: rootDisabled, slots, triggerRef} = use(AutocompleteContext);
  const state = use(SelectStateContext);
  const isDisabled = isDisabledProp ?? rootDisabled ?? false;
  const isHidden = useIsHidden();

  // Callback ref to update context ref
  const contextRefCallback = React.useCallback(
    (node: HTMLDivElement | null) => {
      triggerRef.current = node;
    },
    [triggerRef],
  );

  // Merge context ref callback with user-provided ref
  const mergedRef = React.useMemo(
    () => mergeRefs(contextRefCallback, ref),
    [contextRefCallback, ref],
  );
  const resolvedClassName = useResolvedClassName(className, slots?.trigger());

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't toggle if clicking the clear button
    if (clearButtonRef.current?.contains(e.target as Node)) {
      return;
    }
    onClick?.(e);
    state?.toggle();
  };

  if (isHidden) {
    return null;
  }

  return (
    <GroupPrimitive
      ref={mergedRef}
      className={resolvedClassName}
      data-slot="autocomplete-trigger"
      isDisabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </GroupPrimitive>
  );
};

AutocompleteTrigger.displayName = "HeroUI.Autocomplete.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Value
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteValueProps extends ComponentPropsWithRef<typeof SelectValuePrimitive> {}

const AutocompleteValue = ({children, className, ...props}: AutocompleteValueProps) => {
  const {slots} = use(AutocompleteContext);

  return (
    <SelectValuePrimitive
      className={useResolvedClassName(className, slots?.value())}
      data-slot="autocomplete-value"
      {...props}
    >
      {children}
    </SelectValuePrimitive>
  );
};

AutocompleteValue.displayName = "HeroUI.Autocomplete.Value";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Indicator
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const AutocompleteIndicator = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: AutocompleteIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AutocompleteIndicatorProps<E>>) => {
  const {slots} = use(AutocompleteContext);
  const state = use(SelectStateContext);

  const indicator =
    children && React.isValidElement(children) ? (
      React.cloneElement(
        children as React.ReactElement<{
          className?: string;
          "data-slot"?: "autocomplete-indicator";
          "data-open"?: Booleanish;
        }>,
        {
          ...(props as any),
          className: composeSlotClassName(slots?.indicator, className),
          "data-slot": "autocomplete-indicator",
          "data-open": dataAttr(state?.isOpen),
        },
      )
    ) : (
      <IconChevronDown
        className={composeSlotClassName(slots?.indicator, className)}
        data-open={dataAttr(state?.isOpen)}
        data-slot="autocomplete-default-indicator"
        {...(props as any)}
      />
    );

  return <ButtonPrimitive>{indicator}</ButtonPrimitive>;
};

AutocompleteIndicator.displayName = "HeroUI.Autocomplete.Indicator";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Popover
 * -----------------------------------------------------------------------------------------------*/
interface AutocompletePopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const AutocompletePopover = ({
  children,
  className,
  defaultOpen,
  isExiting: isExitingProp,
  isOpen,
  placement = "bottom",
  ref,
  style,
  ...props
}: AutocompletePopoverProps) => {
  const {slots, triggerRef} = use(AutocompleteContext);
  const {isExiting, ref: overlayRef} = usePopoverExitHold({...props, defaultOpen, isOpen}, {ref});
  const [triggerWidth, setTriggerWidth] = useState<string | null>(null);

  const onResize = useCallback(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth + "px");
    }
  }, [triggerRef]);

  useResizeObserver({ref: triggerRef, onResize});

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
        data-slot="autocomplete-popover"
        defaultOpen={defaultOpen}
        isExiting={isExiting || isExitingProp}
        isOpen={isOpen}
        placement={placement}
        triggerRef={triggerRef}
        style={
          {
            "--trigger-width": triggerWidth,
            ...(typeof style === "object" && style !== null ? style : {}),
          } as React.CSSProperties
        }
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
};

AutocompletePopover.displayName = "HeroUI.Autocomplete.Popover";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Filter
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteFilterProps extends ComponentPropsWithRef<typeof AutocompletePrimitive> {}

const AutocompleteFilter = ({children, ...props}: AutocompleteFilterProps) => {
  return (
    <AutocompletePrimitive data-slot="autocomplete-filter" {...props}>
      {children}
    </AutocompletePrimitive>
  );
};

AutocompleteFilter.displayName = "HeroUI.Autocomplete.Filter";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Clear Button
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteClearButtonProps<
  E extends keyof React.JSX.IntrinsicElements = "button",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const AutocompleteClearButton = <E extends keyof React.JSX.IntrinsicElements = "button">({
  className,
  onClick,
  ref,
  ...props
}: AutocompleteClearButtonProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AutocompleteClearButtonProps<E>>) => {
  const {clearButtonRef, isDisabled, onClear, slots} = use(AutocompleteContext);
  const state = use(SelectStateContext);

  const clearButtonRefCallback = React.useCallback(
    (node: HTMLButtonElement | null) => {
      clearButtonRef.current = node;
    },
    [clearButtonRef],
  );

  // Merge context ref callback with user-provided ref
  const mergedRef = React.useMemo(
    () => mergeRefs(clearButtonRefCallback, ref as any),
    [clearButtonRefCallback, ref],
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    state?.selectionManager.setSelectedKeys(new Set());
    onClear?.();
    onClick?.(e as any);
  };

  const isEmpty = state?.selectionManager.selectedKeys.size === 0;

  return (
    <dom.button
      ref={mergedRef}
      aria-hidden={isEmpty || undefined}
      aria-label="Clear selection"
      className={slots?.clearButton({className})}
      data-empty={dataAttr(isEmpty)}
      data-slot="autocomplete-clear-button"
      disabled={isDisabled ?? false}
      tabIndex={-1}
      type="button"
      onClick={handleClick}
      {...(props as any)}
    >
      <CloseIcon data-slot="autocomplete-clear-button-icon" />
    </dom.button>
  );
};

AutocompleteClearButton.displayName = "HeroUI.Autocomplete.ClearButton";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  AutocompleteRoot,
  AutocompleteTrigger,
  AutocompleteValue,
  AutocompleteIndicator,
  AutocompletePopover,
  AutocompleteFilter,
  AutocompleteClearButton,
};

export type {
  AutocompleteRootProps,
  AutocompleteTriggerProps,
  AutocompleteValueProps,
  AutocompleteIndicatorProps,
  AutocompletePopoverProps,
  AutocompleteFilterProps,
  AutocompleteClearButtonProps,
};
