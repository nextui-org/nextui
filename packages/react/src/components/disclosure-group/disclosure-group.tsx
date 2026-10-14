"use client";

import type {DisclosureGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {disclosureGroupVariants} from "@heroui/styles";
import React, {createContext} from "react";
import {DisclosureGroup as DisclosureGroupPrimitive} from "react-aria-components/DisclosureGroup";

import {useResolvedClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Disclosure Group Context
 * -----------------------------------------------------------------------------------------------*/
type DisclosureGroupContext = {
  slots?: ReturnType<typeof disclosureGroupVariants>;
};

const DisclosureGroupContext = createContext<DisclosureGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Group Root
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureGroupRootProps
  extends ComponentPropsWithRef<typeof DisclosureGroupPrimitive>, DisclosureGroupVariants {}

const DisclosureGroupRoot = ({children, className, ...props}: DisclosureGroupRootProps) => {
  const slots = React.useMemo(() => disclosureGroupVariants({}), []);

  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <DisclosureGroupContext value={contextValue}>
      <DisclosureGroupPrimitive
        data-slot="disclosure-group"
        {...props}
        className={useResolvedClassName(className, slots.base())}
      >
        {children}
      </DisclosureGroupPrimitive>
    </DisclosureGroupContext>
  );
};

DisclosureGroupRoot.displayName = "HeroUI.DisclosureGroup";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DisclosureGroupRoot};

export type {DisclosureGroupRootProps};
