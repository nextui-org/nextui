import React from "react";

import {CSSGapUnit, CSSColor} from "../theme";
import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {StyledNavbarContent, NavbarContentVariantsProps} from "./navbar.styles";

interface Props extends Omit<HTMLNextUIProps<"ul">, keyof NavbarContentVariantsProps | "color"> {
  children?: React.ReactNode | React.ReactNode[];
  /**
   * The gap between each item. Defaults to `$space$8 = 1rem`.
   */
  gap?: CSSGapUnit;
  /**
   * The main color of the navbar items.
   */
  color?: CSSColor;
}

export type NavbarContentProps = Props & NavbarContentVariantsProps;

const NavbarContent = forwardRef<NavbarContentProps, "ul">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {children, gap = "$8", color = "inherit", css, className, ...otherProps} = props;

  return (
    <StyledNavbarContent
      ref={domRef}
      className={clsx("nextui-navbar-content", className)}
      css={{
        gap,
        color,
        ...css,
      }}
      {...otherProps}
    >
      {children}
    </StyledNavbarContent>
  );
});

if (__DEV__) {
  NavbarContent.displayName = "NextUI.NavbarContent";
}

NavbarContent.toString = () => ".nextui-navbar-content";

export default NavbarContent;
