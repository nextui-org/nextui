import type {SpacerVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {spacer} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

import {spacing, Space} from "./utils";

export interface UseSpacerProps extends HTMLNextUIProps<"span", SpacerVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The x-axis margin.
   * @default 1
   *
   * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
   */
  x?: Space;
  /**
   * The y-axis margin.
   * @default 1
   *
   * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
   */
  y?: Space;
}

export const getMargin = (value: Space) => {
  return spacing[value] ?? value;
};

export function useSpacer(originalProps: UseSpacerProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, spacer.variantKeys);

  const {ref, as, className, x = 1, y = 1, ...otherProps} = props;

  const Component = as || "span";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      spacer({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const marginLeft = getMargin(x);
  const marginTop = getMargin(y);

  const getSpacerProps: PropGetter = (props = {}) => ({
    ref: domRef,
    ...props,
    ...otherProps,
    "aria-hidden": dataAttr(true),
    className: clsx(styles, props.className),
    style: {
      ...props.style,
      ...otherProps.style,
      marginLeft,
      marginTop,
    },
  });

  return {Component, getSpacerProps};
}

export type UseSpacerReturn = ReturnType<typeof useSpacer>;
