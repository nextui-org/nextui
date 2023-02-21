import type {ButtonProps} from "./index";
import type {ReactRef} from "@nextui-org/shared-utils";
import type {ButtonGroupVariantProps} from "@nextui-org/theme";

import {buttonGroup} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {useMemo, useCallback} from "react";
export interface UseButtonGroupProps
  extends HTMLNextUIProps<"div", Omit<ButtonProps, "ref" | "fullWidth">>,
    ButtonGroupVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
}

export type ContextType = {
  size?: ButtonProps["size"];
  color?: ButtonProps["color"];
  radius?: ButtonProps["radius"];
  variant?: ButtonProps["variant"];
  isDisabled?: ButtonProps["isDisabled"];
  disableAnimation?: ButtonProps["disableAnimation"];
  disableRipple?: ButtonProps["disableRipple"];
  fullWidth?: boolean;
};

export function useButtonGroup(originalProps: UseButtonGroupProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, buttonGroup.variantKeys);

  const {
    ref,
    as,
    children,
    color = "neutral",
    size = "md",
    variant = "solid",
    radius = "xl",
    isDisabled = false,
    disableAnimation = false,
    disableRipple = false,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      buttonGroup({
        ...variantProps,
        className,
      }),
    [variantProps, className],
  );

  const context = useMemo<ContextType>(
    () => ({
      size,
      color,
      variant,
      radius,
      isDisabled,
      disableAnimation,
      disableRipple,
      fullWidth: !!originalProps?.fullWidth,
    }),
    [
      size,
      color,
      variant,
      radius,
      isDisabled,
      disableAnimation,
      disableRipple,
      originalProps?.fullWidth,
    ],
  );

  const getButtonGroupProps = useCallback(
    () => ({
      role: "group",
      ...otherProps,
    }),
    [otherProps],
  );

  return {
    Component,
    children,
    domRef,
    context,
    styles,
    getButtonGroupProps,
  };
}

export type UseButtonGroupReturn = ReturnType<typeof useButtonGroup>;
