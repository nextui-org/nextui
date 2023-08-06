import type {SelectVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {select} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useMemo} from "react";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export type UseSelectProps = Props & SelectVariantProps;

export function useSelect(originalProps: UseSelectProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, select.variantKeys);

  const {ref, as, className, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      select({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  return {Component, styles, domRef, ...otherProps};
}

export type UseSelectReturn = ReturnType<typeof useSelect>;
