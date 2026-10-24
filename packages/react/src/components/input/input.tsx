"use client";

import type {InputVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {inputVariants} from "@heroui/styles";
import React, {use, useMemo} from "react";
import {Input as InputPrimitive} from "react-aria-components/Input";

import {useResolvedClassName} from "../../utils";
import {ComboBoxContext} from "../combo-box";
import {TextFieldContext} from "../textfield";

/* -------------------------------------------------------------------------------------------------
 * Input Root
 * -----------------------------------------------------------------------------------------------*/
interface InputRootProps extends ComponentPropsWithRef<typeof InputPrimitive>, InputVariants {}

const InputRoot = ({className, fullWidth, variant: variantProp, ...rest}: InputRootProps) => {
  const textFieldContext = use(TextFieldContext);
  const comboBoxContext = use(ComboBoxContext);

  // Use variant from context if not explicitly provided
  const variant = variantProp ?? textFieldContext.variant ?? comboBoxContext.variant;
  const styles = useMemo(() => inputVariants({fullWidth, variant}), [fullWidth, variant]);
  const resolvedClassName = useResolvedClassName(className, styles);

  return <InputPrimitive className={resolvedClassName} data-slot="input" {...rest} />;
};

InputRoot.displayName = "HeroUI.Input";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputRoot};

export type {InputRootProps};
