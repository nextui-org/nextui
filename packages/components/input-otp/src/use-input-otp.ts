import type {InputOtpVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {inputOtp} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {objectToDeps} from "@nextui-org/shared-utils";
import {useMemo} from "react";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export type UseInputOtpProps = Props & InputOtpVariantProps;

export function useInputOtp(originalProps: UseInputOtpProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, inputOtp.variantKeys);

  const {ref, as, className, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      inputOtp({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  return {Component, styles, domRef, ...otherProps};
}

export type UseInputOtpReturn = ReturnType<typeof useInputOtp>;
