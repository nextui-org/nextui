"use client";

import type {ComponentPropsWithRef} from "react";

import {headerVariants} from "@heroui/styles";
import {useMemo} from "react";
import {Header as HeaderPrimitive} from "react-aria-components/Header";

/* -------------------------------------------------------------------------------------------------
 * Header Root
 * -----------------------------------------------------------------------------------------------*/
interface HeaderRootProps extends ComponentPropsWithRef<typeof HeaderPrimitive> {}

const HeaderRoot = ({children, className, ...rest}: HeaderRootProps) => {
  const resolvedClassName = useMemo(() => headerVariants({className}), [className]);

  return (
    <HeaderPrimitive className={resolvedClassName} data-slot="header" {...rest}>
      {children}
    </HeaderPrimitive>
  );
};

HeaderRoot.displayName = "HeroUI.Header";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {HeaderRoot};

export type {HeaderRootProps};
