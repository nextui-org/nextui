import type {MenuItemBaseProps} from "./base/menu-item-base";
import type {Node} from "@react-types/shared";

import {useMemo, useRef, useCallback} from "react";
import {menuItem} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useFocusRing} from "@react-aria/focus";
import {TreeState} from "@react-stately/tree";
import {clsx, dataAttr, objectToDeps, removeEvents} from "@nextui-org/shared-utils";
import {useAriaMenuItem} from "@nextui-org/use-aria-menu";
import {mergeProps} from "@react-aria/utils";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import {filterDOMProps} from "@nextui-org/react-utils";

interface Props<T extends object> extends MenuItemBaseProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}

export type UseMenuItemProps<T extends object> = Props<T> &
  Omit<HTMLNextUIProps<"li">, keyof Props<T>>;

export function useMenuItem<T extends object>(originalProps: UseMenuItemProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, menuItem.variantKeys);

  const {
    as,
    item,
    state,
    shortcut,
    description,
    startContent,
    endContent,
    isVirtualized,
    selectedIcon,
    className,
    classNames,
    onAction,
    autoFocus,
    onClick,
    onPress,
    onPressStart,
    onPressUp,
    onPressEnd,
    onPressChange,
    hideSelectedIcon = false,
    isReadOnly = false,
    closeOnSelect,
    onClose,
    ...otherProps
  } = props;

  const disableAnimation = originalProps.disableAnimation;

  const domRef = useRef<HTMLLIElement>(null);

  const Component = as || (otherProps?.href ? "a" : "li");
  const shouldFilterDOMProps = typeof Component === "string";

  const {rendered, key} = item;

  const isDisabled = state.disabledKeys.has(key) || originalProps.isDisabled;
  const isSelectable = state.selectionManager.selectionMode !== "none";

  const isMobile = useIsMobile();

  const {isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  const {
    isHovered,
    isPressed,
    isFocused,
    isSelected,
    menuItemProps,
    labelProps,
    descriptionProps,
    keyboardShortcutProps,
  } = useAriaMenuItem(
    {
      key,
      onClose,
      isDisabled,
      onPress,
      onClick,
      onPressStart,
      onPressUp,
      onPressEnd,
      onPressChange,
      "aria-label": props["aria-label"],
      closeOnSelect,
      isVirtualized,
      onAction,
    },
    state,
    domRef,
  );

  let itemProps = menuItemProps;

  const slots = useMemo(
    () =>
      menuItem({
        ...variantProps,
        isDisabled,
        disableAnimation,
      }),
    [objectToDeps(variantProps), isDisabled, disableAnimation],
  );

  const baseStyles = clsx(classNames?.base, className);

  if (isReadOnly) {
    itemProps = removeEvents(itemProps);
  }

  const getItemProps: PropGetter = (props = {}) => ({
    ref: domRef,
    ...mergeProps(
      isReadOnly ? {} : focusProps,
      filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      itemProps,
      props,
    ),
    "data-focus": dataAttr(isFocused),
    "data-selectable": dataAttr(isSelectable),
    "data-hover": dataAttr(isMobile ? isHovered || isPressed : isHovered),
    "data-disabled": dataAttr(isDisabled),
    "data-selected": dataAttr(isSelected),
    "data-pressed": dataAttr(isPressed),
    "data-focus-visible": dataAttr(isFocusVisible),
    className: slots.base({class: clsx(baseStyles, props.className)}),
  });

  const getLabelProps: PropGetter = (props = {}) => ({
    ...mergeProps(labelProps, props),
    className: slots.title({class: classNames?.title}),
  });

  const getDescriptionProps: PropGetter = (props = {}) => ({
    ...mergeProps(descriptionProps, props),
    className: slots.description({class: classNames?.description}),
  });

  const getKeyboardShortcutProps: PropGetter = (props = {}) => ({
    ...mergeProps(keyboardShortcutProps, props),
    className: slots.shortcut({class: classNames?.shortcut}),
  });

  const getSelectedIconProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-disabled": dataAttr(isDisabled),
        className: slots.selectedIcon({class: classNames?.selectedIcon}),
        ...props,
      };
    },
    [isDisabled, slots, classNames],
  );

  return {
    Component,
    domRef,
    slots,
    classNames,
    isSelectable,
    isSelected,
    isDisabled,
    rendered,
    shortcut,
    description,
    startContent,
    endContent,
    selectedIcon,
    disableAnimation,
    getItemProps,
    getLabelProps,
    hideSelectedIcon,
    getDescriptionProps,
    getKeyboardShortcutProps,
    getSelectedIconProps,
  };
}

export type UseMenuReturn = ReturnType<typeof useMenuItem>;
