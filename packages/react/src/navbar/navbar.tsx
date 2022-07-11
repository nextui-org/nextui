import React from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {CSS} from "../theme/stitches.config";
import {__DEV__} from "../utils/assertion";

import {StyledNavbar, StyledNavbarContainer, NavbarVariantsProps} from "./navbar.styles";
import NavbarBrand from "./navbar-brand";
import NavbarContent from "./navbar-content";
import NavbarItem from "./navbar-item";

export interface Props extends Omit<HTMLNextUIProps<"nav">, keyof NavbarVariantsProps> {
  children?: React.ReactNode | React.ReactNode[];
  enableShadowOnlyOnScroll?: boolean;
  containerCss?: CSS;
}

export type NavbarProps = Props & NavbarVariantsProps;

const Navbar = forwardRef<NavbarProps, "nav">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {
    children,
    className,
    containerCss,
    enableShadowOnlyOnScroll = false,
    ...otherProps
  } = props;

  return (
    <StyledNavbar ref={domRef} className={clsx("nextui-navbar", className)} {...otherProps}>
      <StyledNavbarContainer className="nextui-navbar-container" css={containerCss}>
        {children}
      </StyledNavbarContainer>
    </StyledNavbar>
  );
});

if (__DEV__) {
  Navbar.displayName = "NextUI.Navbar";
}

Navbar.toString = () => ".nextui-navbar";

type NavbarComponent<P = {}> = React.FC<P> & {
  Brand: typeof NavbarBrand;
  Content: typeof NavbarContent;
  Item: typeof NavbarItem;
};

export default Navbar as NavbarComponent<NavbarProps>;
