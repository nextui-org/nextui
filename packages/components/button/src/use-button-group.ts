import type {ButtonProps} from "./index";
import type {ReactRef} from "@nextui-org/shared-utils";
import type {ButtonGroupVariantProps} from "@nextui-org/theme";
import type {AriaButtonProps} from "@react-types/button";

import {buttonGroup} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {useMemo, useCallback} from "react";
interface Props extends HTMLNextUIProps<"div">, ButtonGroupVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Whether the buttons are disabled.
   * @default false
   */
  isDisabled?: ButtonProps["isDisabled"];
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

export type UseButtonGroupProps = Props &
  Omit<ButtonProps, "ref" | "fullWidth" | keyof AriaButtonProps>;

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
    [...Object.values(variantProps), className],
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
