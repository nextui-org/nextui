import {
  DOMAttributes,
  DOMProps,
  FocusableElement,
  FocusEvents,
  HoverEvents,
  Key,
  KeyboardEvents,
  PressEvent,
  PressEvents,
} from "@react-types/shared";
import {chain, filterDOMProps, mergeProps, useRouter, useSlotId} from "@react-aria/utils";
import {getItemCount} from "@react-stately/collections";
import {isFocusVisible, useFocus, useHover, useKeyboard, usePress} from "@react-aria/interactions";
import {RefObject} from "react";
import {TreeState} from "@react-stately/tree";
import {useSelectableItem} from "@react-aria/selection";

import {menuData} from "./use-menu";

export interface MenuItemAria {
  /** Props for the menu item element. */
  menuItemProps: DOMAttributes;

  /** Props for the main text element inside the menu item. */
  labelProps: DOMAttributes;

  /** Props for the description text element inside the menu item, if any. */
  descriptionProps: DOMAttributes;

  /** Props for the keyboard shortcut text element inside the item, if any. */
  keyboardShortcutProps: DOMAttributes;

  /** Whether the item is currently hovered. */
  isHovered: boolean;
  /** Whether the item is currently focused. */
  isFocused: boolean;
  /** Whether the item is currently selected. */
  isSelected: boolean;
  /** Whether the item is currently in a pressed state. */
  isPressed: boolean;
  /** Whether the item is disabled. */
  isDisabled: boolean;
}

export interface AriaMenuItemProps
  extends DOMProps,
    PressEvents,
    HoverEvents,
    KeyboardEvents,
    FocusEvents {
  /**
   * Whether the menu item is disabled.
   * @deprecated - pass disabledKeys to useTreeState instead.
   */
  isDisabled?: boolean;

  /**
   * Whether the menu item is selected.
   * @deprecated - pass selectedKeys to useTreeState instead.
   */
  isSelected?: boolean;

  /** A screen reader only label for the menu item. */
  "aria-label"?: string;

  /** The unique key for the menu item. */
  key?: Key;

  /**
   * Handler that is called when the menu should close after selecting an item.
   * @deprecated - pass to the menu instead.
   */
  onClose?: () => void;

  /**
   * Whether the menu should close when the menu item is selected.
   * @default true
   */
  closeOnSelect?: boolean;

  /** Whether the menu item is contained in a virtual scrolling menu. */
  isVirtualized?: boolean;

  /**
   * Handler that is called when the user activates the item.
   * @deprecated - pass to the menu instead.
   */
  onAction?: (key: Key) => void;

  onClick?: DOMAttributes["onClick"];

  /** What kind of popup the item opens. */
  "aria-haspopup"?: "menu" | "dialog";

  /** Indicates whether the menu item's popup element is expanded or collapsed. */
  "aria-expanded"?: boolean | "true" | "false";

  /** Identifies the menu item's popup element whose contents or presence is controlled by the menu item. */
  "aria-controls"?: string;
}

/**
 * Provides the behavior and accessibility implementation for an item in a menu.
 * See `useMenu` for more details about menus.
 * @param props - Props for the item.
 * @param state - State for the menu, as returned by `useTreeState`.
 */
