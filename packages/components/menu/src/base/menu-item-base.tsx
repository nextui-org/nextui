import type {MenuItemVariantProps, MenuItemSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaMenuItemProps} from "@react-aria/menu";
import type {FocusableProps, PressEvents} from "@react-types/shared";

import {BaseItem, ItemProps} from "@nextui-org/aria-utils";
import {ReactNode} from "react";

export type MenuItemSelectedIconProps = {
  /**
   * The current icon, usually an checkmark icon.
   */
  icon?: ReactNode;
  /**
   * The current selected status.
   */
  isSelected?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
};

interface Props<T extends object = {}> extends Omit<ItemProps<"li", T>, "children" | "title"> {
  /**
   * The content of the component.
   */
  children?: ReactNode | null;
  /**
   * The menu item title.
   */
  title?: ReactNode | string;
  /**
   * The menu item subtitle.
   */
  description?: ReactNode | string;
  /**
   * The menu item keyboard shortcut.
   */
  shortcut?: ReactNode | string;
  /**
   * The menu item start content.
   */
  startContent?: ReactNode;
  /**
   * The menu item end content.
   */
  endContent?: ReactNode;
  /**
   * Whether the menu press events are disabled.
   * @default false
   */
  isReadOnly?: boolean;
  /**
   * Whether to hide the check icon when the items are selected.
   * @default false
   */
  hideSelectedIcon?: boolean;
  /**
   * The menu item `selected` icon, it's usually an checkmark icon.
   * If you pass a function, NextUI will expose the current selected icon and the selected status,
   * In case you want to use a custom indicator or modify the current one.
   *
   * Important: The selected icon will be rendered only if the menu selection mode is different than `none`.
   */
  selectedIcon?: ReactNode | ((props: MenuItemSelectedIconProps) => ReactNode) | null;
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <MenuItem classNames={{
   *    base:"base-classes",
   *    title:"label-classes",
   *    wrapper:"wrapper-classes", // title and description wrapper
   *    description:"description-classes",
   *    selectedIcon:"selected-icon-classes",
   *    shortcut:"shortcut-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<MenuItemSlots>;
}

export type MenuItemBaseProps<T extends object = {}> = Props<T> &
  MenuItemVariantProps &
  AriaMenuItemProps &
  FocusableProps &
  PressEvents;

const MenuItemBase = BaseItem as <T extends object>(props: MenuItemBaseProps<T>) => JSX.Element;

export default MenuItemBase;
