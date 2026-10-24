"use client";

import type {ComponentPropsWithRef} from "react";

import {menuSectionVariants} from "@heroui/styles";
import React from "react";
import {MenuSection as MenuSectionPrimitive} from "react-aria-components/Menu";

/* -------------------------------------------------------------------------------------------------
 * Menu Section Root
 * -----------------------------------------------------------------------------------------------*/
interface MenuSectionRootProps extends ComponentPropsWithRef<typeof MenuSectionPrimitive> {
  className?: string;
}

const MenuSectionRoot = ({children, className, ...props}: MenuSectionRootProps) => {
  const styles = React.useMemo(
    () => menuSectionVariants({class: typeof className === "string" ? className : undefined}),
    [className],
  );

  return (
    <MenuSectionPrimitive className={styles} {...props}>
      {children}
    </MenuSectionPrimitive>
  );
};

MenuSectionRoot.displayName = "HeroUI.MenuSection";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MenuSectionRoot};

export type {MenuSectionRootProps};