export function useMenuItem<T>(
  props: AriaMenuItemProps,
  state: TreeState<T>,
  ref: RefObject<FocusableElement>,
): MenuItemAria {
  let {
    key,
    closeOnSelect,
    isVirtualized,
    "aria-haspopup": hasPopup,
    onPressStart: pressStartProp,
    onPressUp: pressUpProp,
    onPress,
    onPressChange,
    onPressEnd,
    onHoverStart: hoverStartProp,
    onHoverChange,
    onHoverEnd,
    onKeyDown,
    onKeyUp,
    onFocus,
    onFocusChange,
    onBlur,
    onClick,
  } = props;

  let isTrigger = !!hasPopup;
  // @ts-ignore
  let isDisabled = props.isDisabled ?? state.disabledKeys.has(key);
  // @ts-ignore
  let isSelected = props.isSelected ?? state.selectionManager.isSelected(key);
  let data = menuData.get(state);
  // @ts-ignore
  let onClose = props.onClose || data.onClose;
  // @ts-ignore
  let onAction = isTrigger ? () => {} : props.onAction || data.onAction;
  let router = useRouter();
  let performAction = (e: PressEvent) => {
    if (onAction) {
      // @ts-ignore
      onAction(key);
    }

    if (e.target instanceof HTMLAnchorElement) {
      router.open(e.target, e);
    }
  };

  let role = "menuitem";

  if (!isTrigger) {
    if (state.selectionManager.selectionMode === "single") {
      role = "menuitemradio";
    } else if (state.selectionManager.selectionMode === "multiple") {
      role = "menuitemcheckbox";
    }
  }

  let labelId = useSlotId();
  let descriptionId = useSlotId();
  let keyboardId = useSlotId();

  let ariaProps = {
    "aria-disabled": isDisabled || undefined,
    role,
    "aria-label": props["aria-label"],
    "aria-labelledby": labelId,
    "aria-describedby": [descriptionId, keyboardId].filter(Boolean).join(" ") || undefined,
    "aria-controls": props["aria-controls"],
    "aria-haspopup": hasPopup,
    "aria-expanded": props["aria-expanded"],
  };

  if (state.selectionManager.selectionMode !== "none" && !isTrigger) {
    // @ts-ignore
    ariaProps["aria-checked"] = isSelected;
  }

  // @ts-ignore
  let item = state.collection.getItem(key);

  if (isVirtualized) {
    // @ts-ignore
    ariaProps["aria-posinset"] = item?.index;
    // @ts-ignore
    ariaProps["aria-setsize"] = getItemCount(state.collection);
  }

  let onPressStart = (e: PressEvent) => {
    if (e.pointerType === "keyboard") {
      performAction(e);
    }

    pressStartProp?.(e);
  };

  let onPressUp = (e: PressEvent) => {
    if (e.pointerType !== "keyboard") {
      setTimeout(() => {
        performAction(e);
      });
      // // Pressing a menu item should close by default in single selection mode but not multiple
      // // selection mode, except if overridden by the closeOnSelect prop.
      if (
        !isTrigger &&
        onClose &&
        (closeOnSelect ??
          (state.selectionManager.selectionMode !== "multiple" ||
            // @ts-ignore
            state.selectionManager.isLink(key)))
      ) {
        setTimeout(() => {
          onClose?.();
        });
      }
    }

    pressUpProp?.(e);
  };

  let {itemProps, isFocused} = useSelectableItem({
    selectionManager: state.selectionManager,
    // @ts-ignore
    key,
    ref,
    shouldSelectOnPressUp: true,
    allowsDifferentPressOrigin: true,
    // Disable all handling of links in useSelectable item
    // because we handle it ourselves. The behavior of menus
    // is slightly different from other collections because
    // actions are performed on key down rather than key up.
    linkBehavior: "none",
  });

  let {pressProps, isPressed} = usePress({
    onPressStart,
    onPress,
    onPressUp,
    onPressChange,
    onPressEnd,
    isDisabled,
  });

  let {isHovered, hoverProps} = useHover({
    isDisabled,
    onHoverStart(e) {
      if (!isFocusVisible()) {
        state.selectionManager.setFocused(true);
        // @ts-ignore
        state.selectionManager.setFocusedKey(key);
      }
      hoverStartProp?.(e);
    },
    onHoverChange,
    onHoverEnd,
  });

  let {keyboardProps} = useKeyboard({
    onKeyDown: (e) => {
      // Ignore repeating events, which may have started on the menu trigger before moving
      // focus to the menu item. We want to wait for a second complete key press sequence.
      if (e.repeat) {
        e.continuePropagation();

        return;
      }

      switch (e.key) {
        case " ":
          if (
            !isDisabled &&
            state.selectionManager.selectionMode === "none" &&
            !isTrigger &&
            closeOnSelect !== false &&
            onClose
          ) {
            onClose();
          }
          break;
        case "Enter":
          // The Enter key should always close on select, except if overridden.
          if (!isDisabled && closeOnSelect !== false && !isTrigger && onClose) {
            onClose();
          }
          break;
        default:
          if (!isTrigger) {
            e.continuePropagation();
          }

          onKeyDown?.(e);
          break;
      }
    },
    onKeyUp,
  });

  let {focusProps} = useFocus({onBlur, onFocus, onFocusChange});
  // @ts-ignore
  let domProps = filterDOMProps(item.props, {isLink: !!item?.props?.href});

  delete domProps.id;

  return {
    menuItemProps: {
      ...ariaProps,
      ...mergeProps(
        domProps,
        isTrigger ? {onFocus: itemProps.onFocus} : itemProps,
        pressProps,
        hoverProps,
        keyboardProps,
        focusProps,
      ),
      onClick: chain(onClick, pressProps.onClick),
      tabIndex: itemProps.tabIndex != null ? -1 : undefined,
    },
    labelProps: {
      id: labelId,
    },
    descriptionProps: {
      id: descriptionId,
    },
    keyboardShortcutProps: {
      id: keyboardId,
    },
    isHovered,
    isFocused,
    isSelected,
    isPressed,
    isDisabled,
  };
}
