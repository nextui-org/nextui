import { useRef, useCallback } from 'react';
import { mergeProps } from '@react-aria/utils';
import { MenuTriggerType } from '@react-types/menu';
import { useMenuTrigger } from '@react-aria/menu';
import { useMenuTriggerState } from '@react-stately/menu';
import { mergeRefs } from '../utils/refs';
import { PopoverProps } from '../popover';

export interface UseDropdownProps extends Omit<PopoverProps, 'children'> {
  /**
   * The type of menu that the menu trigger opens.
   * @default 'menu'
   */
  type?: 'menu' | 'listbox';
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
    shouldFlip = true,
    placement = 'bottom',
    type = 'menu',
    trigger = 'press',
    isDisabled = false,
    closeOnSelect
  } = props;

  const triggerRef = useRef<HTMLElement>(null);
  const menuTriggerRef = triggerRefProp || triggerRef;
  const menuRef = useRef<HTMLUListElement>(null);
  const menuPopoverRef = useRef<HTMLDivElement>(null);

  const state = useMenuTriggerState(props);

  const { menuTriggerProps, menuProps } = useMenuTrigger(
    { type, trigger, isDisabled },
    state,
    menuTriggerRef
  );

  const getMenuTriggerProps = useCallback(
    (props = {}, _ref = null) => {
      const realTriggerProps = triggerRefProp?.current
        ? mergeProps(menuTriggerProps, props)
        : mergeProps(props, menuTriggerProps);
      return {
        ...realTriggerProps,
        ref: mergeRefs(triggerRef, _ref)
      };
    },
    [triggerRef, triggerRefProp, menuTriggerProps]
  );

  return {
    ...menuProps,
    state,
    ref: menuRef,
    onClose: state.close,
    autoFocus: state.focusStrategy || true,
    menuRef,
    menuPopoverRef,
    menuTriggerRef,
    shouldFlip,
    placement,
    closeOnSelect,
    getMenuTriggerProps
  };
}

export type UseDropdownReturn = ReturnType<typeof useDropdown>;
