"use client";

import type {NumberFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {numberFieldVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Input as InputPrimitive} from "react-aria-components/Input";
import {NumberField as NumberFieldPrimitive} from "react-aria-components/NumberField";

import {useResolvedClassName} from "../../utils/compose";
import {IconMinus, IconPlus} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * NumberField Context
 * -----------------------------------------------------------------------------------------------*/
type NumberFieldContext = {
  slots?: ReturnType<typeof numberFieldVariants>;
};

const NumberFieldContext = createContext<NumberFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * NumberField Root
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldRootProps
  extends ComponentPropsWithRef<typeof NumberFieldPrimitive>, NumberFieldVariants {}

const NumberFieldRoot = ({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: NumberFieldRootProps) => {
  const slots = React.useMemo(
    () => numberFieldVariants({fullWidth, variant}),
    [fullWidth, variant],
  );
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <NumberFieldContext value={contextValue}>
      <NumberFieldPrimitive
        data-slot="number-field"
        {...props}
        className={useResolvedClassName(className, slots?.base())}
      >
        {children}
      </NumberFieldPrimitive>
    </NumberFieldContext>
  );
};

NumberFieldRoot.displayName = "HeroUI.NumberField";

/* -------------------------------------------------------------------------------------------------
 * NumberField Group
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldGroupProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const NumberFieldGroup = ({children, className, ...props}: NumberFieldGroupProps) => {
  const {slots} = use(NumberFieldContext);

  return (
    <GroupPrimitive
      className={useResolvedClassName(className, slots?.group())}
      data-slot="number-field-group"
      {...props}
    >
      {children}
    </GroupPrimitive>
  );
};

NumberFieldGroup.displayName = "HeroUI.NumberField.Group";

/* -------------------------------------------------------------------------------------------------
 * NumberField Input
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {}

const NumberFieldInput = ({className, ...props}: NumberFieldInputProps) => {
  const {slots} = use(NumberFieldContext);

  return (
    <InputPrimitive
      className={useResolvedClassName(className, slots?.input())}
      data-slot="number-field-input"
      {...props}
    />
  );
};

NumberFieldInput.displayName = "HeroUI.NumberField.Input";

/* -------------------------------------------------------------------------------------------------
 * NumberField Increment Button
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldIncrementButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const NumberFieldIncrementButton = ({
  children,
  className,
  ...props
}: NumberFieldIncrementButtonProps) => {
  const {slots} = use(NumberFieldContext);

  return (
    <ButtonPrimitive
      className={useResolvedClassName(className, slots?.incrementButton())}
      data-slot="number-field-increment-button"
      slot="increment"
      {...props}
    >
      {children && React.isValidElement(children) ? (
        children
      ) : (
        <IconPlus data-slot="number-field-increment-button-icon" />
      )}
    </ButtonPrimitive>
  );
};

NumberFieldIncrementButton.displayName = "HeroUI.NumberField.IncrementButton";

/* -------------------------------------------------------------------------------------------------
 * NumberField Decrement Button
 * -----------------------------------------------------------------------------------------------*/
interface NumberFieldDecrementButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const NumberFieldDecrementButton = ({
  children,
  className,
  ...props
}: NumberFieldDecrementButtonProps) => {
  const {slots} = use(NumberFieldContext);

  return (
    <ButtonPrimitive
      className={useResolvedClassName(className, slots?.decrementButton())}
      data-slot="number-field-decrement-button"
      slot="decrement"
      {...props}
    >
      {children && React.isValidElement(children) ? (
        children
      ) : (
        <IconMinus data-slot="number-field-decrement-button-icon" />
      )}
    </ButtonPrimitive>
  );
};

NumberFieldDecrementButton.displayName = "HeroUI.NumberField.DecrementButton";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  NumberFieldRoot,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrementButton,
  NumberFieldDecrementButton,
};

export type {
  NumberFieldRootProps,
  NumberFieldGroupProps,
  NumberFieldInputProps,
  NumberFieldIncrementButtonProps,
  NumberFieldDecrementButtonProps,
};
