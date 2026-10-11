"use client";

import type {UseOverlayStateProps, UseOverlayStateReturn} from "../../hooks/use-overlay-state";
import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {DrawerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components/Button";
import type {DialogProps as DialogPrimitiveProps} from "react-aria-components/Dialog";

import {drawerVariants} from "@heroui/styles";
import {mergeProps} from "@react-aria/utils";
import React, {createContext, use, useCallback, useMemo, useRef} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {
  Dialog as DialogPrimitive,
  DialogTrigger as DrawerTriggerPrimitive,
  Heading as HeadingPrimitive,
  OverlayTriggerStateContext,
} from "react-aria-components/Dialog";
import {
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
} from "react-aria-components/Modal";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {CloseButton} from "../close-button";
import {SurfaceContext} from "../surface";

import {isDrawerDragTargetOwnedBy} from "./drawer.utils";

const DEFAULT_SURFACE_CONTEXT = {variant: "default" as SurfaceVariants["variant"]};

type DrawerPlacement = "top" | "bottom" | "left" | "right";

/* -------------------------------------------------------------------------------------------------
 * Drawer Drag Hook
 * Tracks pointer events to enable drag-to-dismiss with CSS transforms.
 * Drag only initiates from handle/header/footer areas — body is excluded to avoid scroll conflicts.
 * -----------------------------------------------------------------------------------------------*/

const DRAG_THRESHOLD = 8; // px before drag activates
const DISMISS_FRACTION = 0.3; // dismiss if dragged > 30% of dimension
const VELOCITY_THRESHOLD = 0.5; // px/ms — dismiss on fast flick

function useDrawerDrag(placement: DrawerPlacement | undefined, isDismissable: boolean) {
  const overlayState = use(OverlayTriggerStateContext);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isActive = useRef(false);
  const startPos = useRef(0);
  const currentOffset = useRef(0);
  const velocity = useRef(0);
  const lastTime = useRef(0);
  const lastPos = useRef(0);

  const isVertical = placement === "top" || placement === "bottom";

  const getPos = useCallback(
    (e: React.PointerEvent) => (isVertical ? e.clientY : e.clientX),
    [isVertical],
  );

  const clamp = useCallback(
    (delta: number) => {
      // Only allow drag in the dismiss direction
      switch (placement) {
        case "bottom":
          return Math.max(0, delta);
        case "top":
          return Math.min(0, delta);
        case "right":
          return Math.max(0, delta);
        case "left":
          return Math.min(0, delta);
        default:
          return delta;
      }
    },
    [placement],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isDismissable) return;
      if (e.button !== 0) return;

      const target = e.target as HTMLElement;
      const currentTarget = e.currentTarget as HTMLElement;

      if (!isDrawerDragTargetOwnedBy(target, currentTarget)) return;

      // Don't drag from interactive elements or scrollable body
      if (
        target.closest(
          "input, textarea, button, [role='button'], select, a, [data-slot='drawer-body']",
        )
      ) {
        return;
      }

      isDragging.current = true;
      isActive.current = false;
      startPos.current = getPos(e);
      lastPos.current = startPos.current;
      lastTime.current = Date.now();
      currentOffset.current = 0;
      velocity.current = 0;
    },
    [getPos, isDismissable],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || !dialogRef.current) return;

      const pos = getPos(e);
      const rawDelta = pos - startPos.current;
      const delta = clamp(rawDelta);

      // Activate only after passing threshold to avoid false starts
      if (!isActive.current) {
        if (Math.abs(rawDelta) < DRAG_THRESHOLD) return;
        isActive.current = true;
        dialogRef.current.style.transition = "none";
        dialogRef.current.setPointerCapture(e.pointerId);
      }

      currentOffset.current = delta;

      // Track velocity for flick detection
      const now = Date.now();
      const dt = now - lastTime.current;

      if (dt > 0) {
        velocity.current = (pos - lastPos.current) / dt;
        lastTime.current = now;
        lastPos.current = pos;
      }

      const axis = isVertical ? "Y" : "X";

      dialogRef.current.style.transform = `translate${axis}(${delta}px)`;
    },
    [getPos, clamp, isVertical],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const el = dialogRef.current;

      if (!el || !isActive.current) {
        isActive.current = false;

        return;
      }
      isActive.current = false;

      // Release pointer capture
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture may already be released
      }

      const dimension = isVertical ? el.offsetHeight : el.offsetWidth;
      const absOffset = Math.abs(currentOffset.current);
      const absVelocity = Math.abs(velocity.current);

      const shouldDismiss =
        absOffset > dimension * DISMISS_FRACTION || absVelocity > VELOCITY_THRESHOLD;

      if (shouldDismiss && overlayState) {
        // Keep the inline transform — it compounds with the content exit animation
        // so the drawer continues sliding from the dragged position.
        // Drop the inline `transition: none` set while dragging, otherwise the exit
        // `translate` transition never runs and the drawer disappears without sliding out.
        el.style.transition = "";
        overlayState.close();
      } else {
        // Snap back with a spring-like ease
        el.style.transition = "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)";
        el.style.transform = "";

        const cleanup = () => {
          el.style.transition = "";
        };

        el.addEventListener("transitionend", cleanup, {once: true});
      }

      currentOffset.current = 0;
      velocity.current = 0;
    },
    [isVertical, overlayState],
  );

  return {
    dialogRef,
    dragHandlers: isDismissable
      ? {
          onPointerDown,
          onPointerMove,
          onPointerUp,
        }
      : {},
  };
}

