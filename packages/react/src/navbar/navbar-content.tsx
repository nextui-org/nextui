import React from "react";

import {forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {NavbarContentProvider} from "./navbar-content-context";
import {StyledNavbarContent} from "./navbar.styles";
import {useNavbarContent, UseNavbarContentProps} from "./use-navbar-content";

interface Props {
  /**
   * The content of the Navbar.Content. It is usually the `Navbar.Link` and `Navbar.Item`,
   */
  children?: React.ReactNode | React.ReactNode[];
}

export type NavbarContentProps = Props & UseNavbarContentProps;

const NavbarContent = forwardRef<NavbarContentProps, "ul">((props, ref) => {
  const {children, ...otherProps} = props;

  const context = useNavbarContent(otherProps);

  const domRef = useDOMRef(ref);

  return (
    <NavbarContentProvider value={context}>
      <StyledNavbarContent
        ref={domRef}
        className={clsx("nextui-navbar-content", context.className)}
        css={{
          gap: context.gap,
          color: context.color,
          ...context.css,
        }}
        {...context.otherProps}
      >
        {children}
      </StyledNavbarContent>
    </NavbarContentProvider>
  );
});

if (__DEV__) {
  NavbarContent.displayName = "NextUI.NavbarContent";
}

NavbarContent.toString = () => ".nextui-navbar-content";

export default NavbarContent;
