"use client";

import type {UseOverlayStateProps, UseOverlayStateReturn} from "../../hooks/use-overlay-state";
import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {ModalVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {Button as ButtonPrimitive} from "react-aria-components/Button";
import type {DialogProps as DialogPrimitiveProps} from "react-aria-components/Dialog";

import {modalVariants} from "@heroui/styles";
import {mergeProps} from "@react-aria/utils";
import {createContext, use, useMemo} from "react";
import {
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
  DialogTrigger as ModalTriggerPrimitive,
  OverlayTriggerStateContext,
} from "react-aria-components/Dialog";
import {
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components/Modal";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {resolveOverlayOpen, useOverlayExitHold} from "../../utils/use-overlay-exit-hold";
import {CloseButton} from "../close-button";
import {SurfaceContext} from "../surface";

const DEFAULT_SURFACE_CONTEXT = {variant: "default" as SurfaceVariants["variant"]};

type ModalPlacement = "auto" | "top" | "center" | "bottom";

/* -------------------------------------------------------------------------------------------------
 * Modal Context
 * -----------------------------------------------------------------------------------------------*/
type ModalContext = {
  slots?: ReturnType<typeof modalVariants>;
  placement?: ModalPlacement;
};

const ModalContext = createContext<ModalContext>({});

/* -------------------------------------------------------------------------------------------------
 * Modal Root
 * -----------------------------------------------------------------------------------------------*/
interface ModalRootProps extends ComponentPropsWithRef<typeof ModalTriggerPrimitive> {
  state?: UseOverlayStateReturn;
}

const ModalRoot = ({children, state, ...props}: ModalRootProps) => {
  const modalContext = useMemo<ModalContext>(
    () => ({slots: modalVariants(), placement: undefined}),
    [],
  );

  const controlledProps = useMemo<UseOverlayStateProps>(
    () => (state ? {isOpen: state.isOpen, onOpenChange: state.setOpen} : {}),
    [state],
  );

  return (
    <ModalContext value={modalContext}>
      <ModalTriggerPrimitive data-slot="modal-root" {...mergeProps(props, controlledProps)}>
        {children}
      </ModalTriggerPrimitive>
    </ModalContext>
  );
};

ModalRoot.displayName = "HeroUI.Modal";

/* -------------------------------------------------------------------------------------------------
 * Modal Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ModalTriggerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ModalTrigger = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalTriggerProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalTriggerProps<E>>) => {
  const {slots} = use(ModalContext);

  return (
    <PressablePrimitive>
      <dom.div
        className={composeSlotClassName(slots?.trigger, className)}
        data-slot="modal-trigger"
        role="button"
        {...(props as any)}
      >
        {children}
      </dom.div>
    </PressablePrimitive>
  );
};

ModalTrigger.displayName = "HeroUI.Modal.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Modal Backdrop
 * -----------------------------------------------------------------------------------------------*/
interface ModalBackdropProps extends ComponentPropsWithRef<typeof ModalOverlayPrimitive> {
  variant?: ModalVariants["variant"];
  /**
   * Whether to close the modal when the user interacts outside it.
   * @default true
   */
  isDismissable?: boolean;
}

const ModalBackdrop = ({
  children,
  className,
  defaultOpen,
  isDismissable = true,
  isExiting: isExitingProp,
  isOpen,
  onClick,
  ref,
  variant,
  ...props
}: ModalBackdropProps) => {
  const {slots: contextSlots} = use(ModalContext);
  const overlayState = use(OverlayTriggerStateContext);
  // React Aria only accepts `isExiting` on the overlay. The hold also waits for the
  // container's exit animation inside it.
  const {isExiting, ref: overlayRef} = useOverlayExitHold(
    resolveOverlayOpen(isOpen, defaultOpen, overlayState),
    {ref},
  );

  const updatedSlots = useMemo(() => modalVariants({variant}), [variant]);

  const updatedModalContext = useMemo<ModalContext>(
    () => ({slots: {...contextSlots, ...updatedSlots}}),
    [contextSlots, updatedSlots],
  );

  return (
    <ModalOverlayPrimitive
      ref={overlayRef}
      className={composeTwRenderProps(className, updatedSlots?.backdrop())}
      data-slot="modal-backdrop"
      defaultOpen={defaultOpen}
      isDismissable={isDismissable}
      isExiting={isExiting || isExitingProp}
      isOpen={isOpen}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...props}
    >
      {(renderProps) => (
        <ModalContext value={updatedModalContext}>
          {typeof children === "function" ? children(renderProps) : children}{" "}
        </ModalContext>
      )}
    </ModalOverlayPrimitive>
  );
};

ModalBackdrop.displayName = "HeroUI.Modal.Backdrop";

/* -------------------------------------------------------------------------------------------------
 * Modal Container
 * -----------------------------------------------------------------------------------------------*/
interface ModalContainerProps extends Omit<
  ComponentPropsWithRef<typeof ModalPrimitive>,
  Exclude<keyof ModalBackdropProps, "children" | "className">
> {
  placement?: ModalPlacement;
  scroll?: ModalVariants["scroll"];
  size?: ModalVariants["size"];
}

const ModalContainer = ({
  children,
  className,
  placement = "auto",
  scroll,
  size,
  ...props
}: ModalContainerProps) => {
  const {slots: contextSlots} = use(ModalContext);

  const updatedSlots = useMemo(() => modalVariants({scroll, size}), [scroll, size]);

  const updatedModalContext = useMemo<ModalContext>(
    () => ({placement, slots: {...contextSlots, ...updatedSlots}}),
    [contextSlots, placement, updatedSlots],
  );

  return (
    <ModalPrimitive
      className={composeTwRenderProps(className, updatedSlots?.container())}
      data-placement={placement}
      data-slot="modal-container"
      {...props}
    >
      {(renderProps) => (
        <ModalContext value={updatedModalContext}>
          {typeof children === "function" ? children(renderProps) : children}
        </ModalContext>
      )}
    </ModalPrimitive>
  );
};

ModalContainer.displayName = "HeroUI.Modal.Container";

/* -------------------------------------------------------------------------------------------------
 * Modal Dialog
 * -----------------------------------------------------------------------------------------------*/
interface ModalDialogProps extends DialogPrimitiveProps {}

const ModalDialog = ({children, className, ...props}: ModalDialogProps) => {
  const {placement, slots} = use(ModalContext);

  return (
    <SurfaceContext value={DEFAULT_SURFACE_CONTEXT}>
      <DialogPrimitive
        className={composeSlotClassName(slots?.dialog, className)}
        data-placement={placement}
        data-slot="modal-dialog"
        {...props}
      >
        {children}
      </DialogPrimitive>
    </SurfaceContext>
  );
};

ModalDialog.displayName = "HeroUI.Modal.Dialog";

/* -------------------------------------------------------------------------------------------------
 * Modal Header
 * -----------------------------------------------------------------------------------------------*/
interface ModalHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ModalHeader = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalHeaderProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalHeaderProps<E>>) => {
  const {slots} = use(ModalContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.header, className)}
      data-slot="modal-header"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

