import React, {useMemo} from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {useNavbarContentContext} from "./navbar-content-context";
import {StyledNavbarItem, NavbarItemVariantsProps} from "./navbar.styles";

export interface Props
  extends Omit<HTMLNextUIProps<"li">, keyof NavbarItemVariantsProps | "color"> {
  children?: React.ReactNode | React.ReactNode[];
}

export type NavbarItemProps = Props & NavbarItemVariantsProps;

const NavbarItem = forwardRef<NavbarItemProps, "li">((props, ref) => {
  const {children, className, variant, activeColor, isActive, underlineHeight, css, ...otherProps} =
    props;

  const contentProps = useNavbarContentContext();
  const domRef = useDOMRef(ref);

  const itemVariant = variant || contentProps?.variant;

  const itemCss = useMemo(() => {
    const customCss = [];
    const stringVariant = itemVariant?.toString();

    if (!contentProps) {
      customCss.push({
        $$navbarContentItemGap: "$space$8",
      });
    }

    if (itemVariant && stringVariant.includes?.("highlight")) {
      customCss.push({
        dflex: "center",
        position: "relative",
        height: "$$navbarItemMaxHeight",
        px: "$$navbarContentItemHorizontalPadding",
      });
    }

    if (
      itemVariant &&
      stringVariant.includes?.("highlight") &&
      stringVariant.includes?.("rounded")
    ) {
      customCss.push({
        "&:before": {
          borderRadius: "$pill",
        },
      });
    }

    if (isActive && !stringVariant.includes?.("highlight")) {
      customCss.push({
        $$navbarItemFontWeight: "$fontWeights$semibold",
      });
    }

    const customCssObject = customCss.reduce((acc, css) => {
      return {...acc, ...css};
    }, {});

    return {
      ...customCssObject,
      ...css,
    };
  }, [contentProps, isActive, itemVariant, css]);

  return (
    <StyledNavbarItem
      ref={domRef}
      activeColor={activeColor || contentProps?.activeColor}
      className={clsx("nextui-navbar-item", className)}
      css={itemCss}
      isActive={isActive}
      underlineHeight={underlineHeight || contentProps?.underlineHeight}
      variant={itemVariant}
      {...otherProps}
    >
      {children}
    </StyledNavbarItem>
  );
});

if (__DEV__) {
  NavbarItem.displayName = "NextUI.NavbarItem";
}

NavbarItem.toString = () => ".nextui-navbar-item";

export default NavbarItem;
