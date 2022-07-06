import * as React from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import clsx from "../utils/clsx";
import {useDOMRef} from "../utils/dom";
import {__DEV__} from "../utils/assertion";

import {StyledBadge, StyledBadgePoints, BadgeVariantsProps} from "./badge.styles";

export type BadgePlacement = "bottom-left" | "bottom-right" | "top-left" | "top-right";

interface Props extends Omit<HTMLNextUIProps<"span">, keyof BadgeVariantsProps> {
  placement?: BadgePlacement;
  isVisible?: boolean;
  content?: string | number | React.ReactNode;
  children?: React.ReactNode;
}

export type BadgeProps = Props & BadgeVariantsProps;

export const Badge = forwardRef<BadgeProps, "span">((props, ref) => {
  const {
    children,
    enableShadow = false,
    placement = "top-right",
    variant = "default",
    className,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const badgeChildren = React.useMemo(() => {
    if (variant === "dot") {
      return null;
    }

    if (variant === "points") {
      return (
        <StyledBadgePoints className="nextui-badge-points">
          <span className="nextui-badge-point" />
          <span className="nextui-badge-point" />
          <span className="nextui-badge-point" />
        </StyledBadgePoints>
      );
    }

    return children;
  }, [variant, children]);

  return (
    <StyledBadge
      ref={domRef}
      className={clsx("nextui-badge", className)}
      enableShadow={variant === "default" && enableShadow}
      variant={variant}
      {...otherProps}
    >
      {badgeChildren}
    </StyledBadge>
  );
});

if (__DEV__) {
  Badge.displayName = "NextUI.Badge";
}

Badge.toString = () => ".nextui-badge";
