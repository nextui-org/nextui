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
    css,
    children,
    isActive,
    color,
    activeColor,
    underlineHeight,
    itemCss,
    itemClassName,
    isDisabled,
    hideIn,
    showIn,
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
      height: "100%",
      width: "fit-content",
      ...css,
    };
  }, [color, css]);

  return (
    <NavbarItem
      activeColor={activeColor}
      className={itemClassName}
      css={itemCss}
      hideIn={hideIn}
      isActive={isActive}
      isDisabled={isDisabled}
      showIn={showIn}
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
