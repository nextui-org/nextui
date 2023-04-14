import type {
  AccordionItemVariantProps,
  AccordionItemSlots,
  SlotsToClasses,
} from "@nextui-org/theme";
import type {CollapseTransitionProps} from "@nextui-org/framer-transitions";

import {BaseItem, ItemProps} from "@nextui-org/aria-utils";
import {FocusableProps} from "@react-types/shared";
import {ReactNode} from "react";

export type AccordionItemIndicatorProps = {
  /**
   * The current indicator, usually an arrow icon.
   */
  indicator?: ReactNode;
  /**
   * The current open status.
   */
  isOpen?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
};

export interface Props<T extends object = {}>
  extends Omit<ItemProps<"button", T>, "children" | "title" | keyof FocusableProps>,
    FocusableProps {
  /**
   * The content of the component.
   */
  children?: ReactNode | null;
  /**
   * The accordion item title.
   */
  title?: ReactNode | string;
  /**
   * The accordion item subtitle.
   */
  subtitle?: ReactNode | string;
  /**
   * The accordion item `expanded` indicator, it's usually an arrow icon.
   * If you pass a function, NextUI will expose the current indicator and the open status,
   * In case you want to use a custom indicator or modify the current one.
   */
  indicator?: ReactNode | ((props: AccordionItemIndicatorProps) => ReactNode) | null;
  /**
   * The accordion item start content, it's usually an icon or avatar.
   */
  startContent?: ReactNode;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: CollapseTransitionProps;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <AccordionItem classNames={{
   *    base:"base-classes",
   *    heading: "heading-classes",
   *    trigger: "trigger-classes",
   *    startContent: "start-indicator-classes",
   *    indicator: "indicator-classes",
   *    titleWrapper: "title-wrapper-classes", // this wraps the title and subtitle
   *    title: "title-classes",
   *    subtitle: "subtitle-classes",
   *    content: "content-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<AccordionItemSlots>;
}

export type AccordionItemBaseProps<T extends object = {}> = Props<T> & AccordionItemVariantProps;

const AccordionItemBase = BaseItem as (props: AccordionItemBaseProps) => JSX.Element;

export default AccordionItemBase;
