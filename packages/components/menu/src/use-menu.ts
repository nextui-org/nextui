import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {AriaMenuProps} from "@react-types/menu";

import {AriaMenuOptions, useMenu as useAriaMenu} from "@react-aria/menu";
import {menu, MenuVariantProps, SlotsToClasses, MenuSlots} from "@nextui-org/theme";
import {TreeState, useTreeState} from "@react-stately/tree";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useMemo} from "react";
import {clsx} from "@nextui-org/shared-utils";

import {MenuItemProps} from "./menu-item";

interface Props<T> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The controlled state of the menu.
   */
  state?: TreeState<T>;
  /**
   * The menu aria props.
   */
  menuProps?: AriaMenuOptions<T>;
  /**
   * The menu items variant.
   */
  variant?: MenuItemProps["variant"];
  /**
   * The menu items color.
   */
  color?: MenuItemProps["color"];
  /**
   *  Provides content to display when there are no items.
   * @default "No items."
   */
  emptyContent?: React.ReactNode;
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Whether the menu should close when the menu item is selected.
   * @default true
   */
  closeOnSelect?: MenuItemProps["closeOnSelect"];
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Listbox classNames={{
   *    base:"base-classes",
   *    emptyContent: "empty-content-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<MenuSlots>;
  /**
   * The menu items classNames.
   */
  itemClasses?: MenuItemProps["classNames"];
}

export type UseMenuProps<T = object> = Props<T> &
  Omit<HTMLNextUIProps<"ul">, keyof AriaMenuProps<T>> &
  AriaMenuProps<T> &
  MenuVariantProps;

export function useMenu(props: UseMenuProps) {
  const {
    as,
    ref,
    variant,
    color,
    disableAnimation,
    onAction,
    closeOnSelect,
    itemClasses,
    className,
    state: propState,
    emptyContent = "No items.",
    menuProps: userMenuProps,
    onClose,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "ul";

  const domRef = useDOMRef(ref);

  const innerState = useTreeState(otherProps);

  const state = propState || innerState;

  const {menuProps} = useAriaMenu(otherProps, state, domRef);

  const slots = useMemo(() => menu({className}), [className]);
  const baseStyles = clsx(classNames?.base, className);

  const getMenuProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...userMenuProps,
      ...menuProps,
      ...props,
    };
  };

  const getEmptyContentProps: PropGetter = (props = {}) => {
    return {
      children: emptyContent,
      className: slots.emptyContent({class: classNames?.emptyContent}),
      ...props,
    };
  };

  return {
    Component,
    state,
    variant,
    color,
    disableAnimation,
    onAction,
    onClose,
    closeOnSelect,
    className,
    itemClasses,
    getMenuProps,
    getEmptyContentProps,
  };
}

export type UseMenuReturn = ReturnType<typeof useMenu>;
