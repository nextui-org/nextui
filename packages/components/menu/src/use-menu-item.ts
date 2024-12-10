import type {MenuItemBaseProps} from "./base/menu-item-base";
import type {MenuItemVariantProps} from "@nextui-org/theme";
import type {Node, PressEvent} from "@react-types/shared";

import {useMemo, useRef, useCallback} from "react";
import {menuItem} from "@nextui-org/theme";
import {
  HTMLNextUIProps,
  mapPropsVariants,
  PropGetter,
  useProviderContext,
} from "@nextui-org/system";
import {useFocusRing} from "@react-aria/focus";
import {TreeState} from "@react-stately/tree";
import {clsx, dataAttr, objectToDeps, removeEvents, warn} from "@nextui-org/shared-utils";
import {useMenuItem as useAriaMenuItem} from "@react-aria/menu";
import {isFocusVisible as AriaIsFocusVisible, useHover} from "@react-aria/interactions";
import {mergeProps} from "@react-aria/utils";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import {filterDOMProps} from "@nextui-org/react-utils";

interface Props<T extends object> extends MenuItemBaseProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}

export type UseMenuItemProps<T extends object> = Props<T> &
  Omit<HTMLNextUIProps<"li">, keyof Props<T>> &
  MenuItemVariantProps;

export function useMenuItem<T extends object>(originalProps: UseMenuItemProps<T>) {
  const globalContext = useProviderContext();

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
    onPressStart,
    onPressUp,
    onPressEnd,
    onPressChange,
    onHoverStart: hoverStartProp,
    onHoverChange,
    onHoverEnd,
    hideSelectedIcon = false,
    isReadOnly = false,
    closeOnSelect,
    onClose,
    onClick: deprecatedOnClick,
    ...otherProps
  } = props;

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const domRef = useRef<HTMLLIElement>(null);

  const Component = as || (otherProps?.href ? "a" : "li");
  const shouldFilterDOMProps = typeof Component === "string";

  const {rendered, key} = item;

  const isDisabledProp = state.disabledKeys.has(key) || originalProps.isDisabled;
  const isSelectable = state.selectionManager.selectionMode !== "none";

  const isMobile = useIsMobile();

  const {isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  if (deprecatedOnClick && typeof deprecatedOnClick === "function") {
    warn(
      "onClick is deprecated, please use onPress instead. See: https://github.com/nextui-org/nextui/issues/4292",
      "MenuItem",
    );
  }

  const handlePress = useCallback(
    (e: PressEvent) => {
      deprecatedOnClick?.(e as unknown as React.MouseEvent<HTMLLIElement | HTMLAnchorElement>);
      onPress?.(e);
    },
    [deprecatedOnClick, onPress],
  );

  const {
    isPressed,
    isFocused,
    isSelected,
    isDisabled,
    menuItemProps,
    labelProps,
    descriptionProps,
    keyboardShortcutProps,
  } = useAriaMenuItem(
    {
      key,
      onClose,
      isDisabled: isDisabledProp,
      onPress: handlePress,
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

  // `useMenuItem` from react-aria doesn't expose `isHovered`
  // hence, cover the logic here
  let {hoverProps, isHovered} = useHover({
    isDisabled,
    onHoverStart(e) {
      if (!AriaIsFocusVisible()) {
        state.selectionManager.setFocused(true);
        state.selectionManager.setFocusedKey(key);
      }
      hoverStartProp?.(e);
    },
    onHoverChange,
    onHoverEnd,
  });

  let itemProps = menuItemProps;

  const slots = useMemo(
    () =>
      menuItem({
        ...variantProps,
        isDisabled,
        disableAnimation,
        hasTitleTextChild: typeof rendered === "string",
        hasDescriptionTextChild: typeof description === "string",
      }),
    [objectToDeps(variantProps), isDisabled, disableAnimation, rendered, description],
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
      hoverProps,
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
