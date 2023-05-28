import type {NavbarVariantProps, SlotsToClasses, NavbarSlots} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {navbar} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {useEffect, useMemo, useRef, useState} from "react";
import {mergeProps, useResizeObserver} from "@react-aria/utils";
import {useScrollPosition} from "@nextui-org/use-scroll-position";
import {useControlledState} from "@react-stately/utils";
import {HTMLMotionProps} from "framer-motion";

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
   * The height of the navbar.
   * @default "4rem" (64px)
   */
  height?: number | string;
  /**
   * Whether the menu is open.
   * @default false
   */
  isMenuOpen?: boolean;
  /**
   * Whether the menu should be open by default.
   * @default false
   */
  isMenuDefaultOpen?: boolean;
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
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   * This motion is only available if the `shouldHideOnScroll` prop is set to `true`.
   */
  motionProps?: HTMLMotionProps<"nav">;
  /**
   * The event handler for the menu open state.
   * @param isOpen boolean
   * @returns void
   */
  onMenuOpenChange?: (isOpen: boolean | undefined) => void;
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
   *    content: "content-classes",
   *    item: "item-classes",
   *    menu: "menu-classes", // the one that appears when the menu is open
   *    menuItem: "menu-item-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<NavbarSlots>;
}

export function useNavbar(originalProps: UseNavbarProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, navbar.variantKeys);

  const {
    ref,
    as,
    parentRef,
    height = "4rem",
    shouldHideOnScroll = false,
    disableScrollHandler = false,
    onScrollPositionChange,
    isMenuOpen: isMenuOpenProp,
    isMenuDefaultOpen,
    onMenuOpenChange = () => {},
    motionProps,
    className,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "nav";

  const domRef = useDOMRef(ref);

  const prevWidth = useRef(0);
  const navHeight = useRef(0);

  const [isHidden, setIsHidden] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useControlledState<boolean | undefined>(
    isMenuOpenProp,
    isMenuDefaultOpen,
    onMenuOpenChange,
  );

  const updateWidth = () => {
    if (domRef.current) {
      const width = domRef.current.offsetWidth;

      if (width !== prevWidth.current) {
        prevWidth.current = width;
      }
    }
  };

  useResizeObserver({
    ref: domRef,
    onResize: () => {
      const currentWidth = domRef.current?.offsetWidth;

      if (currentWidth !== prevWidth.current) {
        updateWidth();
        setIsMenuOpen(false);
      }
    },
  });

  useEffect(() => {
    updateWidth();

    navHeight.current = domRef.current?.offsetHeight || 0;
  }, []);

  const slots = useMemo(
    () =>
      navbar({
        ...variantProps,
        hideOnScroll: shouldHideOnScroll,
      }),
    [...Object.values(variantProps), shouldHideOnScroll],
  );

  const baseStyles = clsx(className, classNames?.base);

  useScrollPosition({
    elementRef: parentRef,
    isEnabled: shouldHideOnScroll || !disableScrollHandler,
    callback: ({prevPos, currPos}) => {
      onScrollPositionChange?.(currPos.y);
      if (shouldHideOnScroll) {
        setIsHidden((prev) => {
          const next = currPos.y > prevPos.y && currPos.y > navHeight.current;

          return next !== prev ? next : prev;
        });
      }
    },
  });

  const getBaseProps: PropGetter = (props = {}) => ({
    ...mergeProps(otherProps, props),
    "data-hidden": dataAttr(isHidden),
    "data-menu-open": dataAttr(isMenuOpen),
    ref: domRef,
    className: slots.base({class: clsx(baseStyles, props?.className)}),
    style: {
      "--navbar-height": height,
      ...props?.style,
    },
  });

  const getWrapperProps: PropGetter = (props = {}) => ({
    ...props,
    "data-menu-open": dataAttr(isMenuOpen),
    className: slots.wrapper({class: clsx(classNames?.wrapper, props?.className)}),
  });

  return {
    Component,
    motionProps,
    isHidden,
    slots,
    domRef,
    classNames,
    shouldHideOnScroll,
    isMenuOpen,
    setIsMenuOpen,
    getBaseProps,
    getWrapperProps,
  };
}

export type UseNavbarReturn = ReturnType<typeof useNavbar>;
