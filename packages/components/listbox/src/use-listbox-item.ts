import type {ListboxItemBaseProps} from "./base/listbox-item-base";

import {useMemo, useRef, useCallback} from "react";
import {listboxItem} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useFocusRing} from "@react-aria/focus";
import {Node} from "@react-types/shared";
import {filterDOMProps} from "@nextui-org/react-utils";
import {clsx, dataAttr, removeEvents} from "@nextui-org/shared-utils";
import {useOption} from "@react-aria/listbox";
import {chain, mergeProps} from "@react-aria/utils";
import {useHover, usePress} from "@react-aria/interactions";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import {ListState} from "@react-stately/list";

interface Props<T extends object> extends ListboxItemBaseProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

export type UseListboxItemProps<T extends object> = Props<T> &
  Omit<HTMLNextUIProps<"li">, keyof Props<T>>;

export function useListboxItem<T extends object>(originalProps: UseListboxItemProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, listboxItem.variantKeys);

  const {
    as,
    item,
    state,
    description,
    startContent,
    endContent,
    isVirtualized,
    selectedIcon,
    className,
    classNames,
    autoFocus,
    onPress,
    onClick,
    isReadOnly = false,
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

  const {isFocused, isSelected, optionProps, labelProps, descriptionProps} = useOption(
    {
      key,
      isDisabled,
      "aria-label": props["aria-label"],
      isVirtualized,
    },
    state,
    domRef,
  );

  let itemProps = optionProps;

  const slots = useMemo(
    () =>
      listboxItem({
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
    description,
    startContent,
    endContent,
    selectedIcon,
    disableAnimation,
    getItemProps,
    getLabelProps,
    getDescriptionProps,
    getSelectedIconProps,
  };
}

export type UseListboxItemReturn = ReturnType<typeof useListboxItem>;
