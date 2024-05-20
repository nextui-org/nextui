import type {
  CircularProgressVariantProps,
  SlotsToClasses,
  CircularProgressSlots,
} from "@nextui-org/theme";
import type {PropGetter} from "@nextui-org/system";
import type {AriaProgressBarProps} from "@react-types/progress";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {circularProgress} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/react-utils";
import {clampPercentage, clsx, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {ReactRef} from "@nextui-org/react-utils";
import {mergeProps} from "@react-aria/utils";
import {useMemo, useCallback} from "react";
import {useIsMounted} from "@nextui-org/use-is-mounted";
import {useProgressBar as useAriaProgress} from "@react-aria/progress";

export interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The stroke of the circle and tracker
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Whether to show the value label.
   * @default false
   */
  showValueLabel?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <CircularProgress classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    value: "value-classes",
   *    svg: "svg-classes", // the svg wrapper
   *    track: "track-classes", // the circle of the background
   *    indicator: "indicator-classes", // the circle of the progress
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CircularProgressSlots>;
}

export type UseCircularProgressProps = Props & AriaProgressBarProps & CircularProgressVariantProps;

export function useCircularProgress(originalProps: UseCircularProgressProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, circularProgress.variantKeys);

  const {
    ref,
    as,
    id,
    className,
    classNames,
    label,
    valueLabel,
    value = undefined,
    minValue = 0,
    maxValue = 100,
    strokeWidth: strokeWidthProp,
    showValueLabel = false,
    formatOptions = {
      style: "percent",
    },
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const baseStyles = clsx(classNames?.base, className);
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
    [objectToDeps(variantProps), isIndeterminate],
  );

  const selfMounted = originalProps.disableAnimation ? true : isMounted;

  const center = 16;
  const strokeWidth = strokeWidthProp || (originalProps.size === "sm" ? 2 : 3);

  const radius = 16 - strokeWidth;
  const circumference = 2 * radius * Math.PI;

  const percentage = useMemo(() => {
    if (!selfMounted) {
      return 0;
    }

    if (isIndeterminate) {
      return 0.25;
    }

    return value ? clampPercentage((value - minValue) / (maxValue - minValue), 1) : 0;
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
      className: slots.label({class: classNames?.label}),
      ...mergeProps(labelProps, props),
    }),
    [slots, classNames, labelProps],
  );

  const getSvgProps = useCallback<PropGetter>(
    (props = {}) => ({
      viewBox: "0 0 32 32",
      fill: "none",
      strokeWidth,
      className: slots.svg({class: classNames?.svg}),
      ...props,
    }),
    [strokeWidth, slots, classNames],
  );

  const getIndicatorProps = useCallback<PropGetter>(
    (props = {}) => ({
      cx: center,
      cy: center,
      r: radius,
      role: "presentation",
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: offset,
      transform: "rotate(-90 16 16)",
      strokeLinecap: "round",
      className: slots.indicator({class: classNames?.indicator}),
      ...props,
    }),
    [slots, classNames, offset, circumference, radius],
  );

  const getTrackProps = useCallback<PropGetter>(
    (props = {}) => ({
      cx: center,
      cy: center,
      r: radius,
      role: "presentation",
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: 0,
      transform: "rotate(-90 16 16)",
      strokeLinecap: "round",
      className: slots.track({class: classNames?.track}),
      ...props,
    }),
    [slots, classNames, circumference, radius],
  );

  return {
    Component,
    domRef,
    slots,
    classNames,
    label,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
    getSvgProps,
    getIndicatorProps,
    getTrackProps,
  };
}

export type UseCircularProgressReturn = ReturnType<typeof useCircularProgress>;
