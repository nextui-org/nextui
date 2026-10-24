"use client";

import type {TagVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {Button as ButtonPrimitive} from "react-aria-components/Button";

import {tagVariants} from "@heroui/styles";
import React, {Children, createContext, use, useMemo} from "react";
import {Tag as TagPrimitive} from "react-aria-components/TagGroup";

import {pickChildren} from "../../utils/children";
import {useResolvedClassName} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {TagGroupContext} from "../tag-group";

/* -------------------------------------------------------------------------------------------------
 * Tag Context
 * -----------------------------------------------------------------------------------------------*/
type TagContext = {
  slots?: ReturnType<typeof tagVariants>;
};

const TagContext = createContext<TagContext>({});

/* -------------------------------------------------------------------------------------------------
 * Tag Root
 * -----------------------------------------------------------------------------------------------*/
interface TagRootProps extends ComponentPropsWithRef<typeof TagPrimitive>, TagVariants {}

const TagRoot = ({children, className, ...restProps}: TagRootProps) => {
  const {size, variant} = use(TagGroupContext);

  const slots = useMemo(() => tagVariants({size, variant}), [size, variant]);

  const textValue = useMemo(() => {
    if (typeof children === "string") {
      return children;
    }

    if (typeof children === "object") {
      return Children.toArray(children)
        .filter((node) => typeof node === "string")
        .at(0);
    }

    return undefined;
  }, [children]);

  // Extract custom RemoveButton from children if present
  const [childrenWithoutRemoveButton, removeButtonChildren] = useMemo(() => {
    if (typeof children === "function") {
      return [children, undefined];
    }

    return pickChildren(children, TagRemoveButton);
  }, [children]);

  const contextValue = useMemo(() => ({slots}), [slots]);

  return (
    <TagPrimitive
      className={useResolvedClassName(className, slots.base())}
      data-slot="tag"
      textValue={textValue}
      {...restProps}
    >
      {(renderProps) => (
        <TagContext value={contextValue}>
          {typeof children === "function" ? (
            children(renderProps)
          ) : (
            <>
              {childrenWithoutRemoveButton}
              {!!renderProps.allowsRemoving &&
                (removeButtonChildren && removeButtonChildren.length > 0 ? (
                  removeButtonChildren
                ) : (
                  <TagRemoveButton />
                ))}
            </>
          )}
        </TagContext>
      )}
    </TagPrimitive>
  );
};

TagRoot.displayName = "HeroUI.Tag";

/* -------------------------------------------------------------------------------------------------
 * Tag Remove Button
 * -----------------------------------------------------------------------------------------------*/
type TagRemoveButtonProps = ComponentPropsWithRef<typeof ButtonPrimitive> & {
  children?: React.ReactNode;
};

const TagRemoveButton = ({children, className, ...restProps}: TagRemoveButtonProps) => {
  const {slots} = use(TagContext);

  return (
    <CloseButton
      aria-label="Remove tag"
      className={useResolvedClassName(className, slots?.removeButton())}
      data-slot="tag-remove-button"
      slot="remove"
      {...restProps}
    >
      {children}
    </CloseButton>
  );
};

TagRemoveButton.displayName = "HeroUI.Tag.RemoveButton";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TagRoot, TagRemoveButton};

export type {TagRootProps, TagRemoveButtonProps};
