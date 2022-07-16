import {useMemo} from "react";

import {CSSGapUnit, CSSColor} from "../theme";
import {HTMLNextUIProps} from "../utils/system";

import {NavbarItemVariantsProps} from "./navbar.styles";

export interface UseNavbarContentProps extends Omit<HTMLNextUIProps<"ul">, "color"> {
  /**
   * The gap between each item
   * @default "$space$8 = 1rem" and "0px" (for highlight variants)
   */
  gap?: CSSGapUnit;
  /**
   * The main color of the navbar content items.
   */
  color?: CSSColor;
  /**
   * The active color of the navbar content items.
   * @default "$colors$link"
   */
  activeColor?: NavbarItemVariantsProps["activeColor"];
  /**
   * The height of the navbar content items's underline.
   * @default "normal = 4px"
   */
  underlineHeight?: NavbarItemVariantsProps["underlineHeight"];
  /**
   * The variant of the navbar content items.
   * @default "default"
   */
  variant?: NavbarItemVariantsProps["variant"];
}

/**
 * @internal
 */
export function useNavbarContent(props: UseNavbarContentProps = {}) {
  const {
    gap = "$8",
    color = "inherit",
    variant = "default",
    activeColor = "default",
    underlineHeight = "normal",
    css,
    className,
    ...otherProps
  } = props;

  const contentGap = useMemo(() => {
    const stringVariant = variant.toString?.();

    if (stringVariant.includes?.("highlight") && gap === "$8") {
      return "0px";
    }

    return gap;
  }, [variant, gap]);

  return {
    css,
    gap: contentGap,
    color,
    variant,
    activeColor,
    underlineHeight,
    className,
    otherProps,
  };
}

export type UseNavbarContentReturn = ReturnType<typeof useNavbarContent>;
