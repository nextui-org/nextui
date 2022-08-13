import {useRef, useCallback} from "react";
import {mergeProps} from "@react-aria/utils";
import {MenuTriggerType} from "@react-types/menu";
import {useMenuTrigger} from "@react-aria/menu";
import {useMenuTriggerState} from "@react-stately/menu";

import {mergeRefs} from "../utils/refs";
import {PopoverProps} from "../popover";

export interface UseDropdownProps extends Omit<PopoverProps, "children"> {
  type?: "menu" | "listbox";
  /**
   * Whether menu trigger is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * How the menu is triggered.
   * @default 'press'
   */
  trigger?: MenuTriggerType;
  /**
   * Whether the trigger should show a pressed animation when the menu is open.
   * @default false
   */
  disableTriggerPressedAnimation?: boolean;
  /**
   * Whether the Menu closes when a selection is made.
   * @default true
   */
  closeOnSelect?: boolean;
}

/**
 * @internal
 */
export function useDropdown(props: UseDropdownProps = {}) {
  const {
    triggerRef: triggerRefProp,
    type = "menu",
    trigger = "press",
    isDisabled = false,
    borderWeight,
    closeOnSelect,
    disableAnimation = false,
    disableTriggerPressedAnimation = false,
    ...popoverProps
  } = props;

  const triggerRef = useRef<HTMLElement>(null);
  const menuTriggerRef = triggerRefProp || triggerRef;
  const menuRef = useRef<HTMLUListElement>(null);
  const menuPopoverRef = useRef<HTMLDivElement>(null);

  const state = useMenuTriggerState(props);

  const {menuTriggerProps, menuProps} = useMenuTrigger(
    {type, trigger, isDisabled},
    state,
    menuTriggerRef,
  );

  const getMenuTriggerProps = useCallback(
    (props = {}, _ref = null) => {
      const {css = {}, ...realTriggerProps} = triggerRefProp?.current
        ? mergeProps(menuTriggerProps, props)
        : mergeProps(props, menuTriggerProps);

      return {
        ref: mergeRefs(triggerRef, _ref),
        css: !disableTriggerPressedAnimation
          ? {
              backfaceVisibility: "hidden",
              '&[aria-haspopup="true"]&[aria-expanded="true"]': {
                opacity: 0.7,
                transform: "translateZ(0) scale(0.97)",
              },
              ...css,
            }
          : css,
        ...realTriggerProps,
      };
    },
    [triggerRef, triggerRefProp, menuTriggerProps, disableTriggerPressedAnimation],
  );

  return {
    ...menuProps,
    popoverProps,
    state,
    ref: menuRef,
    onClose: state.close,
    autoFocus: state.focusStrategy || true,
    disableAnimation,
    menuRef,
    borderWeight,
    menuPopoverRef,
    menuTriggerRef,
    closeOnSelect,
    getMenuTriggerProps,
  };
}

export type UseDropdownReturn = ReturnType<typeof useDropdown>;
