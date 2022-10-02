import type {HTMLNextUIProps} from "@nextui-org/system";
import type {
  SimpleColors,
  SimplePlacement,
  NormalSizes,
  NormalWeights,
} from "@nextui-org/shared-utils";

import {useMemo} from "react";

export interface UseBadgeProps extends HTMLNextUIProps<"span"> {
  /**
   * The content of the badge. The badge will be rendered relative to its children.
   */
  content?: string | number | React.ReactNode;
  /**
   * The badge variation.
   * @default "default"
   */
  variant?: "default" | "flat" | "dot" | "points" | "bordered";
  /**
   * The badge color.
   * @default "default"
   */
  color?: SimpleColors;
  /**
   * The badge size.
   * @default "md"
   */
  size?: NormalSizes;
  /**
   * The placement of the badge content.
   * @default "top-right"
   */
  placement?: SimplePlacement;
  /**
   * The border weight for bordered badge variation.
   * @default "normal"
   */
  borderWeight?: NormalWeights;
  /**
   * The vertical offset of the badge content.
   */
  verticalOffset?: string | number;
  /**
   * The horizontal offset of the badge content.
   */
  horizontalOffset?: string | number;
  /**
   * The wrapped shape the badge should overlap.
   * @default "rectangle"
   */
  shape?: "circle" | "rectangle";
  /**
   * Whether the badge is invisible.
   * @default false
   */
  isInvisible?: boolean;
  /**
   * Whether the badge corners should be squared.
   * @default false
   */
  isSquared?: boolean;
  /**
   * Whether the badge shadow should be enabled.
   * @default false
   */
  enableShadow?: boolean;
  /**
   * Whether the badge content animation should be disabled.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Whether the badge content animation should be disabled.
   * @default false
   */
  disableOutline?: boolean;
}

// disableOutline: false,
// isSquared: false,

export function useBadge(props: UseBadgeProps) {
  const {
    children,
    content,
    size = "md",
    color = "default",
    variant = "default",
    borderWeight = "normal",
    placement = "top-right",
    shape = "rectangle",
    enableShadow = false,
    verticalOffset,
    horizontalOffset,
    isInvisible = false,
    disableOutline = false,
    disableAnimation = false,
    ...otherProps
  } = props;

  const asChild = content !== undefined && !!children;

  const isOneChar = useMemo(() => {
    if (asChild && content && variant !== "points" && variant !== "dot") {
      return String(content)?.length === 1;
    }
    if (children && typeof children === "string") {
      return children.length === 1;
    }

    return false;
  }, [asChild, children, variant, content]);

  const badgeCss = useMemo(() => {
    const isHOffsetNumber = typeof horizontalOffset === "number";
    const isVOffsetNumber = typeof verticalOffset === "number";

    if (verticalOffset && horizontalOffset) {
      return {
        $$badgePlacementHOffset: isHOffsetNumber ? `${horizontalOffset}px` : horizontalOffset,
        $$badgePlacementVOffset: isVOffsetNumber ? `${verticalOffset}px` : verticalOffset,
      };
    }
    if (verticalOffset) {
      return {
        $$badgePlacementVOffset: isVOffsetNumber ? `${verticalOffset}px` : verticalOffset,
      };
    }
    if (horizontalOffset) {
      return {
        $$badgePlacementHOffset: isHOffsetNumber ? `${horizontalOffset}px` : horizontalOffset,
      };
    }

    return {};
  }, [verticalOffset, horizontalOffset]);

  return {
    children,
    content,
    variant,
    shape,
    size,
    color,
    borderWeight,
    asChild,
    isOneChar,
    badgeCss,
    placement,
    isInvisible,
    enableShadow,
    disableAnimation,
    disableOutline,
    ...otherProps,
  };
}

export type UseBadgeReturn = ReturnType<typeof useBadge>;
