import {Ref} from "react";
import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {useMenuTriggerState} from "@react-stately/menu";
import {MenuTriggerType} from "@react-types/menu";
import {useMenuTrigger} from "@react-aria/menu";
import {dropdown} from "@nextui-org/theme";
import {clsx} from "@nextui-org/shared-utils";
import {ReactRef, mergeRefs} from "@nextui-org/react-utils";
import {PopoverProps} from "@nextui-org/popover";
import {useMemo, useRef} from "react";
import {mergeProps} from "@react-aria/utils";

export interface UseDropdownProps
  extends HTMLNextUIProps<"div", Omit<PopoverProps, "children" | "color" | "variant">> {
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

  const {menuTriggerProps, menuProps} = useMenuTrigger(
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
    // These props are not needed for the menu trigger since it is handled by the popover trigger.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {onKeyDown, onPress, onPressStart, ...otherMenuTriggerProps} = menuTriggerProps;

    return {
      ...mergeProps(otherMenuTriggerProps, props),
      ref: mergeRefs(_ref, triggerRef),
    };
  };

  const getMenuProps: PropGetter = (props = {}, _ref: Ref<any> | null | undefined = null) => ({
    ...mergeProps(menuProps, props),
    ref: mergeRefs(_ref, menuRef),
  });

  return {
    Component,
    classNames,
    closeOnSelect,
    onClose: state.close,
    autoFocus: state.focusStrategy || true,
    disableAnimation,
    getPopoverProps,
    getMenuTriggerProps,
    getMenuProps,
  };
}

export type UseDropdownReturn = ReturnType<typeof useDropdown>;
