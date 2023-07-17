import type {Ref} from "react";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {PressEvent} from "@react-types/shared";

import {useMemo} from "react";
import {PaginationItemType} from "@nextui-org/use-pagination";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {chain, mergeProps} from "@react-aria/utils";
import {useDOMRef} from "@nextui-org/react-utils";
import {useHover, usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";

export interface UsePaginationItemProps extends Omit<HTMLNextUIProps<"li">, "onClick"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement>;
  /**
   * Value of the item.
   */
  value?: PaginationItemType;
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
   */
  getAriaLabel?: (page?: string) => string | undefined;
}

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
    getAriaLabel,
    className,
    ...otherProps
  } = props;

  const Component = as || "li";
  const domRef = useDOMRef(ref);

  const ariaLabel = useMemo(
    () => (isActive ? `${getAriaLabel?.(value)} active` : getAriaLabel?.(value)),
    [value, isActive],
  );

  const {isPressed, pressProps} = usePress({
    isDisabled,
    onPress,
  });

  const {focusProps, isFocused, isFocusVisible} = useFocusRing({});
  const {isHovered, hoverProps} = useHover({isDisabled});

  const getItemProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      role: "button",
      tabIndex: isDisabled ? -1 : 0,
      "aria-label": ariaLabel,
      "aria-current": dataAttr(isActive),
      "aria-disabled": dataAttr(isDisabled),
      "data-disabled": dataAttr(isDisabled),
      "data-active": dataAttr(isActive),
      "data-focus": dataAttr(isFocused),
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(props, pressProps, focusProps, hoverProps, otherProps),
      className: clsx(className, props.className),
      onClick: chain(pressProps.onClick, onClick),
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
