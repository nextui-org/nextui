import type {SlotsToClasses, ToastSlots, ToastVariantProps} from "@nextui-org/theme";

import {
  HTMLNextUIProps,
  PropGetter,
  mapPropsVariants,
  useProviderContext,
} from "@nextui-org/system";
import {toast as toastTheme} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr, isEmpty, objectToDeps} from "@nextui-org/shared-utils";
import {ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {useToast as useToastAria, AriaToastProps} from "@react-aria/toast";
import {mergeProps} from "@react-aria/utils";
import {QueuedToast, ToastState} from "@react-stately/toast";

export interface ToastProps extends ToastVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * title of the toast
   */
  title?: string;
  /**
   * description of the toast
   */
  description?: string;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * addToast({
   *   classNames={{
   *    base:"base-classes",
   *    content: "content-classes"
   *    description: "description-classes"
   *    title: "title-classes"
   *    icon: "icon-classes",
   *    progressBar: "progress-bar-classes",
   *    progressTrack: "progress-track-classes",
   *    progressIndicator: "progress-indicator-classes",
   *    closeButton: "closeButton-classes"
   *    closeIcon: "closeIcon-classes"
   * }}
   * })
   * ```
   */
  classNames?: SlotsToClasses<ToastSlots>;
  /**
   * Content to be displayed in the end side of the alert
   */
  endContent?: ReactNode;
  /**
   * Icon to be displayed in the alert - overrides the default icon
   */
  icon?: ReactNode;
  /**
   * Whether the toast-icon is hidden.
   * @default false
   */
  hideIcon?: boolean;
  /**
   * Position of the toast in the view-port.
   */
  position?:
    | "right-bottom"
    | "left-bottom"
    | "center-bottom"
    | "right-top"
    | "left-top"
    | "center-top";
  /**
   * function which is called when toast is closed.
   */
  onClose?: () => void;
}

interface Props<T> extends HTMLNextUIProps<"div">, ToastProps {
  toast: QueuedToast<T>;
  state: ToastState<T>;
}

export type UseToastProps<T = ToastProps> = Props<T> &
  ToastVariantProps &
  Omit<AriaToastProps<T>, "div">;

export function useToast<T extends ToastProps>(originalProps: UseToastProps<T>) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, toastTheme.variantKeys);

  const [closeProgressBarValue, setCloseProgressBarValue] = useState(0);
  const [isToastHovered, setIsToastHovered] = useState(false);
  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isToastHovered) {
        return;
      }
      setCloseProgressBarValue(closeProgressBarValue + 10);
    }, Number(props.toast.timeout) / 20);

    return () => {
      clearInterval(interval);
    };
  });

  const {
    ref,
    as,
    title,
    description,
    className,
    classNames,
    toast,
    endContent,
    hideIcon = false,
    position = "right-bottom",
    state,
    ...otherProps
  } = props;

  const Component = as || "div";
  const icon: ReactNode = props.icon;

  const domRef = useDOMRef(ref);
  const baseStyles = clsx(className, classNames?.base);
  const {toastProps, contentProps, titleProps, descriptionProps, closeButtonProps} = useToastAria(
    props,
    props.state,
    domRef,
  );

  const slots = useMemo(
    () =>
      toastTheme({
        ...variantProps,
        disableAnimation,
      }),
    [objectToDeps(variantProps)],
  );

  const getToastProps: PropGetter = useCallback(
    (props = {}) => ({
      ref: domRef,
      className: slots.base({class: clsx(baseStyles, classNames?.base)}),
      onMouseEnter: () => {
        if (!toast.timer) {
          return;
        }
        setIsToastHovered(true);
        toast.timer.pause();
      },
      onMouseLeave: () => {
        if (!toast.timer) {
          return;
        }
        setIsToastHovered(false);
        toast.timer.resume();
      },
      "data-has-title": dataAttr(!isEmpty(title)),
      "data-has-description": dataAttr(!isEmpty(description)),
      ...mergeProps(props, otherProps, toastProps),
    }),
    [slots, classNames, toastProps],
  );

  const getIconProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.icon({class: classNames?.icon}),
      ...props,
    }),
    [],
  );

  const getContentProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.content({class: classNames?.content}),
      ...mergeProps(props, otherProps, contentProps),
    }),
    [contentProps],
  );

  const getTitleProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.title({class: classNames?.title}),
      ...mergeProps(props, otherProps, titleProps),
    }),
    [titleProps],
  );

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.description({class: classNames?.description}),
      ...mergeProps(props, otherProps, descriptionProps),
    }),
    [descriptionProps],
  );

  const getCloseButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.closeButton({class: classNames?.closeButton}),
      "aria-label": "close-button",
      ...mergeProps(props, otherProps, closeButtonProps, {onPress: props.onClose}),
    }),
    [closeButtonProps],
  );

  const isProgressBarHidden = toast.timeout ? "block" : "hidden";
  const progressBarProps = {
    classNames: {
      track: slots.progressTrack({class: clsx(classNames?.progressTrack)}),
      indicator: slots.progressIndicator({class: clsx(classNames?.progressIndicator)}),
    },
    radius: "none",
    isDisabled: true,
  };

  const getProgressBarProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.progressBar({class: clsx(isProgressBarHidden, classNames?.progressBar)}),
      ...mergeProps(props, otherProps, progressBarProps),
    }),
    [],
  );

  return {
    Component,
    title,
    description,
    icon,
    domRef,
    classNames,
    closeProgressBarValue,
    color: variantProps["color"],
    hideIcon,
    position,
    state,
    toast: props.toast,
    disableAnimation,
    getToastProps,
    getTitleProps,
    getContentProps,
    getDescriptionProps,
    getProgressBarProps,
    getCloseButtonProps,
    getIconProps,
    endContent,
  };
}

export type UseToastReturn = ReturnType<typeof useToast>;
