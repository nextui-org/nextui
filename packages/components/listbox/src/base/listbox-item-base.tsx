import type {ListboxItemVariantProps, ListboxItemSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaOptionProps} from "@react-aria/listbox";
import type {FocusableProps, PressEvents} from "@react-types/shared";

import {BaseItem, ItemProps} from "@nextui-org/aria-utils";
import {ReactNode} from "react";

export type ListboxItemSelectedIconProps = {
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
   * The listbox item title.
   */
  title?: ReactNode | string;
  /**
   * The listbox item subtitle.
   */
  description?: ReactNode | string;
  /**
   * The listbox item start content.
   */
  startContent?: ReactNode;
  /**
   * The listbox item end content.
   */
  endContent?: ReactNode;
  /**
   * Whether the listbox press events are disabled.
   * @default false
   */
  isReadOnly?: boolean;
  /**
   * The listbox item `selected` icon, it's usually an checkmark icon.
   * If you pass a function, NextUI will expose the current selected icon and the selected status,
   * In case you want to use a custom indicator or modify the current one.
   *
   * Important: The selected icon will be rendered only if the listbox selection mode is different than `none`.
   */
  selectedIcon?: ReactNode | ((props: ListboxItemSelectedIconProps) => ReactNode) | null;
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
   * <ListboxItem classNames={{
   *    base:"base-classes",
   *    title:"label-classes",
   *    wrapper:"wrapper-classes", // title and description wrapper
   *    description:"description-classes",
   *    selectedIcon:"selected-icon-classes",
   *    shortcut:"shortcut-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ListboxItemSlots>;
}

export type ListboxItemBaseProps<T extends object = {}> = Props<T> &
  ListboxItemVariantProps &
  AriaOptionProps &
  FocusableProps &
  PressEvents;

const ListboxItemBase = BaseItem as <T extends object>(
  props: ListboxItemBaseProps<T>,
) => JSX.Element;

export default ListboxItemBase;
