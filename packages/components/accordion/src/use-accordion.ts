import type {MultipleSelection} from "@react-types/shared";
import type {AriaAccordionProps} from "@react-types/accordion";
import type {AccordionGroupVariantProps} from "@heroui/theme";
import type {HTMLHeroUIProps, PropGetter} from "@heroui/system";

import {useProviderContext} from "@heroui/system";
import {ReactRef, filterDOMProps} from "@heroui/react-utils";
import {Key, useCallback} from "react";
import {mergeProps} from "@react-aria/utils";
import {accordion} from "@heroui/theme";
import {useDOMRef} from "@heroui/react-utils";
import {useMemo} from "react";
import {DividerProps} from "@heroui/divider";
import type {AccordionGroupVariantProps} from "@nextui-org/theme";

import {accordion} from "@nextui-org/theme";
import {PropGetter, useProviderContext} from "@nextui-org/system";
import {filterDOMProps, ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {Children, isValidElement, Key, useCallback, useMemo} from "react";
import {DividerProps} from "@nextui-org/divider";
import {useDisclosureGroupState} from "@react-stately/disclosure";

import {mergeProps} from "@react-aria/utils";
import {clsx} from "@heroui/shared-utils";

import {AccordionItemProps} from "./accordion-item";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Whether to display a divider at the bottom of the each accordion item.
   *
   * @default true
   */
  showDivider?: boolean;
  /**
   * The divider props.
   */
  dividerProps?: Partial<DividerProps>;
  allowsMultipleExpanded?: boolean;
  /**
   * Whether to keep the accordion content mounted when collapsed.
   * @default false
   */
  keepContentMounted?: boolean;
  /**
   * The accordion items classNames.
   */
  itemClasses?: AccordionItemProps["classNames"];
  disabledKeys?: Iterable<Key>;
}

export type UseAccordionProps<T extends object = {}> = Props &
  AccordionGroupVariantProps &
  AriaAccordionProps<T> &
  MultipleSelection &
  AccordionGroupVariantProps &
  Pick<
    AccordionItemProps,
    | "isCompact"
    | "isDisabled"
    | "hideIndicator"
    | "disableAnimation"
    | "disableIndicatorAnimation"
    | "motionProps"
  >;

export type ValuesType = {
  focusedKey?: Key | null;
  isCompact?: AccordionItemProps["isCompact"];
  isDisabled?: AccordionItemProps["isDisabled"];
  hideIndicator?: AccordionItemProps["hideIndicator"];
  disableAnimation?: AccordionItemProps["disableAnimation"];
  keepContentMounted?: Props["keepContentMounted"];
  disableIndicatorAnimation?: AccordionItemProps["disableAnimation"];
  motionProps?: AccordionItemProps["motionProps"];
  disabledKeys?: Iterable<Key>;
  lastChildId?: string;
  dividerProps?: Partial<DividerProps>;
};

export function useAccordion<T extends object>(originalProps: UseAccordionProps<T>) {
  const state = useDisclosureGroupState(originalProps);
  const globalContext = useProviderContext();

  const {
    as,
    ref,
    motionProps,
    isCompact = false,
    isDisabled,
    hideIndicator = false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    disableIndicatorAnimation = false,
    disabledKeys,
    variant,
    className,
    children,
    dividerProps,
  } = originalProps;

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const lastChild = Children.toArray(children).at(-1);
  const lastChildId = isValidElement(lastChild) ? lastChild.props.id : undefined;

  const values: ValuesType = useMemo(
    () => ({
      motionProps,
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      disableIndicatorAnimation,
      disabledKeys,
      lastChildId,
      dividerProps,
    }),
    [
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      state?.expandedKeys.values,
      disableIndicatorAnimation,
      state.expandedKeys.size,
      motionProps,
      disabledKeys,
      lastChildId,
    ],
  );

  const domRef = useDOMRef(ref);
  const classNames = useMemo(
    () =>
      accordion({
        variant,
        className,
      }),
    [variant, className],
  );

  const getBaseProps: PropGetter = useCallback((props = {}) => {
    return {
      ref: domRef,
      "data-orientation": "vertical",
      ...mergeProps(
        filterDOMProps(originalProps, {
          enabled: shouldFilterDOMProps,
        }),
        props,
      ),
      className: clsx(classNames, className),
    };
  }, []);

  return {
    state,
    values,
    children,
    Component,
    getBaseProps,
    domRef,
  };
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
