import React, {useMemo} from "react";

import {forwardRef} from "../utils/system";
import {CSS} from "../theme/stitches.config";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";
import {Link, LinkProps} from "../index";

import NavbarItem, {NavbarItemProps} from "./navbar-item";

interface Props extends LinkProps {
  itemCss?: CSS;
  itemClassName?: string;
}

export type NavbarLinkProps = Props & Omit<NavbarItemProps, "css" | "className">;

const NavbarLink = forwardRef<NavbarLinkProps, "a">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {
    children,
    isActive,
    color,
    activeColor,
    underlineHeight,
    itemCss,
    itemClassName,
    isDisabled,
    css,
    variant,
    className,
    ...otherProps
  } = props;

  const linkCss = useMemo(() => {
    if (color || css?.["$$linkColor"]) {
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
    <NavbarItem
      activeColor={activeColor}
      className={itemClassName}
      css={itemCss}
      isActive={isActive}
      isDisabled={isDisabled}
      underlineHeight={underlineHeight}
      variant={variant}
    >
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
