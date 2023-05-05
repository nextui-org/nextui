import type {SkeletonVariantProps, SkeletonSlots, SlotsToClasses} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {skeleton} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef, clsx, dataAttr} from "@nextui-org/shared-utils";
import {useMemo} from "react";

export interface UseSkeletonProps extends HTMLNextUIProps<"div", SkeletonVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The skeleton will be visible while isLoading is `false`.
   * @default false
   */
  isLoaded?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Skeleton classNames={{
   *    base:"base-classes", // skeleton wrapper
   *    content: "content-classes", // children wrapper
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<SkeletonSlots>;
}

export function useSkeleton(originalProps: UseSkeletonProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, skeleton.variantKeys);

  const {ref, as, children, isLoaded = false, className, classNames, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const slots = useMemo(
    () =>
      skeleton({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const baseStyles = clsx(className, classNames?.base);

  const getSkeletonProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-loaded": dataAttr(isLoaded),
      className: slots.base({class: clsx(baseStyles, props?.className)}),
      ...otherProps,
    };
  };

  const getContentProps: PropGetter = (props = {}) => {
    return {
      className: slots.content({class: clsx(classNames?.content, props?.className)}),
    };
  };

  return {Component, domRef, children, slots, classNames, getSkeletonProps, getContentProps};
}

export type UseSkeletonReturn = ReturnType<typeof useSkeleton>;
