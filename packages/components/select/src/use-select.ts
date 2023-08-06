import type {SelectSlots, SelectVariantProps, SlotsToClasses} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {select} from "@nextui-org/theme";
import {ReactRef, useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {useMemo, useCallback, useRef} from "react";
import {MenuProps} from "@nextui-org/menu";
import {AriaSelectProps} from "@react-aria/select";
import {useSelectState} from "@react-stately/select";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {useSelect as useAriaSelect} from "@react-aria/select";
import {useFocusRing} from "@react-aria/focus";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useHover} from "@react-aria/interactions";
import {PopoverProps} from "@nextui-org/popover";
import {useTreeState} from "@react-stately/tree";

interface Props extends HTMLNextUIProps<"button"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  popoverProps?: PopoverProps;
  disableAnimation?: boolean;
  menuProps?: Omit<MenuProps, "menuProps">;
  /**
   * Callback fired when the select menu is closed.
   */
  onClose?: () => void;
  /**
   * Classes object to style the select and its children.
   */
  classNames?: SlotsToClasses<SelectSlots>;
}

export type UseSelectProps<T = object> = Props & AriaSelectProps<T> & SelectVariantProps;

export function useSelect(originalProps: UseSelectProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, select.variantKeys);

  const {
    ref,
    as,
    isOpen,
    defaultOpen,
    onOpenChange,
    disableAnimation,
    onSelectionChange,
    popoverProps = {
      placement: "bottom",
      triggerScaleOnOpen: false,
      disableAnimation,
    },
    menuProps: userMenuProps = {
      disableAnimation,
      closeOnSelect: true,
    },
    onClose,
    className,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);
  const menuRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const selectState = useSelectState({
    ...props,
    isOpen,
    defaultOpen,
    onOpenChange: (open) => {
      onOpenChange?.(open);
      if (!open) {
        onClose?.();
      }
    },
    onSelectionChange,
  });

  const menuState = useTreeState({
    ...selectState,
    selectionMode: "single",
    disallowEmptySelection: true,
  });

  const state = mergeProps(menuState, selectState);

  const {labelProps, triggerProps, valueProps, menuProps} = useAriaSelect(props, state, domRef);

  const {isPressed, buttonProps} = useAriaButton(triggerProps, domRef);

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();
  const {isHovered, hoverProps} = useHover({isDisabled: originalProps?.isDisabled});

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () =>
      select({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.base({
        class: clsx(baseStyles, props.className),
      }),
      ...props,
    }),
    [slots, baseStyles],
  );

  const getTriggerProps: PropGetter = useCallback(
    (props = {}) => {
      // These props are not needed for the menu trigger since it is handled by the popover trigger.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {onKeyDown, onClick, onMouseDown, onPointerDown, onPointerUp, ...otherButtonProps} =
        buttonProps;

      return {
        "data-disabled": dataAttr(originalProps?.isDisabled),
        "data-focus": dataAttr(isFocused),
        "data-pressed": dataAttr(isPressed),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-hover": dataAttr(isHovered),
        className: slots.trigger({class: classNames?.trigger}),
        ...mergeProps(
          otherButtonProps,
          focusProps,
          hoverProps,
          filterDOMProps(otherProps, {
            enabled: shouldFilterDOMProps,
          }),
          filterDOMProps(props),
        ),
      };
    },
    [
      slots,
      classNames?.trigger,
      originalProps?.isDisabled,
      isFocused,
      isPressed,
      isFocusVisible,
      isHovered,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps,
      shouldFilterDOMProps,
    ],
  );

  const getInputProps: PropGetter = useCallback(
    (props = {}) => ({
      state,
      label: originalProps?.label,
      name: originalProps?.name,
      triggerRef: domRef,
      ...props,
    }),
    [state, originalProps?.label, originalProps?.name, domRef],
  );

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.label({
        class: clsx(classNames?.label, props.className),
      }),
      ...labelProps,
      ...props,
    }),
    [slots, classNames?.label, labelProps],
  );

  const getValueProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.value({
        class: clsx(classNames?.value, props.className),
      }),
      ...valueProps,
      ...props,
    }),
    [slots, classNames?.value, valueProps],
  );

  const getMenuProps: PropGetter = (props = {}) => ({
    state,
    ref: menuRef,
    className: slots.menu({
      class: clsx(classNames?.menu, props.className),
    }),
    menuProps, // aria menu props
    onClose: () => {
      state.close();
    },
    ...mergeProps(userMenuProps, props),
  });

  const getPopoverProps: PropGetter = (props = {}) => ({
    state,
    ref: popoverRef,
    scrollRef: menuRef,
    triggerRef: domRef,
    ...mergeProps(popoverProps, props),
  });

  return {
    Component,
    domRef,
    state,
    label: originalProps?.label,
    name: originalProps?.name,
    getBaseProps,
    getTriggerProps,
    getInputProps,
    getLabelProps,
    getValueProps,
    getMenuProps,
    getPopoverProps,
  };
}

export type UseSelectReturn = ReturnType<typeof useSelect>;
