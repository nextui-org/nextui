import type {ProgressVariantProps, SlotsToClasses, ProgressSlots} from "@nextui-org/theme";
import type {PropGetter} from "@nextui-org/system";
import type {AriaProgressBarProps} from "@react-types/progress";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {progress} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useMemo, useCallback} from "react";

import {useProgressBar as useAriaProgress} from "./use-aria-progress";

export interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Progress styles={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    filler: "filler-classes",
   *    labelWrapper: "labelWrapper-classes",
   *    label: "label-classes",
   *    value: "value-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<ProgressSlots>;
}

export type UseProgressProps = Props & AriaProgressBarProps & ProgressVariantProps;

export function useProgress(originalProps: UseProgressProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, progress.variantKeys);

  const {
    ref,
    as,
    id,
    className,
    styles,
    label,
    valueLabel,
    value = 0,
    minValue = 0,
    maxValue = 100,
    showValueLabel = false,
    isIndeterminate = false,
    formatOptions = {
      style: "percent",
    },
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const baseStyles = clsx(styles?.base, className);

  const {progressBarProps, labelProps} = useAriaProgress({
    id,
    label,
    value,
    minValue,
    maxValue,
    valueLabel,
    isIndeterminate,
    formatOptions,
    "aria-labelledby": originalProps["aria-labelledby"],
    "aria-label": originalProps["aria-label"],
  });

  const slots = useMemo(
    () =>
      progress({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  // Calculate the width of the progress bar as a percentage
  const percentage = useMemo(
    () => (isIndeterminate ? undefined : ((value - minValue) / (maxValue - minValue)) * 100),
    [isIndeterminate, value, minValue, maxValue],
  );

  const barWidth = typeof percentage === "number" ? `${Math.round(percentage)}%` : undefined;

  const getProgressBarProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...mergeProps(progressBarProps, otherProps, props),
    }),
    [domRef, slots, baseStyles, progressBarProps, otherProps],
  );

  const getLabelProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.label({class: styles?.label}),
      ...mergeProps(labelProps, props),
    }),
    [slots, styles, labelProps],
  );

  return {
    Component,
    domRef,
    slots,
    styles,
    label,
    barWidth,
    percentage,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
  };
}

export type UseProgressReturn = ReturnType<typeof useProgress>;