ModalHeader.displayName = "HeroUI.Modal.Header";

/* -------------------------------------------------------------------------------------------------
 * Modal Body
 * -----------------------------------------------------------------------------------------------*/
interface ModalBodyProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ModalBody = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalBodyProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalBodyProps<E>>) => {
  const {slots} = use(ModalContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.body, className)}
      data-slot="modal-body"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

ModalBody.displayName = "HeroUI.Modal.Body";

/* -------------------------------------------------------------------------------------------------
 * Modal Footer
 * -----------------------------------------------------------------------------------------------*/
interface ModalFooterProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ModalFooter = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalFooterProps<E>>) => {
  const {slots} = use(ModalContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.footer, className)}
      data-slot="modal-footer"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

ModalFooter.displayName = "HeroUI.Modal.Footer";

/* -------------------------------------------------------------------------------------------------
 * Modal Heading
 * -----------------------------------------------------------------------------------------------*/
interface ModalHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const ModalHeading = ({children, className, ...props}: ModalHeadingProps) => {
  const {slots} = use(ModalContext);

  return (
    <HeadingPrimitive
      className={composeSlotClassName(slots?.heading, className)}
      data-slot="modal-heading"
      slot="title"
      {...props}
    >
      {children}
    </HeadingPrimitive>
  );
};

ModalHeading.displayName = "HeroUI.Modal.Heading";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Icon
 * -----------------------------------------------------------------------------------------------*/
interface ModalIconProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ModalIcon = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ModalIconProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ModalIconProps<E>>) => {
  const {slots} = use(ModalContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.icon, className)}
      data-slot="modal-icon"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

ModalIcon.displayName = "HeroUI.Modal.Icon";

/* -------------------------------------------------------------------------------------------------
 * Modal Close Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ModalCloseTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children?: ReactNode;
}

const ModalCloseTrigger = ({className, ...rest}: ModalCloseTriggerProps) => {
  const {slots} = use(ModalContext);

  return (
    <CloseButton
      className={composeTwRenderProps(className, slots?.closeTrigger())}
      data-slot="modal-close-trigger"
      slot="close"
      {...rest}
    />
  );
};

ModalCloseTrigger.displayName = "HeroUI.Modal.CloseTrigger";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  ModalRoot,
  ModalTrigger,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalIcon,
  ModalHeading,
  ModalBody,
  ModalFooter,
  ModalCloseTrigger,
};

export type {
  ModalRootProps,
  ModalTriggerProps,
  ModalBackdropProps,
  ModalContainerProps,
  ModalDialogProps,
  ModalHeaderProps,
  ModalIconProps,
  ModalHeadingProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseTriggerProps,
};
