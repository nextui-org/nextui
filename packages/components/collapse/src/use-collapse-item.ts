import type {CollapseItemBaseProps} from "./base/collapse-item-base";

import {Node} from "@react-types/shared";
import {useFocusRing} from "@react-aria/focus";
import {TreeState} from "@react-stately/tree";
import {callAllHandlers, ReactRef} from "@nextui-org/shared-utils";
import {useAccordionItem} from "@nextui-org/aria-utils";
import {useDOMRef} from "@nextui-org/dom-utils";
import {Key} from "react";

export interface UseCollapseItemProps<T extends object> extends CollapseItemBaseProps<T> {
  /**
   * The collapse item ref.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * The current collapse focused key.
   * @internal
   * @info This prop is necessary for the focus to work properly.
   * Due to the fact that the selectionManager focusedKey is no a state.
   */
  focusedKey?: Key | null;
  /**
   * The item node.
   */
  item: Node<T>;
  /**
   * The tree state.
   */
  state: TreeState<T>;
}

export function useCollapseItem<T extends object>(props: UseCollapseItemProps<T>) {
  const {ref, state, item, focusedKey, onFocusChange, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const {buttonProps, regionProps} = useAccordionItem({item}, {...state, focusedKey}, domRef);
  const {isFocusVisible, focusProps} = useFocusRing({
    autoFocus: item.props.autoFocus,
  });

  const isDisabled = state.disabledKeys.has(item.key);
  const isOpen = state.selectionManager.isSelected(item.key);

  const handleFocus = () => {
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    onFocusChange?.(false);
  };

  return {
    domRef,
    item,
    isDisabled,
    isOpen,
    isFocusVisible,
    buttonProps,
    regionProps,
    focusProps,
    onFocus: callAllHandlers(
      handleFocus,
      focusProps.onFocus,
      otherProps.onFocus,
      item.props.onFocus,
    ),
    onBlur: callAllHandlers(handleBlur, focusProps.onBlur, otherProps.onBlur, item.props.onBlur),
    ...otherProps,
  };
}

export type UseCollapseItemReturn = ReturnType<typeof useCollapseItem>;
