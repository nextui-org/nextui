import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {StyledBadgeRoot, StyledBadge, StyledBadgePoints} from "./badge.styles";
import {UseBadgeProps, useBadge} from "./use-badge";

export interface BadgeProps extends UseBadgeProps {}

const Badge = forwardRef<BadgeProps, "span">((props, ref) => {
  const {
    children,
    content,
    badgeCss,
    css,
    variant,
    asChild,
    isOneChar,
    isInvisible,
    disableAnimation,
    disableOutline,
    className,
    ...otherProps
  } = useBadge(props);

  const domRef = useDOMRef(ref);

  const badgeChildren = useMemo(() => {
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

  return (
    <StyledBadgeRoot ref={domRef}>
      {asChild && children}
      <StyledBadge
        asChild={asChild}
        className={clsx(
          "nextui-badge",
          {
            "nextui-badge--is-invisible": isInvisible,
          },
          className,
        )}
        css={{...badgeCss, ...css}}
        disableAnimation={disableAnimation || !asChild}
        disableOutline={variant === "bordered" || disableOutline}
        isOneChar={isOneChar}
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

export default Badge;
