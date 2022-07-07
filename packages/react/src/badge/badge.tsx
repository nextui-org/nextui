import * as React from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import clsx from "../utils/clsx";
import {useDOMRef} from "../utils/dom";
import {__DEV__} from "../utils/assertion";

import {StyledBadge, StyledBadgePoints, StyledBadgeRoot, BadgeVariantsProps} from "./badge.styles";

interface Props extends Omit<HTMLNextUIProps<"span">, keyof BadgeVariantsProps> {
  invisible?: boolean;
  content?: string | number | React.ReactNode;
  verticalOffset?: number;
  horizontalOffset?: number;
  children?: React.ReactNode;
}

export type BadgeProps = Props & Omit<BadgeVariantsProps, "asChild" | "isOneChar">;

export const Badge = forwardRef<BadgeProps, "span">((props, ref) => {
  const {
    css,
    children,
    content,
    invisible = false,
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
  }, [variant, asChild, content, children]);

  const isOneChar = React.useMemo(() => {
    if (asChild && content && variant !== "points" && variant !== "dot") {
      return String(content)?.length === 1;
    }
    if (children && typeof children === "string") {
      return children.length === 1;
    }

    return false;
  }, [asChild, children, variant, content]);

  const badgeCss = React.useMemo(() => {
    if (verticalOffset && horizontalOffset) {
      return {
        $$badgePlacementHOffset: `${horizontalOffset}px`,
        $$badgePlacementVOffset: `${verticalOffset}px`,
        ...css,
      };
    }
    if (verticalOffset) {
      return {
        $$badgePlacementVOffset: `${verticalOffset}px`,
        ...css,
      };
    }
    if (horizontalOffset) {
      return {
        $$badgePlacementHOffset: `${horizontalOffset}px`,
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
          "nextui-badge--invisible": invisible,
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
