import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {AriaMenuProps} from "@react-types/menu";

import {AriaMenuOptions, useMenu as useAriaMenu} from "@react-aria/menu";
import {menu, MenuVariantProps} from "@nextui-org/theme";
import {TreeState, useTreeState} from "@react-stately/tree";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useMemo} from "react";

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
    menuProps: userMenuProps,
    onClose,
    ...otherProps
  } = props;

  const Component = as || "ul";

  const domRef = useDOMRef(ref);

  const innerState = useTreeState(otherProps);

  const state = propState || innerState;

  const {menuProps} = useAriaMenu(otherProps, state, domRef);

  const styles = useMemo(() => menu({className}), [className]);

  const getMenuProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      className: styles,
      ...userMenuProps,
      ...menuProps,
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
  };
}

export type UseMenuReturn = ReturnType<typeof useMenu>;
