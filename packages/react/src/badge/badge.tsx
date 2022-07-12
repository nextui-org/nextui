import * as React from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import clsx from "../utils/clsx";
import {useDOMRef} from "../utils/dom";
import {__DEV__} from "../utils/assertion";

import {StyledBadge, StyledBadgePoints, StyledBadgeRoot, BadgeVariantsProps} from "./badge.styles";

interface Props extends Omit<HTMLNextUIProps<"span">, keyof BadgeVariantsProps> {
  children?: React.ReactNode;
  content?: string | number | React.ReactNode;
  isInvisible?: boolean;
  verticalOffset?: string | number;
  horizontalOffset?: string | number;
}

export type BadgeProps = Props & Omit<BadgeVariantsProps, "asChild" | "isOneChar">;

export const Badge = forwardRef<BadgeProps, "span">((props, ref) => {
  const {
    css,
    children,
    content,
    isInvisible = false,
    disableOutline,
    placement = "top-right",
    variant = "default",
    verticalOffset,
    horizontalOffset,
    disableAnimation = false,
    className,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const asChild = content !== undefined && !!children;

  const isOneChar = React.useMemo(() => {
    if (asChild && content && variant !== "points" && variant !== "dot") {
      return String(content)?.length === 1;
    }
    if (children && typeof children === "string") {
      return children.length === 1;
    }

    return false;
  }, [asChild, children, variant, content]);

  const badgeChildren = React.useMemo(() => {
    if (variant === "dot") {
      return null;
    }

    if (variant === "points") {
      return (
        <StyledBadgePoints className="nextui-badge-points">
          <span className="nextui-badge-point" data-testid="badge-point" />
          <span className="nextui-badge-point" data-testid="badge-point" />
          <span className="nextui-badge-point" data-testid="badge-point" />
        </StyledBadgePoints>
      );
    }

    return asChild ? content : children;
  }, [variant, isOneChar, asChild, content, children]);

  const badgeCss = React.useMemo(() => {
    const isHOffsetNumber = typeof horizontalOffset === "number";
    const isVOffsetNumber = typeof verticalOffset === "number";

    if (verticalOffset && horizontalOffset) {
      return {
        $$badgePlacementHOffset: isHOffsetNumber ? `${horizontalOffset}px` : horizontalOffset,
        $$badgePlacementVOffset: isVOffsetNumber ? `${verticalOffset}px` : verticalOffset,
        ...css,
      };
    }
    if (verticalOffset) {
      return {
        $$badgePlacementVOffset: isVOffsetNumber ? `${verticalOffset}px` : verticalOffset,
        ...css,
      };
    }
    if (horizontalOffset) {
      return {
        $$badgePlacementHOffset: isHOffsetNumber ? `${horizontalOffset}px` : horizontalOffset,
        ...css,
      };
    }

    return css;
  }, [verticalOffset, horizontalOffset, css]);

  return (
    <StyledBadgeRoot ref={domRef} className={clsx("nextui-badge-root", className)}>
      {asChild && children}
      <StyledBadge
        asChild={asChild}
        className={clsx("nextui-badge", {
          "nextui-badge--is-invisible": isInvisible,
        })}
        css={badgeCss}
        disableAnimation={disableAnimation || !asChild}
        disableOutline={variant === "bordered" || disableOutline}
        isOneChar={isOneChar}
        placement={placement}
        variant={variant}
        {...otherProps}
      >
        {badgeChildren}
      </StyledBadge>
    </StyledBadgeRoot>
  );
});

if (__DEV__) {
  Badge.displayName = "NextUI.Badge";
}

Badge.toString = () => ".nextui-badge";
