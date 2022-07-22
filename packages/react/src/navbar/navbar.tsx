import type {RefAttributes, PropsWithoutRef} from "react";

import React from "react";

import {forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import NavbarBrand from "./navbar-brand";
import NavbarContent from "./navbar-content";
import NavbarItem from "./navbar-item";
import NavbarLink from "./navbar-link";
import NavbarToggle from "./navbar-toggle";
import NavbarList from "./navbar-list";
import {NavbarProvider} from "./navbar-context";
import {useNavbar, UseNavbarProps} from "./use-navbar";
import {StyledNavbar, StyledNavbarContainer} from "./navbar.styles";

export interface NavbarProps extends UseNavbarProps {
  children?: React.ReactNode | React.ReactNode[];
}

const Navbar = forwardRef<NavbarProps, "nav">((props, ref) => {
  const {children, ...otherProps} = props;

  const context = useNavbar(otherProps);
  const domRef = useDOMRef(ref);

  return (
    <NavbarProvider value={context}>
      <StyledNavbar
        ref={domRef}
        className={clsx("nextui-navbar", context.className)}
        css={context.navbarCss}
        variant={context.variant}
        {...otherProps}
      >
        <StyledNavbarContainer className="nextui-navbar-container" css={context.containerCss}>
          {children}
        </StyledNavbarContainer>
      </StyledNavbar>
    </NavbarProvider>
  );
});

if (__DEV__) {
  Navbar.displayName = "NextUI.Navbar";
}

Navbar.toString = () => ".nextui-navbar";

type NavbarComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Brand: typeof NavbarBrand;
  Content: typeof NavbarContent;
  Item: typeof NavbarItem;
  Link: typeof NavbarLink;
  Toggle: typeof NavbarToggle;
  List: typeof NavbarList;
};

export default Navbar as NavbarComponent<HTMLElement, NavbarProps>;
