import type {CodeVariantProps} from "@nextui-org/theme";

import {code} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

export interface UseCodeProps extends HTMLNextUIProps<"code">, CodeVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export function useCode(originalProps: UseCodeProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, code.variantKeys);

  const {ref, as, className, ...otherProps} = props;

  const Component = as || "code";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      code({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  return {Component, as, styles, domRef, ...otherProps};
}

export type UseCodeReturn = ReturnType<typeof useCode>;
