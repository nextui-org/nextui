import type {
  CircularProgressVariantProps,
  SlotsToClasses,
  CircularProgressSlots,
} from "@nextui-org/theme";
import type {PropGetter} from "@nextui-org/system";
import type {AriaProgressBarProps} from "@react-types/progress";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {circularProgress} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useMemo, useCallback} from "react";
import {useIsMounted} from "@nextui-org/use-is-mounted";

import {useProgressBar as useAriaProgress} from "./use-aria-progress";

export interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Whether to show the value label.
   * @default false
   */
  showValueLabel?: boolean;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <CircularProgress styles={{
   *    base:"base-classes",
   *    labelWrapper: "labelWrapper-classes",
   *    label: "label-classes",
   *    value: "value-classes",
   *    svg: "svg-classes",
   *    circle: "circle-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<CircularProgressSlots>;
}

export type UseCircularProgressProps = Props & AriaProgressBarProps & CircularProgressVariantProps;

export function useCircularProgress(originalProps: UseCircularProgressProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, circularProgress.variantKeys);

  const {
    ref,
    as,
    id,
    className,
    styles,
    label,
    valueLabel,
    value = undefined,
    minValue = 0,
    maxValue = 100,
    showValueLabel = false,
    formatOptions = {
      style: "percent",
    },
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const baseStyles = clsx(styles?.base, className);
  const [, isMounted] = useIsMounted({
    rerender: true,
    delay: 100,
  });

  // default isIndeterminate to true
  const isIndeterminate = (originalProps.isIndeterminate ?? true) && value === undefined;

  const {progressBarProps, labelProps} = useAriaProgress({
    id,
    label,
    value,
    minValue,
    maxValue,
    valueLabel,
    formatOptions,
    isIndeterminate,
    "aria-labelledby": originalProps["aria-labelledby"],
    "aria-label": originalProps["aria-label"],
  });

  const slots = useMemo(
    () =>
      circularProgress({
        ...variantProps,
        isIndeterminate,
      }),
    [isIndeterminate, ...Object.values(variantProps)],
  );

  const selfMounted = originalProps.disableAnimation ? true : isMounted;

  const center = 16;
  const strokeWidth = originalProps.size === "xs" ? 2 : 3;
  const radius = 16 - strokeWidth;
  const circumference = 2 * radius * Math.PI;

  const percentage = useMemo(() => {
    if (!selfMounted) {
      return 0;
    }

    if (isIndeterminate) {
      return 0.25;
    }

    return value ? (value - minValue) / (maxValue - minValue) : 0;
  }, [selfMounted, value, minValue, maxValue, isIndeterminate]);

  const offset = circumference - percentage * circumference;

  const getProgressBarProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: domRef,
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(originalProps.isDisabled),
      className: slots.base({class: baseStyles}),
      ...mergeProps(progressBarProps, otherProps, props),
    }),
    [
      domRef,
      slots,
      isIndeterminate,
      originalProps.isDisabled,
      baseStyles,
      progressBarProps,
      otherProps,
    ],
  );

  const getLabelProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.label({class: styles?.label}),
      ...mergeProps(labelProps, props),
    }),
    [slots, styles, labelProps],
  );

  const getSvgProps = useCallback<PropGetter>(
    (props = {}) => ({
      viewBox: "0 0 32 32",
      fill: "none",
      strokeWidth,
      className: slots.svg({class: styles?.svg}),
      ...props,
    }),
    [strokeWidth, slots, styles],
  );

  const getCircleProps = useCallback<PropGetter>(
    (props = {}) => ({
      cx: center,
      cy: center,
      r: radius,
      role: "presentation",
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: offset,
      transform: "rotate(-90 16 16)",
      className: slots.circle({class: styles?.circle}),
      ...props,
    }),
    [slots, styles, offset, circumference, radius],
  );

  return {
    Component,
    domRef,
    slots,
    styles,
    label,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
    getSvgProps,
    getCircleProps,
  };
}

export type UseCircularProgressReturn = ReturnType<typeof useCircularProgress>;
