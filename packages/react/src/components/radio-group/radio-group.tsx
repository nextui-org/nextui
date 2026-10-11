"use client";

import type {RadioGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {radioGroupVariants} from "@heroui/styles";
import React from "react";
import {RadioGroup as RadioGroupPrimitive} from "react-aria-components/RadioGroup";

import {useResolvedClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Radio Group Root
 * -----------------------------------------------------------------------------------------------*/
interface RadioGroupRootProps
  extends ComponentPropsWithRef<typeof RadioGroupPrimitive>, RadioGroupVariants {}

const RadioGroupRoot = ({children, className, variant, ...props}: RadioGroupRootProps) => {
  const styles = React.useMemo(() => radioGroupVariants({variant}), [variant]);

  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      {...props}
      className={useResolvedClassName(className, styles)}
    >
      {children}
    </RadioGroupPrimitive>
  );
};

RadioGroupRoot.displayName = "HeroUI.RadioGroup";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {RadioGroupRoot};

export type {RadioGroupRootProps};
