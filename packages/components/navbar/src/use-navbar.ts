import type {NavbarVariantProps, SlotsToClasses, NavbarSlots} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {navbar} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {useMemo, useState} from "react";
import {mergeProps} from "@react-aria/utils";
import {useScrollPosition} from "@nextui-org/use-scroll-position";

export interface UseNavbarProps extends HTMLNextUIProps<"nav", NavbarVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The parent element where the navbar is placed within.
   * This is used to determine the scroll position and whether the navbar should be hidden or not.
   * @default `window`
   */
  parentRef?: React.RefObject<HTMLElement>;
  /**
   * Whether the navbar should hide on scroll or not.
   * @default false
   */
  shouldHideOnScroll?: boolean;
  /**
   * Whether the navbar parent scroll event should be listened to or not.
   * @default false
   */
  disableScrollHandler?: boolean;
  /**
   * The scroll event handler for the navbar. The event fires when the navbar parent element is scrolled.
   * it only works if `disableScrollHandler` is set to `false` or `shouldHideOnScroll` is set to `true`.
   */
  onScrollPositionChange?: (scrollPosition: number) => void;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Navbar classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    brand: "brand-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<NavbarSlots>;
}

export type ContextType = {
  slots: ReturnType<typeof navbar>;
  classNames?: SlotsToClasses<NavbarSlots>;
};

export function useNavbar(originalProps: UseNavbarProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, navbar.variantKeys);

  const {
    ref,
    as,
    parentRef,
    shouldHideOnScroll = false,
    disableScrollHandler = false,
    onScrollPositionChange,
    className,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "nav";

  const domRef = useDOMRef(ref);

  const [isSticky, setIsSticky] = useState(false);

  const slots = useMemo(
    () =>
      navbar({
        ...variantProps,
        position: isSticky ? "sticky" : originalProps?.position,
      }),
    [...Object.values(variantProps), isSticky],
  );

  const context: ContextType = {
    slots,
    classNames,
  };

  const baseStyles = clsx(classNames?.base, className);

  useScrollPosition({
    elementRef: parentRef,
    isEnabled: shouldHideOnScroll || !disableScrollHandler,
    callback: ({prevPos, currPos}) => {
      onScrollPositionChange?.(currPos.y);
      if (shouldHideOnScroll) {
        setIsSticky((prev) => {
          const next = currPos.y > prevPos.y;

          return next !== prev ? next : prev;
        });
      }
    },
  });

  const getBaseProps: PropGetter = (props = {}) => ({
    ...mergeProps(otherProps, props),
    ref: domRef,
    className: slots.base({class: clsx(baseStyles, props?.className)}),
  });

  const getWrapperProps: PropGetter = (props = {}) => ({
    ...props,
    className: slots.wrapper({class: clsx(classNames?.wrapper, props?.className)}),
  });

  return {Component, slots, domRef, context, getBaseProps, getWrapperProps};
}

export type UseNavbarReturn = ReturnType<typeof useNavbar>;
