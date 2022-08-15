import React from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {StyledNavbarBrand, NavbarBrandVariantsProps} from "./navbar.styles";

export interface Props extends HTMLNextUIProps<"span"> {
  children?: React.ReactNode | React.ReactNode[];
}

export type NavbarBrandProps = Props & NavbarBrandVariantsProps;

const NavbarBrand = forwardRef<NavbarBrandProps, "span">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {children, className, ...otherProps} = props;

  return (
    <StyledNavbarBrand
      ref={domRef}
      className={clsx("nextui-navbar-brand", className)}
      {...otherProps}
    >
      {children}
    </StyledNavbarBrand>
  );
});

if (__DEV__) {
  NavbarBrand.displayName = "NextUI.NavbarBrand";
}

NavbarBrand.toString = () => ".nextui-navbar-brand";

export default NavbarBrand;
