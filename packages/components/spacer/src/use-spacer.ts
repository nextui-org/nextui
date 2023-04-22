import type {SpacerVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {spacer} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

export interface UseSpacerProps extends HTMLNextUIProps<"span", SpacerVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The x-axis margin.
   * @default 1
   */
  x?: number;
  /**
   * The y-axis margin.
   * @default 1
   */
  y?: number;
}

export const getMargin = (num: number): string => {
  return `calc(${num * 15.25}pt + 1px * ${num - 1})`;
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
