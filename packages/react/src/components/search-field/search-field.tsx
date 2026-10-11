"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SearchFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {searchFieldVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Input as InputPrimitive} from "react-aria-components/Input";
import {SearchField as SearchFieldPrimitive} from "react-aria-components/SearchField";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {IconSearch} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * SearchField Context
 * -----------------------------------------------------------------------------------------------*/
type SearchFieldContext = {
  slots?: ReturnType<typeof searchFieldVariants>;
};

const SearchFieldContext = createContext<SearchFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * SearchField Root
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldRootProps
  extends ComponentPropsWithRef<typeof SearchFieldPrimitive>, SearchFieldVariants {}

const SearchFieldRoot = ({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: SearchFieldRootProps) => {
  const slots = React.useMemo(
    () => searchFieldVariants({fullWidth, variant}),
    [fullWidth, variant],
  );
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <SearchFieldContext value={contextValue}>
      <SearchFieldPrimitive
        data-slot="search-field"
        {...props}
        className={useResolvedClassName(className, slots?.base())}
      >
        {children}
      </SearchFieldPrimitive>
    </SearchFieldContext>
  );
};

SearchFieldRoot.displayName = "HeroUI.SearchField";

/* -------------------------------------------------------------------------------------------------
 * SearchField Group
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldGroupProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const SearchFieldGroup = ({children, className, ...props}: SearchFieldGroupProps) => {
  const {slots} = use(SearchFieldContext);

  return (
    <GroupPrimitive
      className={useResolvedClassName(className, slots?.group())}
      data-slot="search-field-group"
      {...props}
    >
      {children}
    </GroupPrimitive>
  );
};

SearchFieldGroup.displayName = "HeroUI.SearchField.Group";

/* -------------------------------------------------------------------------------------------------
 * SearchField Input
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {}

const SearchFieldInput = ({className, ...props}: SearchFieldInputProps) => {
  const {slots} = use(SearchFieldContext);

  return (
    <InputPrimitive
      className={useResolvedClassName(className, slots?.input())}
      data-slot="search-field-input"
      {...props}
    />
  );
};

SearchFieldInput.displayName = "HeroUI.SearchField.Input";

/* -------------------------------------------------------------------------------------------------
 * SearchField Search Icon
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldSearchIconProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

const SearchFieldSearchIcon = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: SearchFieldSearchIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SearchFieldSearchIconProps<E>>) => {
  const {slots} = use(SearchFieldContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: string;
      }>,
      {
        ...(props as any),
        className: composeSlotClassName(slots?.searchIcon, className),
        "data-slot": "search-field-search-icon",
      },
    );
  }

  return (
    <IconSearch
      className={composeSlotClassName(slots?.searchIcon, className)}
      data-slot="search-field-search-icon"
      {...(props as any)}
    />
  );
};

SearchFieldSearchIcon.displayName = "HeroUI.SearchField.SearchIcon";

/* -------------------------------------------------------------------------------------------------
 * SearchField Clear Button
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldClearButtonProps extends ComponentPropsWithRef<typeof CloseButton> {}

const SearchFieldClearButton = ({className, ...props}: SearchFieldClearButtonProps) => {
  const {slots} = use(SearchFieldContext);

  return (
    <CloseButton
      className={useResolvedClassName(className, slots?.clearButton())}
      data-slot="search-field-clear-button"
      slot="clear"
      {...props}
    />
  );
};

SearchFieldClearButton.displayName = "HeroUI.SearchField.ClearButton";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  SearchFieldRoot,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldSearchIcon,
  SearchFieldClearButton,
};

export type {
  SearchFieldRootProps,
  SearchFieldGroupProps,
  SearchFieldInputProps,
  SearchFieldSearchIconProps,
  SearchFieldClearButtonProps,
};
