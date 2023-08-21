import type {MenuItemBaseProps} from "./base/menu-item-base";

import {useMemo, useRef, useCallback} from "react";
import {menuItem} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useFocusRing} from "@react-aria/focus";
import {Node} from "@react-types/shared";
import {filterDOMProps} from "@nextui-org/react-utils";
import {TreeState} from "@react-stately/tree";
import {clsx, dataAttr, removeEvents} from "@nextui-org/shared-utils";
import {useMenuItem as useAriaMenuItem} from "@react-aria/menu";
import {chain, mergeProps} from "@react-aria/utils";
import {useHover, usePress} from "@react-aria/interactions";
import {useIsMobile} from "@nextui-org/use-is-mobile";

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
    onPress,
    onClick,
    isReadOnly = false,
    closeOnSelect,
    onClose,
    ...otherProps
  } = props;

  const disableAnimation = originalProps.disableAnimation;

  const domRef = useRef<HTMLLIElement>(null);

  const Component = as || "li";
  const shouldFilterDOMProps = typeof Component === "string";

  const {rendered, key} = item;

  const isDisabled = state.disabledKeys.has(key) || originalProps.isDisabled;
  const isSelectable = state.selectionManager.selectionMode !== "none";

  const isMobile = useIsMobile();

  const {pressProps, isPressed} = usePress({
    ref: domRef,
    isDisabled: isDisabled,
    onPress,
  });

  const {isHovered, hoverProps} = useHover({
    isDisabled,
  });

  const {isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  const {
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
    [...Object.values(variantProps), isDisabled, disableAnimation],
  );

  const baseStyles = clsx(classNames?.base, className);

  if (isReadOnly) {
    itemProps = removeEvents(itemProps);
  }

  const getItemProps: PropGetter = (props = {}) => ({
    ref: domRef,
    ...mergeProps(
      itemProps,
      isReadOnly ? {} : mergeProps(focusProps, pressProps),
      hoverProps,
      filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
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
    onClick: chain(pressProps.onClick, onClick),
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
    getDescriptionProps,
    getKeyboardShortcutProps,
    getSelectedIconProps,
  };
}

export type UseMenuReturn = ReturnType<typeof useMenuItem>;