/* -------------------------------------------------------------------------------------------------
 * Drawer Context
 * -----------------------------------------------------------------------------------------------*/
type DrawerContext = {
  slots?: ReturnType<typeof drawerVariants>;
  placement?: DrawerPlacement;
  isDismissable?: boolean;
};

const DrawerContext = createContext<DrawerContext>({});

/* -------------------------------------------------------------------------------------------------
 * Drawer Root
 * -----------------------------------------------------------------------------------------------*/
interface DrawerRootProps extends ComponentPropsWithRef<typeof DrawerTriggerPrimitive> {
  state?: UseOverlayStateReturn;
}

const DrawerRoot = ({children, state, ...props}: DrawerRootProps) => {
  const drawerContext = useMemo<DrawerContext>(
    () => ({slots: drawerVariants(), placement: undefined, isDismissable: true}),
    [],
  );

  const controlledProps = useMemo<UseOverlayStateProps>(
    () => (state ? {isOpen: state.isOpen, onOpenChange: state.setOpen} : {}),
    [state],
  );

  return (
    <DrawerContext value={drawerContext}>
      <DrawerTriggerPrimitive data-slot="drawer-root" {...mergeProps(props, controlledProps)}>
        {children}
      </DrawerTriggerPrimitive>
    </DrawerContext>
  );
};

DrawerRoot.displayName = "HeroUI.Drawer";

/* -------------------------------------------------------------------------------------------------
 * Drawer Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DrawerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const DrawerTrigger = ({children, className, ...props}: DrawerTriggerProps) => {
  const {slots} = use(DrawerContext);

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="drawer-trigger"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

DrawerTrigger.displayName = "HeroUI.Drawer.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Drawer Backdrop
 * -----------------------------------------------------------------------------------------------*/
interface DrawerBackdropProps extends ComponentPropsWithRef<typeof ModalOverlayPrimitive> {
  variant?: DrawerVariants["variant"];
  /**
   * Whether to close the drawer when the user interacts outside it.
   * @default true
   */
  isDismissable?: boolean;
}

const DrawerBackdrop = ({
  children,
  className,
  isDismissable = true,
  variant,
  ...props
}: DrawerBackdropProps) => {
  const {slots: contextSlots} = use(DrawerContext);

  const updatedSlots = useMemo(() => drawerVariants({variant}), [variant]);

  const updatedDrawerContext = useMemo<DrawerContext>(
    () => ({slots: {...contextSlots, ...updatedSlots}, isDismissable}),
    [contextSlots, updatedSlots, isDismissable],
  );

  return (
    <ModalOverlayPrimitive
      className={composeTwRenderProps(className, updatedSlots?.backdrop())}
      data-slot="drawer-backdrop"
      isDismissable={isDismissable}
      {...props}
    >
      {(renderProps) => (
        <DrawerContext value={updatedDrawerContext}>
          {typeof children === "function" ? children(renderProps) : children}
        </DrawerContext>
      )}
    </ModalOverlayPrimitive>
  );
};

DrawerBackdrop.displayName = "HeroUI.Drawer.Backdrop";

/* -------------------------------------------------------------------------------------------------
 * Drawer Content
 * -----------------------------------------------------------------------------------------------*/
interface DrawerContentProps extends Omit<
  ComponentPropsWithRef<typeof ModalPrimitive>,
  Exclude<keyof DrawerBackdropProps, "children" | "className">
> {
  placement?: DrawerPlacement;
}

const DrawerContent = ({
  children,
  className,
  placement = "bottom",
  ...props
}: DrawerContentProps) => {
  const {isDismissable, slots: contextSlots} = use(DrawerContext);

  const updatedSlots = useMemo(() => drawerVariants({placement}), [placement]);

  const updatedDrawerContext = useMemo<DrawerContext>(
    () => ({placement, isDismissable, slots: {...contextSlots, ...updatedSlots}}),
    [contextSlots, placement, isDismissable, updatedSlots],
  );

  return (
    <ModalPrimitive
      className={composeTwRenderProps(className, updatedSlots?.content())}
      data-placement={placement}
      data-slot="drawer-content"
      {...props}
    >
      {(renderProps) => (
        <DrawerContext value={updatedDrawerContext}>
          {typeof children === "function" ? children(renderProps) : children}
        </DrawerContext>
      )}
    </ModalPrimitive>
  );
};

