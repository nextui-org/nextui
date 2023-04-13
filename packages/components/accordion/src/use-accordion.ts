import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {ReactRef} from "@nextui-org/shared-utils";
import type {SelectionBehavior, MultipleSelection} from "@react-types/shared";
import type {AriaAccordionProps} from "@react-types/accordion";
import type {AccordionGroupVariantProps} from "@nextui-org/theme";

import {Key, useCallback} from "react";
import {TreeState, useTreeState} from "@react-stately/tree";
import {useAccordion as useReactAriaAccordion} from "@react-aria/accordion";
import {mergeProps} from "@react-aria/utils";
import {accordion} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {useMemo, useState} from "react";

import {AccordionItemProps} from "./accordion-item";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The accordion selection behavior.
   * @default "toggle"
   */
  selectionBehavior?: SelectionBehavior;
}

export type UseAccordionProps<T extends object = {}> = Props &
  AccordionGroupVariantProps &
  Pick<
    AccordionItemProps,
    | "isCompact"
    | "isDisabled"
    | "hideDivider"
    | "hideIndicator"
    | "disableAnimation"
    | "disableIndicatorAnimation"
    | "motionProps"
  > &
  AriaAccordionProps<T> &
  MultipleSelection;

export type ContextType<T extends object = {}> = {
  state: TreeState<T>;
  focusedKey?: Key | null;
  isCompact?: AccordionItemProps["isCompact"];
  isDisabled?: AccordionItemProps["isDisabled"];
  hideDivider?: AccordionItemProps["hideDivider"];
  hideIndicator?: AccordionItemProps["hideIndicator"];
  disableAnimation?: AccordionItemProps["disableAnimation"];
  disableIndicatorAnimation?: AccordionItemProps["disableAnimation"];
  motionProps?: AccordionItemProps["motionProps"];
};

export function useAccordion<T extends object>(props: UseAccordionProps<T>) {
  const {
    ref,
    as,
    children,
    className,
    items,
    variant,
    motionProps,
    expandedKeys,
    disabledKeys,
    selectedKeys,
    defaultExpandedKeys,
    selectionMode = "single",
    selectionBehavior = "toggle",
    disallowEmptySelection,
    defaultSelectedKeys,
    onExpandedChange,
    onSelectionChange,
    isCompact = false,
    isDisabled = false,
    hideDivider = false,
    hideIndicator = false,
    disableAnimation = false,
    disableIndicatorAnimation = false,
    ...otherProps
  } = props;

  const [focusedKey, setFocusedKey] = useState<Key | null>(null);

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const classNames = useMemo(
    () =>
      accordion({
        variant,
        className,
      }),
    [variant, className],
  );

  const commonProps = {
    children,
    items,
  };

  const expandableProps = {
    expandedKeys,
    defaultExpandedKeys,
    onExpandedChange,
  };

  const treeProps = {
    disabledKeys,
    selectedKeys,
    selectionMode,
    selectionBehavior,
    disallowEmptySelection,
    defaultSelectedKeys: defaultSelectedKeys ?? defaultExpandedKeys,
    onSelectionChange,
    ...commonProps,
    ...expandableProps,
  };

  const state = useTreeState(treeProps);

  state.selectionManager.setFocusedKey = (key: Key | null) => {
    setFocusedKey(key);
  };

  const {accordionProps} = useReactAriaAccordion(
    {
      ...commonProps,
      ...expandableProps,
    },
    state,
    domRef,
  );

  const context: ContextType<T> = useMemo(
    () => ({
      focusedKey,
      state,
      motionProps,
      isCompact,
      isDisabled,
      hideDivider,
      hideIndicator,
      disableAnimation,
      disableIndicatorAnimation,
    }),
    [
      state,
      focusedKey,
      isCompact,
      isDisabled,
      hideIndicator,
      hideDivider,
      disableAnimation,
      disableIndicatorAnimation,
      motionProps,
    ],
  );

  const getBaseProps: PropGetter = useCallback((props = {}) => {
    return {
      ref: domRef,
      className: classNames,
      "data-orientation": "vertical",
      ...mergeProps(accordionProps, otherProps, props),
    };
  }, []);

  const handleFocusChanged = useCallback((isFocused: boolean, key: Key | null) => {
    isFocused && setFocusedKey(key);
  }, []);

  return {Component, context, classNames, state, focusedKey, getBaseProps, handleFocusChanged};
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
