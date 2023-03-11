import type {Ref} from "react";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {PressEvent} from "@react-types/shared";

import {useMemo} from "react";
import {PaginationItemType} from "@nextui-org/use-pagination";
import {ringClasses} from "@nextui-org/theme";
import {clsx, dataAttr, warn} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useDOMRef} from "@nextui-org/dom-utils";
import {usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";

export interface UsePaginationItemProps extends Omit<HTMLNextUIProps<"li">, "onClick"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement>;
  /**
   * Value of the item.
   */
  value?: string | number;
  /**
   * Whether the item is active.
   * @default false
   */
  isActive?: boolean;
  /**
   * Whether the item is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Callback fired when the item is clicked.
   * @param e MouseEvent
   * @deprecated Use `onPress` instead.
   */
  onClick?: HTMLNextUIProps<"li">["onClick"];
  /**
   * Callback fired when the item is clicked.
   * @param e PressEvent
   */
  onPress?: (e: PressEvent) => void;

  /**
   * Function to get the aria-label of the item.
   * @param page string | number
   * @returns string
   */
  getAriaLabel?: (page?: string | number) => string;
}

const getItemAriaLabel = (page?: string | number) => {
  if (!page) return;
  switch (page) {
    case PaginationItemType.DOTS:
      return "dots element";
    case PaginationItemType.PREV:
      return "previous page button";
    case PaginationItemType.NEXT:
      return "next page button";
    case "first":
      return "first page button";
    case "last":
      return "last page button";
    default:
      return `pagination item ${page}`;
  }
};

export function usePaginationItem(props: UsePaginationItemProps) {
  const {
    as,
    ref,
    value,
    children,
    isActive,
    isDisabled,
    onPress,
    onClick,
    getAriaLabel = getItemAriaLabel,
    className,
    ...otherProps
  } = props;

  const Component = as || "li";
  const domRef = useDOMRef(ref);

  const ariaLabel = useMemo(
    () => (isActive ? `${getAriaLabel(value)} active` : getAriaLabel(value)),
    [value, isActive],
  );

  const handlePress = (e: PressEvent) => {
    if (onClick) {
      warn("onClick is deprecated, use onPress instead.", "PaginationItem");
    }
    onPress?.(e);
  };

  const {pressProps} = usePress({
    isDisabled,
    onPress: handlePress,
  });

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();

  const getItemProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      role: "button",
      tabIndex: isDisabled ? -1 : 0,
      "aria-label": ariaLabel,
      "aria-current": dataAttr(isActive),
      "aria-disabled": dataAttr(isDisabled),
      "data-active": dataAttr(isActive),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-focused": dataAttr(isFocused),
      className: clsx(isFocusVisible && [...ringClasses], className),
      ...mergeProps(props, pressProps, focusProps, otherProps),
    };
  };

  return {
    Component,
    children,
    ariaLabel,
    isFocused,
    isFocusVisible,
    getItemProps,
  };
}

export type UsePaginationItemReturn = ReturnType<typeof usePaginationItem>;
