"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {MenuItemVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {MenuItemRenderProps} from "react-aria-components/Menu";

import {menuItemVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {MenuItem as MenuItemPrimitive} from "react-aria-components/Menu";

import {composeSlotClassName, useResolvedClassName} from "../../utils";
import {dom} from "../../utils/dom";
import {IconChevronRight} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * Menu Item Context
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemContext {
  slots?: ReturnType<typeof menuItemVariants>;
  state?: MenuItemRenderProps;
}

const MenuItemContext = createContext<MenuItemContext>({});

/* -------------------------------------------------------------------------------------------------
 * Menu Item Root
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemRootProps
  extends ComponentPropsWithRef<typeof MenuItemPrimitive>, MenuItemVariants {
  className?: string;
}

const MenuItemRoot = ({children, className, variant, ...props}: MenuItemRootProps) => {
  const slots = React.useMemo(() => menuItemVariants({variant}), [variant]);

  return (
    <MenuItemPrimitive
      className={useResolvedClassName(className, slots.item())}
      data-slot="menu-item"
      {...props}
    >
      {(values) => (
        <MenuItemContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </MenuItemContext>
      )}
    </MenuItemPrimitive>
  );
};

MenuItemRoot.displayName = "HeroUI.MenuItem";

/* -------------------------------------------------------------------------------------------------
 * Menu Item Indicator
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode | ((props: MenuItemRenderProps) => React.ReactNode);
  className?: string;
  type?: "checkmark" | "dot";
}

const MenuItemIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  type = "checkmark",
  ...props
}: MenuItemIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof MenuItemIndicatorProps<E>>) => {
  const {slots, state} = use(MenuItemContext);
  const isSelected = state?.isSelected;

  const content =
    typeof children === "function" ? (
      children(state ?? ({} as MenuItemRenderProps))
    ) : children ? (
      children
    ) : type === "dot" ? (
      <svg
        aria-hidden="true"
        data-slot="menu-item-indicator--dot"
        fill="currentColor"
        fillRule="evenodd"
        role="presentation"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path clipRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" fillRule="evenodd" />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        data-slot="menu-item-indicator--checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeDasharray={22}
        strokeDashoffset={isSelected ? 44 : 66}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 17 18"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
    );

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="menu-item-indicator"
      data-type={type}
      data-visible={isSelected || undefined}
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
};

MenuItemIndicator.displayName = "HeroUI.MenuItem.Indicator";

/* -------------------------------------------------------------------------------------------------
 * Menu Item Submenu Indicator
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemSubmenuIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

const MenuItemSubmenuIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: MenuItemSubmenuIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof MenuItemSubmenuIndicatorProps<E>>) => {
  const {slots, state} = use(MenuItemContext);
  const hasSubmenu = state?.hasSubmenu;

  if (!hasSubmenu) {
    return null;
  }

  const defaultContent = <IconChevronRight />;
  const content = children ?? defaultContent;

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.submenuIndicator, className)}
      data-slot="submenu-indicator"
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
};

MenuItemSubmenuIndicator.displayName = "HeroUI.MenuItem.SubmenuIndicator";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MenuItemRoot, MenuItemIndicator, MenuItemSubmenuIndicator};

export type {MenuItemRootProps, MenuItemIndicatorProps, MenuItemSubmenuIndicatorProps};
