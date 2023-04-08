import type {DropdownItemBaseProps} from "./base/dropdown-item-base";

import {useMemo, useRef, useCallback} from "react";
import {dropdownItem} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useFocusRing} from "@react-aria/focus";
import {Node} from "@react-types/shared";
import {TreeState} from "@react-stately/tree";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useMenuItem} from "@react-aria/menu";
import {chain, filterDOMProps, mergeProps} from "@react-aria/utils";
import {usePress} from "@react-aria/interactions";

import {useDropdownContext} from "./dropdown-context";

interface Props<T extends object> extends DropdownItemBaseProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}

export type UseDropdownItemProps<T extends object> = Props<T> &
  Omit<HTMLNextUIProps<"li">, keyof Props<T>>;

export function useDropdownItem<T extends object>(originalProps: UseDropdownItemProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, dropdownItem.variantKeys);

  const {
    onClose,
    closeOnSelect: closeOnSelectGroup,
    disableAnimation: disableAnimationGroup,
  } = useDropdownContext();

  const {
    as,
    item,
    state,
    shortcut,
    startContent,
    endContent,
    isVirtualized,
    selectedIcon,
    className,
    styles,
    onAction,
    autoFocus,
    onPress,
    onClick,
    closeOnSelect = closeOnSelectGroup ?? true,
    ...otherProps
  } = props;

  const disableAnimation = disableAnimationGroup ?? originalProps.disableAnimation;

  const domRef = useRef<HTMLLIElement>(null);

  const Component = as || "li";

  const {rendered, key} = item;

  const isSelected = state.selectionManager.isSelected(key);
  const isFocused = state.selectionManager.focusedKey === item.key;
  const isDisabled = state.disabledKeys.has(key) || originalProps.isDisabled;
  const isSelectable = state.selectionManager.selectionMode !== "none";

  const {pressProps} = usePress({
    ref: domRef,
    isDisabled,
    onPress,
  });

  const {isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  const {menuItemProps, labelProps, descriptionProps, keyboardShortcutProps} = useMenuItem(
    {
      key,
      onClose,
      isSelected,
      isDisabled,
      "aria-label": props["aria-label"],
      closeOnSelect,
      isVirtualized,
      onAction,
    },
    state,
    domRef,
  );

  const slots = useMemo(
    () =>
      dropdownItem({
        ...variantProps,
        isDisabled,
        isFocusVisible,
        disableAnimation,
      }),
    [...Object.values(variantProps), isDisabled, isFocusVisible, disableAnimation],
  );

  const baseStyles = clsx(styles?.base, className);

  const getItemProps: PropGetter = (props = {}) => ({
    ref: domRef,
    ...mergeProps(
      menuItemProps,
      focusProps,
      pressProps,
      filterDOMProps(otherProps, {labelable: true}),
      props,
    ),
    "data-focused": dataAttr(isFocused),
    className: slots.base({class: clsx(baseStyles, props.className)}),
    onClick: chain(pressProps.onClick, onClick),
  });

  const getLabelProps: PropGetter = (props = {}) => ({
    ...mergeProps(labelProps, props),
    className: slots.title({class: styles?.title}),
  });

  const getDescriptionProps: PropGetter = (props = {}) => ({
    ...mergeProps(descriptionProps, props),
    className: slots.description({class: styles?.description}),
  });

  const getKeyboardShortcutProps: PropGetter = (props = {}) => ({
    ...mergeProps(keyboardShortcutProps, props),
    className: slots.shortcut({class: styles?.shortcut}),
  });

  const getSelectedIconProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-disabled": dataAttr(isDisabled),
        className: slots.selectedIcon({class: styles?.selectedIcon}),
        ...props,
      };
    },
    [isDisabled, slots, styles],
  );

  return {
    Component,
    domRef,
    slots,
    styles,
    isSelectable,
    isSelected,
    isDisabled,
    rendered,
    shortcut,
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

export type UseDropdownReturn = ReturnType<typeof useDropdownItem>;
