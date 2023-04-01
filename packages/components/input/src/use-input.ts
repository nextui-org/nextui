import type {InputVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {input} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

export interface UseInputProps extends HTMLNextUIProps<"div", InputVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export function useInput(originalProps: UseInputProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, input.variantKeys);

  const {ref, as, className, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      input({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  return {Component, styles, domRef, ...otherProps};
}

export type UseInputReturn = ReturnType<typeof useInput>;