DrawerContent.displayName = "HeroUI.Drawer.Content";

/* -------------------------------------------------------------------------------------------------
 * Drawer Dialog
 * -----------------------------------------------------------------------------------------------*/
interface DrawerDialogProps extends DialogPrimitiveProps {}

const DrawerDialog = ({children, className, ...props}: DrawerDialogProps) => {
  const {isDismissable = true, placement, slots} = use(DrawerContext);
  const {dialogRef, dragHandlers} = useDrawerDrag(placement, isDismissable);

  return (
    <SurfaceContext value={DEFAULT_SURFACE_CONTEXT}>
      <DialogPrimitive
        ref={dialogRef}
        className={composeSlotClassName(slots?.dialog, className)}
        data-placement={placement}
        data-slot="drawer-dialog"
        style={isDismissable ? {touchAction: "none"} : undefined}
        {...dragHandlers}
        {...props}
      >
        {children}
      </DialogPrimitive>
    </SurfaceContext>
  );
};

DrawerDialog.displayName = "HeroUI.Drawer.Dialog";

/* -------------------------------------------------------------------------------------------------
 * Drawer Header
 * -----------------------------------------------------------------------------------------------*/
interface DrawerHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DrawerHeader = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DrawerHeaderProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerHeaderProps<E>>) => {
  const {slots} = use(DrawerContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.header, className)}
      data-slot="drawer-header"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

DrawerHeader.displayName = "HeroUI.Drawer.Header";

/* -------------------------------------------------------------------------------------------------
 * Drawer Body
 * -----------------------------------------------------------------------------------------------*/
interface DrawerBodyProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DrawerBody = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DrawerBodyProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerBodyProps<E>>) => {
  const {slots} = use(DrawerContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.body, className)}
      data-slot="drawer-body"
      style={{touchAction: "pan-y"}}
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

DrawerBody.displayName = "HeroUI.Drawer.Body";

/* -------------------------------------------------------------------------------------------------
 * Drawer Footer
 * -----------------------------------------------------------------------------------------------*/
interface DrawerFooterProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DrawerFooter = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DrawerFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerFooterProps<E>>) => {
  const {slots} = use(DrawerContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.footer, className)}
      data-slot="drawer-footer"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

DrawerFooter.displayName = "HeroUI.Drawer.Footer";

/* -------------------------------------------------------------------------------------------------
 * Drawer Heading
 * -----------------------------------------------------------------------------------------------*/
interface DrawerHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const DrawerHeading = ({children, className, ...props}: DrawerHeadingProps) => {
  const {slots} = use(DrawerContext);

  return (
    <HeadingPrimitive
      className={composeSlotClassName(slots?.heading, className)}
      data-slot="drawer-heading"
      slot="title"
      {...props}
    >
      {children}
    </HeadingPrimitive>
  );
};

DrawerHeading.displayName = "HeroUI.Drawer.Heading";

/* -------------------------------------------------------------------------------------------------
 * Drawer Handle
 * -----------------------------------------------------------------------------------------------*/
interface DrawerHandleProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DrawerHandle = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: DrawerHandleProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof DrawerHandleProps<E>>) => {
  const {slots} = use(DrawerContext);

  return (
    <dom.div
      aria-hidden="true"
      className={composeSlotClassName(slots?.handle, className)}
      data-slot="drawer-handle"
      {...(props as any)}
    >
      <div data-slot="drawer-handle-bar" />
    </dom.div>
  );
};

DrawerHandle.displayName = "HeroUI.Drawer.Handle";

/* -------------------------------------------------------------------------------------------------
 * Drawer Close Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DrawerCloseTriggerProps extends ButtonPrimitiveProps {
  className?: string;
  children?: ReactNode;
}

const DrawerCloseTrigger = ({className, ...rest}: DrawerCloseTriggerProps) => {
  const {slots} = use(DrawerContext);

  return (
    <CloseButton
      className={composeTwRenderProps(className, slots?.closeTrigger())}
      data-slot="drawer-close-trigger"
      slot="close"
      {...rest}
    />
  );
};

DrawerCloseTrigger.displayName = "HeroUI.Drawer.CloseTrigger";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DrawerRoot,
  DrawerTrigger,
  DrawerBackdrop,
  DrawerContent,
  DrawerDialog,
  DrawerHeader,
  DrawerHeading,
  DrawerBody,
  DrawerFooter,
  DrawerHandle,
  DrawerCloseTrigger,
};

export type {
  DrawerRootProps,
  DrawerTriggerProps,
  DrawerBackdropProps,
  DrawerContentProps,
  DrawerDialogProps,
  DrawerHeaderProps,
  DrawerHeadingProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerHandleProps,
  DrawerCloseTriggerProps,
};
