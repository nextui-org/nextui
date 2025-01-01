import type {SlotsToClasses, ToastSlots, ToastVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, PropGetter, mapPropsVariants} from "@nextui-org/system";
import {toast as toastTheme} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr, isEmpty, objectToDeps} from "@nextui-org/shared-utils";
import {ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {useToast as useToastAria, AriaToastProps} from "@react-aria/toast";
import {mergeProps} from "@react-aria/utils";
import {QueuedToast, ToastState} from "@react-stately/toast";

export interface ToastProps extends ToastVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Index of the toast
   */
  index?: number;
  /**
   * Total number of the toasts
   */
  total?: number;
  /**
   * title of the toast
   */
  title?: string;
  /**
   * description of the toast
   */
  description?: string;
  /**
   * Promise based on which the notification will be sent.
   */
  promise?: Promise<any>;
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
   *    progressTrack: "progress-track-classes",
   *    progressIndicator: "progress-indicator-classes",
   *    closeButton: "closeButton-classes"
   *    closeIcon: "closeIcon-classes"
   *   }}
   * })
   * ```
   */
  classNames?: SlotsToClasses<ToastSlots>;
  /**
   * Content to be displayed in the end side of the toast
   */
  endContent?: ReactNode;
  /**
   * Icon to be displayed in the toast - overrides the default icon
   */
  icon?: ReactNode;
  /**
   * Whether the toast-icon should be hidden.
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
  heights: number[];
  setHeights: (val: number[]) => void;
  disableAnimation: boolean;
  isRegionExpanded: boolean;
}

export type UseToastProps<T = ToastProps> = Props<T> &
  ToastVariantProps &
  Omit<AriaToastProps<T>, "div">;

export function useToast<T extends ToastProps>(originalProps: UseToastProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, toastTheme.variantKeys);

  const [isToastHovered, setIsToastHovered] = useState(false);
  const disableAnimation = originalProps.disableAnimation;

  const animationRef = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pausedTime = useRef<number>(0);

  useEffect(() => {
    const updateProgress = (timestamp: number) => {
      const timeout = props.toast.timeout;

      if (!timeout) {
        return;
      }

      if (startTime.current === null) {
        startTime.current = timestamp;
      }

      if (isToastHovered) {
        pausedTime.current += timestamp - startTime.current;
        startTime.current = null;
        animationRef.current = requestAnimationFrame(updateProgress);

        return;
      }

      const elapsed = timestamp - startTime.current + pausedTime.current;

      progressRef.current = Math.min((elapsed / timeout) * 100, 100);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progressRef.current}%`;
      }

      if (progressRef.current < 100) {
        animationRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [props.toast.timeout, isToastHovered]);

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
    isRegionExpanded,
    state,
    total = 1,
    index = 0,
    heights,
    promise: promiseProp,
    setHeights,
    ...otherProps
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(!!promiseProp);

  useEffect(() => {
    if (!promiseProp) return;
    promiseProp.finally(() => {
      setIsLoading(false);
    });
  }, [promiseProp]);

  const Component = as || "div";
  const icon: ReactNode = props.icon;

  const domRef = useDOMRef(ref);
  const baseStyles = clsx(className, classNames?.base);
  const {toastProps, contentProps, titleProps, descriptionProps, closeButtonProps} = useToastAria(
    props,
    props.state,
    domRef,
  );

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [initialHeight, setInitialHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (!domRef.current || !mounted) {
      return;
    }
    const toastNode = domRef.current;
    const originalHeight = toastNode.style.height;

    toastNode.style.height = "auto";
    const computedStyle = getComputedStyle(toastNode);
    const marginTop = parseFloat(computedStyle.marginTop);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    const newHeight = toastNode.getBoundingClientRect().height + marginTop + marginBottom;

    toastNode.style.height = originalHeight;

    setInitialHeight((prevHeight) => (prevHeight !== newHeight ? newHeight : prevHeight));
    const updatedHeights = [...heights];

    if (updatedHeights.length > index) {
      updatedHeights[index] = newHeight;
    } else {
      updatedHeights.push(newHeight);
    }
    setHeights(updatedHeights);
  }, [mounted, total, setHeights, index]);

  let liftHeight = 4;

  for (let idx = index + 1; idx < total; idx++) {
    liftHeight += heights[idx];
  }

  const frontHeight = heights[heights.length - 1];

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
      onPointerEnter: () => {
        if (!toast.timer) {
          return;
        }
        setIsToastHovered(true);
        toast.timer.pause();
      },
      onPointerLeave: () => {
        if (!toast.timer) {
          return;
        }
        setIsToastHovered(false);
        toast.timer.resume();
      },
      "data-has-title": dataAttr(!isEmpty(title)),
      "data-has-description": dataAttr(!isEmpty(description)),
      "data-toast": true,
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
      ...mergeProps(props, closeButtonProps, {onPress: originalProps.onClose}),
    }),
    [closeButtonProps],
  );

  return {
    Component,
    title,
    description,
    icon,
    domRef,
    classNames,
    color: variantProps["color"],
    hideIcon,
    position,
    state,
    toast: props.toast,
    disableAnimation,
    isProgressBarVisible: !!props.toast.timeout,
    total,
    index,
    getToastProps,
    getTitleProps,
    getContentProps,
    getDescriptionProps,
    getCloseButtonProps,
    getIconProps,
    progressBarRef,
    endContent,
    slots,
    isRegionExpanded,
    liftHeight,
    frontHeight,
    initialHeight,
    isLoading,
  };
}

export type UseToastReturn = ReturnType<typeof useToast>;
