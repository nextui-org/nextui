import type {ButtonProps} from "./index";
import type {ReactRef} from "@nextui-org/shared-utils";
import type {ButtonGroupVariantProps} from "@nextui-org/theme";

import {buttonGroup} from "@nextui-org/theme";
import {HTMLNextUIProps, PropGetter, mapPropsVariants} from "@nextui-org/system";
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
  isIconButton?: ButtonProps["isIconButton"];
  fullWidth?: boolean;
};

export type UseButtonGroupProps = Props &
  Pick<
    ButtonProps,
    "size" | "color" | "radius" | "variant" | "isIconButton" | "disableAnimation" | "disableRipple"
  >;

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
    isIconButton = false,
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
      isIconButton,
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
      isIconButton,
      disableAnimation,
      disableRipple,
      originalProps?.fullWidth,
    ],
  );

  const getButtonGroupProps: PropGetter = useCallback(
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
