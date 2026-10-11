"use client";

import type {CheckboxVariants} from "../checkbox";
import type {CheckboxGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {checkboxGroupVariants} from "@heroui/styles";
import React, {createContext} from "react";
import {CheckboxGroup as CheckboxGroupPrimitive} from "react-aria-components/CheckboxGroup";

import {useResolvedClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroup Context
 * -----------------------------------------------------------------------------------------------*/
interface CheckboxGroupContext {
  variant?: CheckboxVariants["variant"];
}

const CheckboxGroupContext = createContext<CheckboxGroupContext>({});

interface CheckboxGroupProps
  extends ComponentPropsWithRef<typeof CheckboxGroupPrimitive>, CheckboxGroupVariants {}

const CheckboxGroup = ({children, className, variant, ...props}: CheckboxGroupProps) => {
  const styles = React.useMemo(() => checkboxGroupVariants({variant}), [variant]);

  return (
    <CheckboxGroupContext.Provider value={{variant}}>
      <CheckboxGroupPrimitive
        className={useResolvedClassName(className, styles)}
        data-slot="checkbox-group"
        {...props}
      >
        {children}
      </CheckboxGroupPrimitive>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = "HeroUI.CheckboxGroup";

export {CheckboxGroup, CheckboxGroupContext};
export type {CheckboxGroupProps};
