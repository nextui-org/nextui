import type {DropdownItemVariantProps, DropdownItemSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaMenuItemProps} from "@react-aria/menu";
import type {FocusableProps, PressEvents} from "@react-types/shared";

import {BaseItem, ItemProps} from "@nextui-org/aria-utils";
import {ReactNode} from "react";

export type DropdownItemSelectedIconProps = {
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
   * The dropdown item title.
   */
  title?: ReactNode | string;
  /**
   * The dropdown item subtitle.
   */
  description?: ReactNode | string;
  /**
   * The dropdown item keyboard shortcut.
   */
  shortcut?: ReactNode | string;
  /**
   * The dropdown item start content.
   */
  startContent?: ReactNode;
  /**
   * The dropdown item end content.
   */
  endContent?: ReactNode;
  /**
   * The dropdown item `selected` icon, it's usually an checkmark icon.
   * If you pass a function, NextUI will expose the current selected icon and the selected status,
   * In case you want to use a custom indicator or modify the current one.
   *
   * Important: The selected icon will be rendered only if the menu selection mode is different than `none`.
   */
  selectedIcon?: ReactNode | ((props: DropdownItemSelectedIconProps) => ReactNode) | null;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <DropdownItem styles={{
   *    base:"base-classes",
   *    title:"label-classes",
   *    description:"description-classes",
   *    selectedIcon:"selected-icon-classes",
   *    shortcut:"shortcut-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<DropdownItemSlots>;
}

export type DropdownItemBaseProps<T extends object = {}> = Props<T> &
  DropdownItemVariantProps &
  AriaMenuItemProps &
  FocusableProps &
  PressEvents;

const DropdownItemBase = BaseItem as (props: DropdownItemBaseProps) => JSX.Element;

export default DropdownItemBase;
