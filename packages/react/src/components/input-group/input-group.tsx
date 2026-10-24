"use client";

import type {InputGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {inputGroupVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Input as InputPrimitive} from "react-aria-components/Input";
import {TextArea as TextAreaPrimitive} from "react-aria-components/TextArea";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {TextFieldContext} from "../textfield";

/* -------------------------------------------------------------------------------------------------
 * InputGroup Context
 * -----------------------------------------------------------------------------------------------*/
type InputGroupContext = {
  slots?: ReturnType<typeof inputGroupVariants>;
};

const InputGroupContext = createContext<InputGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * InputGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupRootProps
  extends ComponentPropsWithRef<typeof GroupPrimitive>, InputGroupVariants {}

const InputGroupRoot = ({
  children,
  className,
  fullWidth,
  onClick,
  variant,
  ...props
}: InputGroupRootProps) => {
  const textFieldContext = use(TextFieldContext);
  const resolvedVariant = variant ?? textFieldContext?.variant;
  const groupRef = React.useRef<HTMLDivElement>(null);

  const slots = React.useMemo(
    () => inputGroupVariants({fullWidth, variant: resolvedVariant}),
    [fullWidth, resolvedVariant],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const input = groupRef.current?.querySelector("input");

    if (input && target !== input && !input.contains(target)) {
      input.focus();
    }

    onClick?.(e);
  };

  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <InputGroupContext value={contextValue}>
      <GroupPrimitive
        {...props}
        ref={groupRef}
        className={useResolvedClassName(className, slots?.base())}
        data-slot="input-group"
        onClick={handleClick}
      >
        {children}
      </GroupPrimitive>
    </InputGroupContext>
  );
};

InputGroupRoot.displayName = "HeroUI.InputGroup";

/* -------------------------------------------------------------------------------------------------
 * InputGroup Input
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {}

const InputGroupInput = ({className, ...props}: InputGroupInputProps) => {
  const {slots} = use(InputGroupContext);

  return (
    <InputPrimitive
      className={useResolvedClassName(className, slots?.input())}
      data-slot="input-group-input"
      {...props}
    />
  );
};

InputGroupInput.displayName = "HeroUI.InputGroup.Input";

/* -------------------------------------------------------------------------------------------------
 * InputGroup Prefix
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupPrefixProps extends ComponentPropsWithRef<"div"> {}

const InputGroupPrefix = ({children, className, ...props}: InputGroupPrefixProps) => {
  const {slots} = use(InputGroupContext);

  return (
    <div
      className={composeSlotClassName(slots?.prefix, className)}
      data-slot="input-group-prefix"
      {...props}
    >
      {children}
    </div>
  );
};

InputGroupPrefix.displayName = "HeroUI.InputGroup.Prefix";

/* -------------------------------------------------------------------------------------------------
 * InputGroup TextArea
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupTextAreaProps extends ComponentPropsWithRef<typeof TextAreaPrimitive> {}

const InputGroupTextArea = ({className, ...props}: InputGroupTextAreaProps) => {
  const {slots} = use(InputGroupContext);

  return (
    <TextAreaPrimitive
      className={useResolvedClassName(className, slots?.input())}
      data-slot="input-group-textarea"
      {...props}
    />
  );
};

InputGroupTextArea.displayName = "HeroUI.InputGroup.TextArea";

/* -------------------------------------------------------------------------------------------------
 * InputGroup Suffix
 * -----------------------------------------------------------------------------------------------*/
interface InputGroupSuffixProps extends ComponentPropsWithRef<"div"> {}

const InputGroupSuffix = ({children, className, ...props}: InputGroupSuffixProps) => {
  const {slots} = use(InputGroupContext);

  return (
    <div
      className={composeSlotClassName(slots?.suffix, className)}
      data-slot="input-group-suffix"
      {...props}
    >
      {children}
    </div>
  );
};

InputGroupSuffix.displayName = "HeroUI.InputGroup.Suffix";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputGroupRoot, InputGroupInput, InputGroupTextArea, InputGroupPrefix, InputGroupSuffix};

export type {
  InputGroupRootProps,
  InputGroupInputProps,
  InputGroupTextAreaProps,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
};
