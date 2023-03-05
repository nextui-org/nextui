import type {SpinnerVariantProps, SpinnerSlots, SlotsToClasses} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {spinner} from "@nextui-org/theme";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {useDOMRef} from "@nextui-org/dom-utils";
import {useMemo, useCallback} from "react";

export interface UseSpinnerProps extends HTMLNextUIProps<"div", SpinnerVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Spinner label, in case you passed it will be used as `aria-label`.
   */
  label?: string;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Spinner styles={{
   *    base:"base-classes",
   *    line1: "circle1-classes",
   *    line2: "circle2-classes",
   *    label: "label-classes"
   * }} />
   * ```
   */
  styles?: SlotsToClasses<SpinnerSlots>;
}

export function useSpinner(originalProps: UseSpinnerProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, spinner.variantKeys);

  const {ref, children, className, styles, label: labelProp, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const slots = useMemo(() => spinner({...variantProps}), [...Object.values(variantProps)]);

  const baseStyles = clsx(styles?.base, className);

  const label = labelProp || children;

  const ariaLabel = useMemo(() => {
    if (label && typeof label === "string") {
      return label;
    }

    return !otherProps["aria-label"] ? "Loading" : "";
  }, [children, label, otherProps["aria-label"]]);

  const getSpinnerProps = useCallback<PropGetter>(
    () => ({
      "aria-label": ariaLabel,
      className: slots.base({
        class: baseStyles,
      }),
      ...otherProps,
    }),
    [ariaLabel, slots, baseStyles, otherProps],
  );

  return {domRef, label, slots, styles, getSpinnerProps};
}

export type UseSpinnerReturn = ReturnType<typeof useSpinner>;
