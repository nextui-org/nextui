import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {PopoverProps} from "@nextui-org/popover";
import type {MenuTriggerType} from "@react-types/menu";
import type {Ref} from "react";

import {useMenuTriggerState} from "@react-stately/menu";
import {useMenuTrigger} from "@react-aria/menu";
import {dropdown} from "@nextui-org/theme";
import {clsx} from "@nextui-org/shared-utils";
import {ReactRef, mergeRefs} from "@nextui-org/react-utils";
import {useMemo, useRef} from "react";
import {mergeProps} from "@react-aria/utils";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Type of overlay that is opened by the trigger.
   */
  type?: "menu" | "listbox";
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * How the menu is triggered.
   * @default 'press'
   */
  trigger?: MenuTriggerType;
  /**
   * Whether menu trigger is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the Menu closes when a selection is made.
   * @default true
   */
  closeOnSelect?: boolean;
}

export type UseDropdownProps = Props & Omit<PopoverProps, "children" | "color" | "variant">;

export function useDropdown(props: UseDropdownProps) {
  const {
    as,
    triggerRef: triggerRefProp,
    isOpen,
    defaultOpen,
    onOpenChange,
    type = "menu",
    trigger = "press",
    placement = "bottom",
    isDisabled = false,
    closeOnSelect = true,
    shouldBlockScroll = true,
    classNames: classNamesProp,
    disableAnimation = false,
    onClose,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const triggerRef = useRef<HTMLElement>(null);
  const menuTriggerRef = triggerRefProp || triggerRef;
  const menuRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const state = useMenuTriggerState({
    trigger,
    isOpen,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
  });

  const {menuTriggerProps, menuProps} = useMenuTrigger<object>(
    {type, trigger, isDisabled},
    state,
    menuTriggerRef,
  );

  const classNames = useMemo(
    () =>
      dropdown({
        className,
      }),
    [className],
  );

  const getPopoverProps: PropGetter = (props = {}) => ({
    state,
    placement,
    ref: popoverRef,
    disableAnimation,
    shouldBlockScroll,
    scrollRef: menuRef,
    triggerRef: menuTriggerRef,
    ...mergeProps(otherProps, props),
    classNames: {
      ...classNamesProp,
      ...props.classNames,
      base: clsx(classNames, classNamesProp?.base, props.className),
      arrow: clsx(classNamesProp?.arrow),
    },
  });

  const getMenuTriggerProps: PropGetter = (
    props = {},
    _ref: Ref<any> | null | undefined = null,
  ) => {
    return {
      ...mergeProps(menuTriggerProps, props),
      ref: mergeRefs(_ref, triggerRef),
    };
  };

  return {
    Component,
    menuRef,
    menuProps,
    classNames,
    closeOnSelect,
    onClose: state.close,
    autoFocus: state.focusStrategy || true,
    disableAnimation,
    getPopoverProps,
    getMenuTriggerProps,
  };
}

export type UseDropdownReturn = ReturnType<typeof useDropdown>;
