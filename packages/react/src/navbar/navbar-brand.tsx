import React from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import NavbarItem, {NavbarItemProps} from "./navbar-item";
import {StyledNavbarBrand} from "./navbar.styles";

export interface NavbarBrandProps extends HTMLNextUIProps<"span"> {
  children?: React.ReactNode | React.ReactNode[];
  itemProps?: NavbarItemProps;
}

const NavbarBrand = forwardRef<NavbarBrandProps, "span">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {children, className, itemProps, ...otherProps} = props;

  return (
    <NavbarItem {...itemProps}>
      <StyledNavbarBrand
        ref={domRef}
        className={clsx("nextui-navbar-brand", className)}
        {...otherProps}
      >
        {children}
      </StyledNavbarBrand>
    </NavbarItem>
  );
});

if (__DEV__) {
  NavbarBrand.displayName = "NextUI.NavbarBrand";
}

NavbarBrand.toString = () => ".nextui-navbar-brand";

export default NavbarBrand;
