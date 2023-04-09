import {Ref, useId} from "react";
import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {useMenuTriggerState} from "@react-stately/menu";
import {MenuTriggerType} from "@react-types/menu";
import {useMenuTrigger} from "@react-aria/menu";
import {dropdown} from "@nextui-org/theme";
import {clsx, mergeRefs, ReactRef} from "@nextui-org/shared-utils";
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
    styles: stylesProp,
    disableAnimation = false,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const triggerRef = useRef<HTMLElement>(null);
  const menuTriggerRef = triggerRefProp || triggerRef;
  const menuRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const triggerId = useId();
  const menuId = useId();

  const state = useMenuTriggerState({trigger, isOpen, defaultOpen, onOpenChange});

  const {menuTriggerProps, menuProps} = useMenuTrigger(
    {type, trigger, isDisabled},
    state,
    menuTriggerRef,
  );

  const styles = useMemo(
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
    scrollRef: menuRef,
    triggerRef: menuTriggerRef,
    ...mergeProps(otherProps, props),
    styles: {
      ...stylesProp,
      ...props.styles,
      base: clsx(styles, stylesProp?.base, props.className),
      arrow: clsx("border border-neutral-100", stylesProp?.arrow),
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
      id: triggerId,
      ref: mergeRefs(_ref, triggerRef),
      "aria-controls": menuId,
    };
  };

  const getMenuProps: PropGetter = (props = {}, _ref: Ref<any> | null | undefined = null) => ({
    ...mergeProps(menuProps, props),
    id: menuId,
    ref: mergeRefs(_ref, menuRef),
    "aria-labelledby": triggerId,
  });

  return {
    Component,
    styles,
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
