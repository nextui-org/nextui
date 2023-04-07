import type {DropdownItemVariantProps, DropdownItemSlots, SlotsToClasses} from "@nextui-org/theme";

import {BaseItem, ItemProps} from "@nextui-org/aria-utils";
import {ReactNode} from "react";

export interface Props<T extends object = {}>
  extends Omit<ItemProps<"button", T>, "children" | "title"> {
  /**
   * The content of the component.
   */
  children?: ReactNode | null;
  /**
   * The dropdown item title.
   */
  title?: ReactNode | string;
  /**
   * The accordion item subtitle.
   */
  description?: ReactNode | string;
  /**
   * The dropdown item start content.
   */
  startContent?: ReactNode;
  /**
   * The dropdown item end content.
   */
  endContent?: ReactNode;
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
   *    startContent:"startContent-classes",
   *    endContent:"endContent-classes",
   *    keyboardShortcut:"keyboardShortcut-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<DropdownItemSlots>;
}

export type DropdownItemBaseProps<T extends object = {}> = Props<T> & DropdownItemVariantProps;

const DropdownItemBase = BaseItem as (props: DropdownItemBaseProps) => JSX.Element;

export default DropdownItemBase;
