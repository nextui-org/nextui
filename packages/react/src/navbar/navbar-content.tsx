import React from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {CSS} from "../theme/stitches.config";
import {__DEV__} from "../utils/assertion";

import {StyledNavbarContent, NavbarContentVariantsProps} from "./navbar.styles";

type GapUnit = CSS["gap"];

interface Props extends Omit<HTMLNextUIProps<"ul">, keyof NavbarContentVariantsProps> {
  children?: React.ReactNode | React.ReactNode[];
  /**
   * The gap between each item. Defaults to `$space$8 = 1rem`.
   */
  gap?: GapUnit;
}

export type NavbarContentProps = Props & NavbarContentVariantsProps;

const NavbarContent = forwardRef<NavbarContentProps, "ul">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {children, gap = "$8", css, className, ...otherProps} = props;

  return (
    <StyledNavbarContent
      ref={domRef}
      className={clsx("nextui-navbar-content", className)}
      css={{
        gap,
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
