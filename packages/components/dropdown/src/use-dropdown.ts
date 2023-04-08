import type {DropdownVariantProps, SlotsToClasses, DropdownSlots} from "@nextui-org/theme";

import {Ref, useId} from "react";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useMenuTriggerState} from "@react-stately/menu";
import {MenuTriggerType} from "@react-types/menu";
import {useMenuTrigger} from "@react-aria/menu";
import {dropdown} from "@nextui-org/theme";
import {clsx, mergeRefs, ReactRef} from "@nextui-org/shared-utils";
import {PopoverProps} from "@nextui-org/popover";
import {useMemo, useRef} from "react";
import {mergeProps} from "@react-aria/utils";

interface Props
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
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Dropdown styles={{
   *    trigger: "trigger-classes",
   *    base: "base-classes", // popover wrapper
   *    menu: "menu-classes",// items wrapper
   *    section: "section-classes",
   *    sectionHeading: "sectionHeading-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<DropdownSlots>;
}

export type UseDropdownProps = Props & DropdownVariantProps;

export function useDropdown(originalProps: UseDropdownProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, dropdown.variantKeys);

  const {
    as,
    triggerRef: triggerRefProp,
    className,
    isOpen,
    defaultOpen,
    onOpenChange,
    type = "menu",
    trigger = "press",
    placement = "bottom",
    isDisabled = false,
    closeOnSelect = true,
    styles,
    ...otherProps
  } = props;

  const Component = as || "div";

  const triggerRef = useRef<HTMLElement>(null);
  const menuTriggerRef = triggerRefProp || triggerRef;
  const menuRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const triggerId = useId();

  const disableAnimation = originalProps.disableAnimation ?? false;

  const state = useMenuTriggerState({trigger, isOpen, defaultOpen, onOpenChange});

  const {menuTriggerProps, menuProps} = useMenuTrigger(
    {type, trigger, isDisabled},
    state,
    menuTriggerRef,
  );

  const slots = useMemo(
    () =>
      dropdown({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const baseStyles = clsx(styles?.base, className);

  const getPopoverProps: PropGetter = (props = {}) => ({
    state,
    placement,
    ref: popoverRef,
    disableAnimation,
    scrollRef: menuRef,
    triggerRef: menuTriggerRef,
    ...mergeProps(otherProps, props),
    className: slots.base({class: clsx(baseStyles, props.className)}),
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
    };
  };

  const getMenuProps: PropGetter = (props = {}, _ref: Ref<any> | null | undefined = null) => ({
    ...mergeProps(menuProps, props),
    ref: mergeRefs(_ref, menuRef),
    className: slots.menu({class: clsx(styles?.menu, props.className)}),
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
