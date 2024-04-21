/* eslint-disable no-console */
import {AriaMenuProps} from "@react-types/menu";
import {DOMAttributes, Key, KeyboardDelegate, KeyboardEvents} from "@react-types/shared";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {RefObject} from "react";
import {TreeState} from "@react-stately/tree";
import {useSelectableList} from "@react-aria/selection";

export interface MenuAria {
  /** Props for the menu element. */
  menuProps: DOMAttributes;
}

export interface AriaMenuOptions<T> extends Omit<AriaMenuProps<T>, "children">, KeyboardEvents {
  /** Whether the menu uses virtual scrolling. */
  isVirtualized?: boolean;

  /**
   * An optional keyboard delegate implementation for type to select,
   * to override the default.
   */
  keyboardDelegate?: KeyboardDelegate;
}

interface MenuData {
  onClose?: () => void;
  onAction?: (key: Key) => void;
}

export const menuData = new WeakMap<TreeState<unknown>, MenuData>();

/**
 * Provides the behavior and accessibility implementation for a menu component.
 * A menu displays a list of actions or options that a user can choose.
 * @param props - Props for the menu.
 * @param state - State for the menu, as returned by `useListState`.
 */
export function useMenu<T>(
  props: AriaMenuOptions<T>,
  state: TreeState<T>,
  ref: RefObject<HTMLElement>,
): MenuAria {
  let {shouldFocusWrap = true, onKeyDown, onKeyUp, ...otherProps} = props;

  if (!props["aria-label"] && !props["aria-labelledby"]) {
    console.warn("An aria-label or aria-labelledby prop is required for accessibility.");
  }

  // @ts-ignore
  let domProps = filterDOMProps(props, {labelable: true});
  let {listProps} = useSelectableList({
    ...otherProps,
    ref,
    selectionManager: state.selectionManager,
    collection: state.collection,
    disabledKeys: state.disabledKeys,
    shouldFocusWrap,
    linkBehavior: "override",
  });

  menuData.set(state, {
    onClose: props.onClose,
    onAction: props.onAction,
  });

  return {
    menuProps: mergeProps(
      domProps,
      {onKeyDown, onKeyUp},
      {
        role: "menu",
        ...listProps,
        // @ts-ignore
        onKeyDown: (e) => {
          // don't clear the menu selected keys if the user is presses escape since escape closes the menu
          if (e.key !== "Escape") {
            // @ts-ignore
            listProps.onKeyDown(e);
          }
        },
      },
    ),
  };
}
