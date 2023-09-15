import {
  useId,
  useCallback,
  useEffect,
  KeyboardEventHandler,
  ButtonHTMLAttributes,
  RefObject,
  Key,
} from "react";
import {DOMAttributes, Node, LongPressEvent, PressEvent} from "@react-types/shared";
import {focusSafely} from "@react-aria/focus";
import {TreeState} from "@react-stately/tree";
import {useButton} from "@react-aria/button";

export interface AccordionItemAriaProps<T> {
  item: Node<T>;
  isDisabled?: boolean;
}

export interface AccordionItemAria {
  /** Props for the accordion item button. */
  buttonProps: ButtonHTMLAttributes<HTMLElement>;
  /** Props for the accordion item content element. */
  regionProps: DOMAttributes;
}

export function useReactAriaAccordionItem<T>(
  props: AccordionItemAriaProps<T>,
  state: TreeState<T> & {
    focusedKey?: Key | null;
  },
  ref: RefObject<HTMLButtonElement>,
): AccordionItemAria {
  let {item, isDisabled: isDisabledProp} = props;
  let key = item.key;
  let manager = state.selectionManager;
  let buttonId = useId();
  let regionId = useId();
  let isDisabled = state.disabledKeys.has(item.key) || isDisabledProp;

  // Focus the associated DOM node when this item becomes the focusedKey
  useEffect(() => {
    let isFocused = key === state.focusedKey;

    if (isFocused && document.activeElement !== ref.current) {
      ref.current && focusSafely(ref.current);
    }
  }, [ref, key, state.focusedKey]);

  let onSelect = useCallback(
    (e: PressEvent | LongPressEvent | PointerEvent) => {
      if (!manager.canSelectItem(key)) {
        return;
      }
      manager.select(key, e);
      state.toggleKey(key);
    },
    [key, manager],
  );

  const extendFocusSelection = useCallback(
    (toKey: Key) => {
      if (manager.selectionBehavior === "replace") {
        manager.extendSelection(toKey);
      }
      manager.setFocusedKey(toKey);
    },
    [manager],
  );

  /**
   * Manage keyboard navigation between accordion items.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const keyMap: Record<string, KeyboardEventHandler> = {
        ArrowDown: () => {
          const nextKey = state.collection.getKeyAfter(key);

          if (nextKey && state.disabledKeys.has(nextKey)) {
            const nextEnabledKey = state.collection.getKeyAfter(nextKey);

            nextEnabledKey && extendFocusSelection(nextEnabledKey);
          } else {
            nextKey && extendFocusSelection(nextKey);
          }
        },
        ArrowUp: () => {
          const prevKey = state.collection.getKeyBefore(key);

          if (prevKey && state.disabledKeys.has(prevKey)) {
            const prevEnabledKey = state.collection.getKeyBefore(prevKey);

            prevEnabledKey && extendFocusSelection(prevEnabledKey);
          } else {
            prevKey && extendFocusSelection(prevKey);
          }
        },
        Home: () => {
          const firstKey = state.collection.getFirstKey();

          firstKey && extendFocusSelection(firstKey);
        },
        End: () => {
          const lastKey = state.collection.getLastKey();

          lastKey && extendFocusSelection(lastKey);
        },
      };

      const action = keyMap[event.key];

      if (action) {
        event.preventDefault();
        if (manager.canSelectItem(key)) {
          action(event);
        }
      }
    },
    [key, manager],
  );

  let {buttonProps} = useButton(
    {
      id: buttonId,
      elementType: "button",
      isDisabled,
      onKeyDown,
      onPress: onSelect,
    },
    ref,
  );

  let isExpanded = state.selectionManager.isSelected(item.key);

  return {
    buttonProps: {
      ...buttonProps,
      "aria-expanded": isExpanded,
      "aria-controls": isExpanded ? regionId : undefined,
    },
    regionProps: {
      id: regionId,
      role: "region",
      "aria-labelledby": buttonId,
    },
  };
}
