import type {HTMLNextUIProps} from "@nextui-org/system";
import type {MultipleSelection, SelectionBehavior} from "@react-types/shared";
import type {ReactRef} from "@nextui-org/shared-utils";

import {useState, Key} from "react";
import {AriaAccordionProps} from "@react-types/accordion";
import {useTreeState} from "@react-stately/tree";
import {useAccordion} from "@react-aria/accordion";
import {useDOMRef} from "@nextui-org/dom-utils";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * The collapse ref.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  selectionBehavior?: SelectionBehavior;
}

export type UseCollapseProps<T extends object> = Props & AriaAccordionProps<T> & MultipleSelection;

export function useCollapse<T extends object>(props: UseCollapseProps<T>) {
  const {
    ref,
    children,
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
    ...otherProps
  } = props;

  const [focusedKey, setFocusedKey] = useState<Key | null>(null);

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

  const accordionProps = {
    ...commonProps,
    ...expandableProps,
  };

  const domRef = useDOMRef(ref);

  const state = useTreeState(treeProps);

  state.selectionManager.setFocusedKey = (key: Key | null) => {
    setFocusedKey(key);
  };

  const {accordionProps: collapseProps} = useAccordion(accordionProps, state, domRef);

  return {domRef, state, focusedKey, setFocusedKey, collapseProps, ...otherProps};
}

export type UseCollapseReturn = ReturnType<typeof useCollapse>;
