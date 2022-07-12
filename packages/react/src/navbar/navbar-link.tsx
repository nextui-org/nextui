import React, {useMemo} from "react";

import {forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";
import {Link, LinkProps} from "../index";

import NavbarItem, {NavbarItemProps} from "./navbar-item";

export interface NavbarLinkProps extends LinkProps {
  itemProps?: NavbarItemProps;
}

const NavbarLink = forwardRef<NavbarLinkProps, "a">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {children, className, color, css, itemProps, ...otherProps} = props;

  const linkCss = useMemo(() => {
    if (color) {
      return {
        ...css,
      };
    }

    return {
      color: "inherit",
      ...css,
    };
  }, [color, css]);

  return (
    <NavbarItem {...itemProps}>
      <Link
        ref={domRef}
        className={clsx("nextui-navbar-link", className)}
        color={color}
        css={linkCss}
        {...otherProps}
      >
        {children}
      </Link>
    </NavbarItem>
  );
});

if (__DEV__) {
  NavbarLink.displayName = "NextUI.NavbarLink";
}

NavbarLink.toString = () => ".nextui-navbar-link";

export default NavbarLink;
