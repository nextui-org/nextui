import React from "react";

import {forwardRef} from "../utils/system";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {NavbarCollapseProvider} from "./navbar-collapse-context";
import {useNavbarCollapse, UseNavbarCollapseProps} from "./use-navbar-collapse";
import {StyledNavbarCollapse, StyledNavbarCollapseWrapper} from "./navbar.styles";

export type NavbarCollapseProps = UseNavbarCollapseProps;

const NavbarCollapse = forwardRef<NavbarCollapseProps, "ul">((props, ref) => {
  const context = useNavbarCollapse({ref, ...props});

  return (
    <NavbarCollapseProvider value={context}>
      <StyledNavbarCollapse
        ref={context.domRef}
        className={clsx("nextui-navbar-collapse", context.className)}
        css={context.collpaseCss}
        isOpen={context.isOpen}
        {...context.otherProps}
      >
        <StyledNavbarCollapseWrapper className="nextui-navbar-collapse-wrapper">
          {context.children}
        </StyledNavbarCollapseWrapper>
      </StyledNavbarCollapse>
    </NavbarCollapseProvider>
  );
});

if (__DEV__) {
  NavbarCollapse.displayName = "NextUI.NavbarCollapse";
}

NavbarCollapse.toString = () => ".nextui-navbar-collapse";

export default NavbarCollapse;
