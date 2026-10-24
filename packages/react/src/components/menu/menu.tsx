"use client";

import type {MenuVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {menuVariants} from "@heroui/styles";
import React from "react";
import {Menu as MenuPrimitive} from "react-aria-components/Menu";

import {useResolvedClassName} from "../../utils";

/* -------------------------------------------------------------------------------------------------
 * Menu Root
 * -----------------------------------------------------------------------------------------------*/
interface MenuRootProps<T extends object>
  extends ComponentPropsWithRef<typeof MenuPrimitive<T>>, MenuVariants {
  className?: string;
}

function MenuRoot<T extends object>({className, ...props}: MenuRootProps<T>) {
  const styles = React.useMemo(() => menuVariants(), []);

  return (
    <MenuPrimitive
      className={useResolvedClassName(className, styles)}
      data-slot="menu"
      {...props}
    />
  );
}

MenuRoot.displayName = "HeroUI.Menu";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MenuRoot};

export type {MenuRootProps};
