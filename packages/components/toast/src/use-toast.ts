import type {SlotsToClasses, ToastSlots, ToastVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, PropGetter, mapPropsVariants} from "@nextui-org/system";
import {toast as toastTheme} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {clsx, objectToDeps} from "@nextui-org/shared-utils";
import {ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {useToast as useToastAria, AriaToastProps} from "@react-aria/toast";
import {mergeProps} from "@react-aria/utils";
import {QueuedToast, ToastState} from "@react-stately/toast";
import {InfoFilledIcon} from "@nextui-org/shared-icons";

export type ToastType = {
  title: string;
  description: string;
  config: ToastVariantProps;
};

interface Props<T> extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  toast: QueuedToast<T>;
  state: ToastState<T>;
  classNames?: SlotsToClasses<ToastSlots>;
  /**
   * Content to be displayed in the end side of the alert
   */
  endContent?: ReactNode;
}

export type UseToastProps<T = ToastType> = Props<T> &
  ToastVariantProps &
  Omit<AriaToastProps<T>, "div">;

export function useToast<T extends ToastType>(originalProps: UseToastProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, toastTheme.variantKeys);

  const [closeProgressBarValue, setCloseProgressBarValue] = useState(0);
  const [isToastClicked, setIsToastClicked] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isToastClicked) {
        return;
      }
      setCloseProgressBarValue(closeProgressBarValue + 10);
    }, Number(props.toast.timeout) / 20);

    return () => {
      clearInterval(interval);
    };
  });

  const {ref, as, className, classNames, toast, endContent, ...otherProps} = props;

  const Component = as || "div";
  let Icon = InfoFilledIcon;

  const domRef = useDOMRef(ref);
  const baseStyles = clsx(className, classNames?.base);
  const {toastProps, contentProps, titleProps, descriptionProps, closeButtonProps} = useToastAria(
    props,
    props.state,
    domRef,
  );

  const styles = useMemo(
    () =>
      toastTheme({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const slots = useMemo(
    () =>
      toastTheme({
        ...variantProps,
      }),
    [objectToDeps(variantProps)],
  );

  const getToastProps: PropGetter = useCallback(
    (props = {}) => ({
      ref: domRef,
      className: slots.base({class: clsx(baseStyles, classNames?.base)}),
      onMouseDown: () => {
        if (!toast.timer) {
          return;
        }
        setIsToastClicked(true);
        toast.timer.pause();
      },
      onMouseUp: () => {
        if (!toast.timer) {
          return;
        }
        setIsToastClicked(false);
        toast.timer.resume();
      },
      ...mergeProps(props, otherProps, toastProps),
    }),
    [slots, classNames, toastProps],
  );

  const getIconProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.content({class: classNames?.icon}),
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
      ...mergeProps(props, otherProps, closeButtonProps),
    }),
    [closeButtonProps],
  );

  const isProgressBarHidden = toast.timeout ? "block" : "hidden";
  const progressBarProps = {
    classNames: {
      track: slots.progressTrack({class: clsx(classNames?.progressTrack)}),
      indicator: "bg-default-600",
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
    Icon,
    styles,
    domRef,
    classNames,
    closeProgressBarValue,
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
