import type {RefAttributes, PropsWithoutRef} from "react";

import React from "react";

import {forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {pickChild} from "../utils/collections";
import {__DEV__} from "../utils/assertion";

import NavbarBrand from "./navbar-brand";
import NavbarContent from "./navbar-content";
import NavbarItem from "./navbar-item";
import NavbarLink from "./navbar-link";
import NavbarToggle from "./navbar-toggle";
import NavbarCollapse from "./navbar-collapse";
import NavbarCollapseItem from "./navbar-collapse-item";
import {NavbarProvider} from "./navbar-context";
import {useNavbar, UseNavbarProps} from "./use-navbar";
import {StyledNavbar, StyledNavbarContainer} from "./navbar.styles";

export interface NavbarProps extends UseNavbarProps {
  children?: React.ReactNode | React.ReactNode[];
}

const Navbar = forwardRef<NavbarProps, "nav">((props, ref) => {
  const {children, ...otherProps} = props;

  const domRef = useDOMRef(ref);
  const context = useNavbar(otherProps);

  // validates if contains a NextUI Navbar Collapse as a child
  const [withoutCollapseChildren, collapseChildren] = pickChild(children, NavbarCollapse);

  return (
    <NavbarProvider value={context}>
      <StyledNavbar
        ref={domRef}
        className={clsx("nextui-navbar", context.className)}
        css={context.navbarCss}
        disableBlur={context.disableBlur}
        isBordered={context.isBordered}
        variant={context.variant}
        {...context.otherProps}
      >
        <StyledNavbarContainer className="nextui-navbar-container" css={context.containerCss}>
          {withoutCollapseChildren}
        </StyledNavbarContainer>
        {collapseChildren}
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
  Collapse: typeof NavbarCollapse;
  CollapseItem: typeof NavbarCollapseItem;
};

export default Navbar as NavbarComponent<HTMLElement, NavbarProps>;
