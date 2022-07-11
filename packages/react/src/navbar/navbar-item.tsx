import React from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {StyledNavbarItem, NavbarItemVariantsProps} from "./navbar.styles";

export interface Props extends Omit<HTMLNextUIProps<"li">, keyof NavbarItemVariantsProps> {
  children?: React.ReactNode | React.ReactNode[];
}

export type NavbarItemProps = Props & NavbarItemVariantsProps;

const NavbarItem = forwardRef<NavbarItemProps, "li">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {children, className, ...otherProps} = props;

  return (
    <StyledNavbarItem
      ref={domRef}
      className={clsx("nextui-navbar-item", className)}
      {...otherProps}
    >
      {children}
    </StyledNavbarItem>
  );
});

if (__DEV__) {
  NavbarItem.displayName = "NextUI.NavbarItem";
}

NavbarItem.toString = () => ".nextui-navbar-item";

export default NavbarItem;
