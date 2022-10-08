import type {UseButtonProps} from "./use-button";

import {useMemo} from "react";
import {HTMLNextUIProps} from "@nextui-org/system";

export interface UseButtonGroupProps extends HTMLNextUIProps<"div", Omit<UseButtonProps, "ref">> {
  /**
   * Whether the buttons should be stacked vertically.
   * @default false
   */
  vertical?: boolean;
}

export function useButtonGroup(props: UseButtonGroupProps) {
  const {
    color = "default",
    size = "md",
    borderWeight = "normal",
    disabled = false,
    bordered = false,
    light = false,
    ghost = false,
    flat = false,
    shadow = false,
    auto = true,
    animated = true,
    rounded = false,
    ripple = true,
    vertical = false,
    ...otherProps
  } = props;

  const context = useMemo<UseButtonProps>(
    () => ({
      disabled,
      size,
      color,
      bordered,
      light,
      ghost,
      flat,
      shadow,
      auto,
      borderWeight,
      animated,
      rounded,
      ripple,
      isButtonGroup: true,
    }),
    [disabled, animated, size, ripple, color, bordered, light, ghost, flat, borderWeight],
  );

  const isGradient = color === "gradient";

  // TODO: the idea is to migrate the boolean names from "disable" to "isDisabled" (v12)
  return {
    context,
    size,
    isRounded: rounded,
    isBordered: bordered || ghost,
    isVertical: vertical,
    isGradient,
    ...otherProps,
  };
}

export type UseButtonGroupReturn = ReturnType<typeof useButtonGroup>;
