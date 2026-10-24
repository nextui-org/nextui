"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {AlertDialogVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, HTMLAttributes, ReactNode} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components/Button";
import type {DialogProps as DialogPrimitiveProps} from "react-aria-components/Dialog";

import {alertDialogVariants} from "@heroui/styles";
import {createContext, use, useMemo} from "react";
import {
  DialogTrigger as AlertDialogTriggerPrimitive,
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
  OverlayTriggerStateContext,
} from "react-aria-components/Dialog";
import {
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components/Modal";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {resolveOverlayOpen, useOverlayExitHold} from "../../utils/use-overlay-exit-hold";
import {CloseButton} from "../close-button";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";

type AlertDialogPlacement = "auto" | "top" | "center" | "bottom";

type AlertDialogStatus = "default" | "accent" | "success" | "warning" | "danger";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Context
 * -----------------------------------------------------------------------------------------------*/
type AlertDialogContext = {
  slots?: ReturnType<typeof alertDialogVariants>;
  placement?: AlertDialogPlacement;
};

const AlertDialogContext = createContext<AlertDialogContext>({});

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Root
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogRootProps extends ComponentPropsWithRef<typeof AlertDialogTriggerPrimitive> {}

const AlertDialogRoot = ({children, ...props}: AlertDialogRootProps) => {
  const alertDialogContext = useMemo<AlertDialogContext>(
    () => ({slots: alertDialogVariants(), placement: undefined}),
    [],
  );

  return (
    <AlertDialogContext value={alertDialogContext}>
      <AlertDialogTriggerPrimitive data-slot="alert-dialog-root" {...props}>
        {children}
      </AlertDialogTriggerPrimitive>
    </AlertDialogContext>
  );
};

AlertDialogRoot.displayName = "HeroUI.AlertDialog";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Trigger
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogTriggerProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogTrigger = ({children, className, ...props}: AlertDialogTriggerProps) => {
  const {slots} = use(AlertDialogContext);

  return (
    <PressablePrimitive>
      <div
        className={composeSlotClassName(slots?.trigger, className)}
        data-slot="alert-dialog-trigger"
        role="button"
        {...props}
      >
        {children}
      </div>
    </PressablePrimitive>
  );
};

AlertDialogTrigger.displayName = "HeroUI.AlertDialog.Trigger";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Backdrop
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogBackdropProps extends ComponentPropsWithRef<typeof ModalOverlayPrimitive> {
  variant?: AlertDialogVariants["variant"];
  /**
   * Whether to close the alert dialog when the user interacts outside it.
   * Alert dialogs typically require explicit action, so this defaults to false.
   * @default false
   */
  isDismissable?: boolean;
  /**
   * Whether pressing the escape key to close the modal should be disabled.
   * Alert dialogs typically require explicit action, so this defaults to true.
   * @default true
   */
  isKeyboardDismissDisabled?: boolean;
}

const AlertDialogBackdrop = ({
  children,
  className,
  defaultOpen,
  isDismissable = false,
  isExiting: isExitingProp,
  isKeyboardDismissDisabled = true,
  isOpen,
  onClick,
  ref,
  variant,
  ...props
}: AlertDialogBackdropProps) => {
  const {slots: contextSlots} = use(AlertDialogContext);
  const overlayState = use(OverlayTriggerStateContext);
  const {isExiting, ref: overlayRef} = useOverlayExitHold(
    resolveOverlayOpen(isOpen, defaultOpen, overlayState),
    {ref},
  );

  const updatedSlots = useMemo(() => alertDialogVariants({variant}), [variant]);

  const updatedModalContext = useMemo<AlertDialogContext>(
    () => ({slots: {...contextSlots, ...updatedSlots}}),
    [contextSlots, updatedSlots],
  );

  return (
    <ModalOverlayPrimitive
      ref={overlayRef}
      className={useResolvedClassName(className, updatedSlots?.backdrop())}
      data-slot="alert-dialog-backdrop"
      defaultOpen={defaultOpen}
      isDismissable={isDismissable}
      isExiting={isExiting || isExitingProp}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isOpen={isOpen}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...props}
    >
      {(renderProps) => (
        <AlertDialogContext value={updatedModalContext}>
          {typeof children === "function" ? children(renderProps) : children}{" "}
        </AlertDialogContext>
      )}
    </ModalOverlayPrimitive>
  );
};

AlertDialogBackdrop.displayName = "HeroUI.AlertDialog.Backdrop";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Container
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogContainerProps extends Omit<
  ComponentPropsWithRef<typeof ModalPrimitive>,
  Exclude<keyof AlertDialogBackdropProps, "children" | "className">
> {
  /**
   * The placement of the alert dialog on the screen.
   * @default "auto"
   */
  placement?: AlertDialogPlacement;
  size?: AlertDialogVariants["size"];
}

const AlertDialogContainer = ({
  children,
  className,
  placement = "auto",
  size,
  ...props
}: AlertDialogContainerProps) => {
  const {slots: contextSlots} = use(AlertDialogContext);

  const updatedSlots = useMemo(() => alertDialogVariants({size}), [size]);

  const updatedContext = useMemo<AlertDialogContext>(
    () => ({placement, slots: {...contextSlots, ...updatedSlots}}),
    [placement, contextSlots, updatedSlots],
  );

  return (
    <ModalPrimitive
      className={useResolvedClassName(className, updatedSlots?.container())}
      data-placement={placement}
      data-slot="alert-dialog-container"
      {...props}
    >
      {(renderProps) => (
        <AlertDialogContext value={updatedContext}>
          {typeof children === "function" ? children(renderProps) : children}
        </AlertDialogContext>
      )}
    </ModalPrimitive>
  );
};

