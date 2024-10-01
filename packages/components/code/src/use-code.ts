import type {CodeVariantProps} from "@nextui-org/theme";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system-rsc";

import {code} from "@nextui-org/theme";
import {mapPropsVariants} from "@nextui-org/system-rsc";
import {ReactRef} from "@nextui-org/react-utils";
import {useMemo} from "react";
import {objectToDeps} from "@nextui-org/shared-utils";

export interface UseCodeProps extends HTMLNextUIProps<"code">, CodeVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export function useCode(originalProps: UseCodeProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, code.variantKeys);

  const {as, children, className, ...otherProps} = props;

  const Component = as || "code";

  const classNames = useMemo(
    () =>
      code({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const getCodeProps: PropGetter = () => {
    return {
      className: classNames,
      ...otherProps,
    };
  };

  return {Component, children, getCodeProps};
}

export type UseCodeReturn = ReturnType<typeof useCode>;
