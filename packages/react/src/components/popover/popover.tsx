"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {PopoverVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {popoverVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
  OverlayTriggerStateContext,
  DialogTrigger as PopoverTriggerPrimitive,
} from "react-aria-components/Dialog";
import {
  OverlayArrow,
  Popover as PopoverPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components/Popover";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {resolveOverlayOpen, useOverlayExitHold} from "../../utils/use-overlay-exit-hold";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Popover Context
 * -----------------------------------------------------------------------------------------------*/
type PopoverContext = {
  slots?: ReturnType<typeof popoverVariants>;
};

const PopoverContext = createContext<PopoverContext>({});

const DEFAULT_SURFACE_CONTEXT = {variant: "default" as SurfaceVariants["variant"]};

/* -------------------------------------------------------------------------------------------------
 * Popover Root
 * -----------------------------------------------------------------------------------------------*/
type PopoverRootProps = ComponentPropsWithRef<typeof PopoverTriggerPrimitive>;

const PopoverRoot = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof PopoverTriggerPrimitive>) => {
  const slots = React.useMemo(() => popoverVariants(), []);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <PopoverContext value={contextValue}>
      <PopoverTriggerPrimitive data-slot="popover-root" {...props}>
        {children}
      </PopoverTriggerPrimitive>
    </PopoverContext>
  );
};

PopoverRoot.displayName = "HeroUI.Popover";

/* -------------------------------------------------------------------------------------------------
 * Popover Content
 * -----------------------------------------------------------------------------------------------*/
interface PopoverContentProps
  extends Omit<ComponentPropsWithRef<typeof PopoverPrimitive>, "children">, PopoverVariants {
  children: React.ReactNode;
}

const PopoverContent = ({
  children,
  className,
  defaultOpen,
  isExiting: isExitingProp,
  isOpen,
  ref,
  ...props
}: PopoverContentProps) => {
  const {slots} = use(PopoverContext);
  const contextValue = React.useMemo(() => ({slots}), [slots]);
  const overlayState = use(OverlayTriggerStateContext);
  const {isExiting, ref: overlayRef} = useOverlayExitHold(
    resolveOverlayOpen(isOpen, defaultOpen, overlayState),
    {ref},
  );

  return (
    <PopoverContext value={contextValue}>
      <SurfaceContext value={DEFAULT_SURFACE_CONTEXT}>
        <PopoverPrimitive
          {...props}
          ref={overlayRef}
          className={useResolvedClassName(className, slots?.base())}
          defaultOpen={defaultOpen}
          isExiting={isExiting || isExitingProp}
          isOpen={isOpen}
        >
          {children}
        </PopoverPrimitive>
      </SurfaceContext>
    </PopoverContext>
  );
};

PopoverContent.displayName = "HeroUI.Popover.Content";

/* -------------------------------------------------------------------------------------------------
 * Popover Arrow
 * -----------------------------------------------------------------------------------------------*/
type PopoverArrowProps = Omit<ComponentPropsWithRef<typeof OverlayArrow>, "children"> & {
  children?: React.ReactNode;
};

const PopoverArrow = ({children, className, ...props}: PopoverArrowProps) => {
  const defaultArrow = (
    <svg
      data-slot="popover-overlay-arrow"
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
          "data-slot"?: "popover-overlay-arrow";
        }>,
        {
          "data-slot": "popover-overlay-arrow",
        },
      )
    : defaultArrow;

  return (
    <OverlayArrow data-slot="popover-overlay-arrow-group" {...props} className={className}>
      {arrow}
    </OverlayArrow>
  );
};

PopoverArrow.displayName = "HeroUI.Popover.Arrow";

/* -------------------------------------------------------------------------------------------------
 * Popover Dialog
 * -----------------------------------------------------------------------------------------------*/
type PopoverDialogProps = Omit<ComponentPropsWithRef<typeof DialogPrimitive>, "children"> & {
  children: React.ReactNode;
};

const PopoverDialog = ({children, className, ...props}: PopoverDialogProps) => {
  const {slots} = use(PopoverContext);

  return (
    <DialogPrimitive
      data-slot="popover-dialog"
      {...props}
      className={composeSlotClassName(slots?.dialog, className)}
    >
      {children}
    </DialogPrimitive>
  );
};

PopoverDialog.displayName = "HeroUI.Popover.Dialog";

/* -------------------------------------------------------------------------------------------------
 * Popover Trigger
 * -----------------------------------------------------------------------------------------------*/
interface PopoverTriggerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const PopoverTrigger = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: PopoverTriggerProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof PopoverTriggerProps<E>>) => {
  const {slots} = use(PopoverContext);

  return (
    <PressablePrimitive>
      <dom.div
        className={composeSlotClassName(slots?.trigger, className)}
        data-slot="popover-trigger"
        role="button"
        {...(props as any)}
      >
        {children}
      </dom.div>
    </PressablePrimitive>
  );
};

PopoverTrigger.displayName = "HeroUI.Popover.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Popover Heading
 * -----------------------------------------------------------------------------------------------*/
type PopoverHeadingProps = ComponentPropsWithRef<typeof HeadingPrimitive> & {};

const PopoverHeading = ({children, className, ...props}: PopoverHeadingProps) => {
  const {slots} = use(PopoverContext);

  return (
    <HeadingPrimitive
      slot="title"
      {...props}
      className={composeSlotClassName(slots?.heading, className)}
    >
      {children}
    </HeadingPrimitive>
  );
};

PopoverHeading.displayName = "HeroUI.Popover.Heading";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {PopoverRoot, PopoverTrigger, PopoverDialog, PopoverArrow, PopoverContent, PopoverHeading};

export type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverDialogProps,
  PopoverArrowProps,
  PopoverContentProps,
  PopoverHeadingProps,
};
