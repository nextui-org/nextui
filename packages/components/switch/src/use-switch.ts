import type {ToggleVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {toggle} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

export interface UseSwitchProps extends HTMLNextUIProps<"div">, ToggleVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export function useSwitch(originalProps: UseSwitchProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, toggle.variantKeys);

  const {ref, as, className, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      toggle({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  return {Component, styles, domRef, ...otherProps};
}

export type UseSwitchReturn = ReturnType<typeof useSwitch>;
