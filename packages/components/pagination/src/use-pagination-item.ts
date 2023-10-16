import type {Ref, MouseEvent} from "react";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {LinkDOMProps, PressEvent} from "@react-types/shared";

import {useMemo} from "react";
import {PaginationItemValue} from "@nextui-org/use-pagination";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
// @ts-ignore - react-aria issue: https://github.com/adobe/react-spectrum/issues/5194
import {chain, mergeProps} from "@react-aria/utils";
import {filterDOMProps, useDOMRef} from "@nextui-org/react-utils";
import {PressEvents, useHover, usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";

interface Props extends Omit<HTMLNextUIProps<"li">, "onClick">, PressEvents {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement>;
  /**
   * Value of the item.
   */
  value?: PaginationItemValue;
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
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /**
   * Callback fired when the item is clicked.
   * @param e PressEvent
   */
  onPress?: (e: PressEvent) => void;
  /**
   * Function to get the aria-label of the item.
   */
  getAriaLabel?: (page?: PaginationItemValue) => string | undefined;
}

export type UsePaginationItemProps = Props & LinkDOMProps;

export function usePaginationItem(props: UsePaginationItemProps) {
  const {
    as,
    ref,
    value,
    children,
    isActive,
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onClick,
    getAriaLabel,
    className,
    ...otherProps
  } = props;

  const Component = as || "li";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);

  const ariaLabel = useMemo(
    () => (isActive ? `${getAriaLabel?.(value)} active` : getAriaLabel?.(value)),
    [value, isActive],
  );

  const {isPressed, pressProps} = usePress({
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
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
      ...mergeProps(
        props,
        pressProps,
        focusProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
      ),
      onClick: chain(pressProps?.onClick, onClick),
      className: clsx(className, props.className),
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
