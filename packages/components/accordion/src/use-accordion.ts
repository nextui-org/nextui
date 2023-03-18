import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {ReactRef} from "@nextui-org/shared-utils";
import type {SelectionBehavior, MultipleSelection} from "@react-types/shared";
import type {AriaAccordionProps} from "@react-types/accordion";

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
  Pick<AccordionItemProps, "size" | "radius" | "isDisabled" | "disableAnimation"> &
  AriaAccordionProps<T> &
  MultipleSelection;

export type ContextType<T extends object = {}> = {
  state: TreeState<T>;
  focusedKey?: Key | null;
  size?: AccordionItemProps["size"];
  radius?: AccordionItemProps["radius"];
  isDisabled?: AccordionItemProps["isDisabled"];
  disableAnimation?: AccordionItemProps["disableAnimation"];
};

export function useAccordion<T extends object>(props: UseAccordionProps<T>) {
  const {
    ref,
    as,
    children,
    className,
    items,
    expandedKeys,
    defaultExpandedKeys,
    disabledKeys,
    selectedKeys,
    selectionMode = "single",
    selectionBehavior = "toggle",
    disallowEmptySelection,
    defaultSelectedKeys,
    onExpandedChange,
    onSelectionChange,
    size = "md",
    radius = "lg",
    isDisabled = false,
    disableAnimation = false,
    ...otherProps
  } = props;

  const [focusedKey, setFocusedKey] = useState<Key | null>(null);

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      accordion({
        className,
      }),
    [className],
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
      size,
      radius,
      focusedKey,
      state,
      isDisabled,
      disableAnimation,
    }),
    [size, radius, state, focusedKey, isDisabled, disableAnimation],
  );

  const getBaseProps: PropGetter = useCallback((props = {}) => {
    return {
      ref: domRef,
      className: styles,
      "data-orientation": "vertical",
      ...mergeProps(accordionProps, otherProps, props),
    };
  }, []);

  const handleFocusChanged = useCallback((isFocused: boolean, key: Key | null) => {
    isFocused && setFocusedKey(key);
  }, []);

  return {Component, context, styles, state, focusedKey, getBaseProps, handleFocusChanged};
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
