"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {TooltipVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {tooltipVariants} from "@heroui/styles";
import {mergeProps} from "@react-aria/utils";
import React, {createContext, use, useRef} from "react";
import {useFocusable} from "react-aria/useFocusable";
import {
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
  TooltipTriggerStateContext,
} from "react-aria-components/Tooltip";

import {useCSSVariable} from "../../hooks/use-css-variable";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {parseCSSTime} from "../../utils/css";
import {dom} from "../../utils/dom";
import {resolveOverlayOpen, useOverlayExitHold} from "../../utils/use-overlay-exit-hold";

/* -------------------------------------------------------------------------------------------------
 * Tooltip Context
 * -----------------------------------------------------------------------------------------------*/
type TooltipContext = {
  slots?: ReturnType<typeof tooltipVariants>;
};

const TooltipContext = createContext<TooltipContext>({});

/* -------------------------------------------------------------------------------------------------
 * Tooltip Animation Scope
 * -----------------------------------------------------------------------------------------------*/
type TooltipAnimationScopeProps = {
  children: ReactNode;
  shouldSkipAnimation?: boolean;
};

// React Aria sets `shouldSkipAnimation` while its global warmup timer is active, which makes
// `Tooltip` drop `data-entering` / `data-exiting` when one tooltip replaces another. HeroUI drives
// both phases from CSS keyframes, so the flag is cleared for descendants to keep the fade on swap.
const TooltipAnimationScope = ({children, shouldSkipAnimation}: TooltipAnimationScopeProps) => {
  const state = use(TooltipTriggerStateContext);

  if (!state || shouldSkipAnimation) return children;

  return (
    <TooltipTriggerStateContext value={{...state, shouldSkipAnimation: false}}>
      {children}
    </TooltipTriggerStateContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tooltip Root
 * -----------------------------------------------------------------------------------------------*/
type TooltipRootProps = ComponentPropsWithRef<typeof TooltipTriggerPrimitive> & {
  /**
   * Whether to let React Aria skip the enter and exit animations while its global warmup timer is
   * active, i.e. when moving quickly from one tooltip to another.
   *
   * @default false
   */
  shouldSkipAnimation?: boolean;
};

const TooltipRoot = ({
  children,
  closeDelay,
  delay,
  shouldSkipAnimation = false,
  ...props
}: TooltipRootProps) => {
  const slots = React.useMemo(() => tooltipVariants(), []);

  const cssDelay = useCSSVariable("--tooltip-delay");
  const cssCloseDelay = useCSSVariable("--tooltip-close-delay");

  const resolvedDelay = delay ?? parseCSSTime(cssDelay);
  const resolvedCloseDelay = closeDelay ?? parseCSSTime(cssCloseDelay);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <TooltipContext value={contextValue}>
      <TooltipTriggerPrimitive
        closeDelay={resolvedCloseDelay}
        data-slot="tooltip-root"
        delay={resolvedDelay}
        {...props}
      >
        <TooltipAnimationScope shouldSkipAnimation={shouldSkipAnimation}>
          {children}
        </TooltipAnimationScope>
      </TooltipTriggerPrimitive>
    </TooltipContext>
  );
};

TooltipRoot.displayName = "HeroUI.Tooltip";

/* -------------------------------------------------------------------------------------------------
 * Tooltip Content
 * -----------------------------------------------------------------------------------------------*/
interface TooltipContentProps
  extends Omit<ComponentPropsWithRef<typeof TooltipPrimitive>, "children">, TooltipVariants {
  showArrow?: boolean;
  children: React.ReactNode;
}

const TooltipContent = ({
  children,
  className,
  defaultOpen,
  isExiting: isExitingProp,
  isOpen,
  offset: offsetProp,
  ref,
  showArrow = false,
  ...props
}: TooltipContentProps) => {
  const {slots} = use(TooltipContext);
  const offset = offsetProp ? offsetProp : showArrow ? 7 : 3;
  const state = use(TooltipTriggerStateContext);
  // HeroUI clears React Aria's warmup skip unless the caller opts in, so the hold
  // follows that flag and does not force a close animation the caller turned off.
  const {isExiting, ref: overlayRef} = useOverlayExitHold(
    resolveOverlayOpen(isOpen, defaultOpen, state),
    {enabled: !state?.shouldSkipAnimation, ref},
  );

  return (
    <TooltipPrimitive
      {...props}
      ref={overlayRef}
      className={useResolvedClassName(className, slots?.base())}
      defaultOpen={defaultOpen}
      isExiting={isExiting || isExitingProp}
      isOpen={isOpen}
      offset={offset}
    >
      {children}
    </TooltipPrimitive>
  );
};

TooltipContent.displayName = "HeroUI.Tooltip.Content";

/* -------------------------------------------------------------------------------------------------
 * Tooltip Arrow
 * -----------------------------------------------------------------------------------------------*/
type TooltipArrowProps = Omit<ComponentPropsWithRef<typeof OverlayArrow>, "children"> & {
  children?: React.ReactNode;
};

const TooltipArrow = ({children, className, ...props}: TooltipArrowProps) => {
  const defaultArrow = (
    <svg
      data-slot="overlay-arrow"
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0C5.48483 8 6.5 8 12 0Z" />
    </svg>
  );

  const arrow = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<{
          className?: string;
          "data-slot"?: "overlay-arrow";
        }>,
        {
          "data-slot": "overlay-arrow",
        },
      )
    : defaultArrow;

  return (
    <OverlayArrow data-slot="tooltip-arrow" {...props} className={className}>
      {arrow}
    </OverlayArrow>
  );
};

TooltipArrow.displayName = "HeroUI.Tooltip.Arrow";

/* -------------------------------------------------------------------------------------------------
 * Tooltip Trigger
 * -----------------------------------------------------------------------------------------------*/
interface TooltipTriggerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const TooltipTrigger = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: TooltipTriggerProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TooltipTriggerProps<E>>) => {
  const {slots} = use(TooltipContext);
  const triggerRef = useRef<HTMLElement | null>(null);
  // Use the `useFocusable` hook directly rather than the `<Focusable>` wrapper component.
  // Both consume the FocusableContext provided by TooltipTriggerPrimitive's internal
  // <FocusableProvider> (which carries the tooltip trigger props + triggerRef) and produce
  // the same `focusableProps` (tabIndex, focus, keyboard handlers). However, the wrapper
  // component runs a dev-only `isFocusable(el)` assertion in a useEffect that walks the
  // ancestor chain for `inert`. When the Tooltip mounts inside an inert subtree (e.g. behind
  // an open Drawer/Modal), that check produces a false-positive warning:
  // "<Focusable> child must be focusable. Please ensure the tabIndex prop is passed through."
  const {focusableProps} = useFocusable({}, triggerRef as React.RefObject<HTMLElement>);

  return (
    <dom.div
      ref={triggerRef as unknown as React.Ref<HTMLDivElement>}
      className={composeSlotClassName(slots?.trigger, className)}
      data-slot="tooltip-trigger"
      role="button"
      {...mergeProps(focusableProps, props as any)}
    >
      {children}
    </dom.div>
  );
};

TooltipTrigger.displayName = "HeroUI.Tooltip.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow};

export type {TooltipRootProps, TooltipArrowProps, TooltipContentProps, TooltipTriggerProps};