AlertDialogContainer.displayName = "HeroUI.AlertDialog.Container";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Dialog
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogDialogProps extends DialogPrimitiveProps {}

const AlertDialogDialog = ({children, className, ...props}: AlertDialogDialogProps) => {
  const {placement, slots} = use(AlertDialogContext);

  return (
    <DialogPrimitive
      className={composeSlotClassName(slots?.dialog, className)}
      data-placement={placement}
      data-slot="alert-dialog-dialog"
      role="alertdialog"
      {...props}
    >
      {children}
    </DialogPrimitive>
  );
};

AlertDialogDialog.displayName = "HeroUI.AlertDialog.Dialog";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Header
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogHeader = ({children, className, ...props}: AlertDialogHeaderProps) => {
  const {slots} = use(AlertDialogContext);

  return (
    <div
      className={composeSlotClassName(slots?.header, className)}
      data-slot="alert-dialog-header"
      {...props}
    >
      {children}
    </div>
  );
};

AlertDialogHeader.displayName = "HeroUI.AlertDialog.Header";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Heading
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const AlertDialogHeading = ({children, className, ...props}: AlertDialogHeadingProps) => {
  const {slots} = use(AlertDialogContext);

  return (
    <HeadingPrimitive
      className={composeSlotClassName(slots?.heading, className)}
      data-slot="alert-dialog-heading"
      slot="title"
      {...props}
    >
      {children}
    </HeadingPrimitive>
  );
};

AlertDialogHeading.displayName = "HeroUI.AlertDialog.Heading";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Body
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogBodyProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogBody = ({children, className, ...props}: AlertDialogBodyProps) => {
  const {slots} = use(AlertDialogContext);

  return (
    <div
      className={composeSlotClassName(slots?.body, className)}
      data-slot="alert-dialog-body"
      {...props}
    >
      {children}
    </div>
  );
};

AlertDialogBody.displayName = "HeroUI.AlertDialog.Body";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Footer
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogFooter = ({children, className, ...props}: AlertDialogFooterProps) => {
  const {slots} = use(AlertDialogContext);

  return (
    <div
      className={composeSlotClassName(slots?.footer, className)}
      data-slot="alert-dialog-footer"
      {...props}
    >
      {children}
    </div>
  );
};

AlertDialogFooter.displayName = "HeroUI.AlertDialog.Footer";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Icon
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogIconProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  /**
   * The semantic status of the icon, affects background color and default icon
   * @default "danger"
   */
  status?: AlertDialogStatus;
}

const AlertDialogIcon = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  status = "danger",
  ...props
}: AlertDialogIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AlertDialogIconProps<E>>) => {
  const slots = useMemo(() => alertDialogVariants({status}), [status]);

  const getDefaultIcon = () => {
    switch (status) {
      case "default":
        return <InfoIcon data-slot="alert-dialog-default-icon" />;
      case "accent":
        return <InfoIcon data-slot="alert-dialog-default-icon" />;
      case "success":
        return <SuccessIcon data-slot="alert-dialog-default-icon" />;
      case "warning":
        return <WarningIcon data-slot="alert-dialog-default-icon" />;
      case "danger":
        return <DangerIcon data-slot="alert-dialog-default-icon" />;
      default:
        return <DangerIcon data-slot="alert-dialog-default-icon" />;
    }
  };

  return (
    <dom.div className={slots?.icon({className})} data-slot="alert-dialog-icon" {...(props as any)}>
      {children ?? getDefaultIcon()}
    </dom.div>
  );
};

AlertDialogIcon.displayName = "HeroUI.AlertDialog.Icon";

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Close Trigger
 * -----------------------------------------------------------------------------------------------*/
interface AlertDialogCloseTriggerProps extends ButtonPrimitiveProps {}

const AlertDialogCloseTrigger = ({className, ...rest}: AlertDialogCloseTriggerProps) => {
  const {slots} = use(AlertDialogContext);

  return (
    <CloseButton
      className={useResolvedClassName(className, slots?.closeTrigger())}
      data-slot="alert-dialog-close-trigger"
      slot="close"
      {...rest}
    />
  );
};

AlertDialogCloseTrigger.displayName = "HeroUI.AlertDialog.CloseTrigger";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogBackdrop,
  AlertDialogContainer,
  AlertDialogDialog,
  AlertDialogHeader,
  AlertDialogHeading,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogIcon,
  AlertDialogCloseTrigger,
};

export type {
  AlertDialogRootProps,
  AlertDialogTriggerProps,
  AlertDialogBackdropProps,
  AlertDialogContainerProps,
  AlertDialogDialogProps,
  AlertDialogHeaderProps,
  AlertDialogHeadingProps,
  AlertDialogBodyProps,
  AlertDialogFooterProps,
  AlertDialogIconProps,
  AlertDialogCloseTriggerProps,
  AlertDialogStatus,
};
