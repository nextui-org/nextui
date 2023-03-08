import type {ReactNode, Ref} from "react";
import type {PaginationSlots, PaginationVariantProps, SlotsToClasses} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {
  PaginationItemParam,
  usePagination as useBasePagination,
  UsePaginationProps as UseBasePaginationProps,
} from "@nextui-org/use-pagination";
import {useMemo} from "react";
import {pagination} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";

export type PaginationItemRenderProps = {
  value: PaginationItemParam;
  index: number;
  dotsJump: number;
  isActive: boolean;
  isNext: boolean;
  isPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
  isDots: boolean;
  isBefore: boolean;
  className: string;
};

interface Props extends HTMLNextUIProps<"ul"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement>;
  /**
   * Number of pages that are added or subtracted on the '...' button.
   * @default 5
   */
  dotsJump?: number;
  /**
   * Non disable next/previous controls
   * @default false
   */
  loop?: boolean;
  /**
   * Whether the pagination should display controls (left/right arrows).
   * @default true
   */
  showControls?: boolean;
  /**
   * Render a custom pagination item.
   * @param props Pagination item props
   * @returns ReactNode
   */
  renderItem?: (props: PaginationItemRenderProps) => ReactNode;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Pagination styles={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    item: "item-classes",
   *    cursor: "cursor-classes", // this is the one that moves when an item is selected
   * }} />
   * ```
   */
  styles?: SlotsToClasses<PaginationSlots>;
}

export type UsePaginationProps = Props & UseBasePaginationProps & PaginationVariantProps;

export function usePagination(originalProps: UsePaginationProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, pagination.variantKeys);

  const {
    as,
    ref,
    styles,
    showControls = true,
    dotsJump = 5,
    loop = false,
    total = 1,
    initialPage,
    page,
    siblings,
    boundaries,
    onChange,
    className,
    renderItem,
    ...otherProps
  } = props;

  const Component = as || "ul";

  const domRef = useDOMRef(ref);

  const {range, active, setPage, previous, next, first, last} = useBasePagination({
    page,
    initialPage,
    siblings,
    boundaries,
    total,
    onChange,
  });

  const slots = useMemo(
    () =>
      pagination({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const baseStyles = clsx(styles?.base, className);

  const onNext = () => {
    if (loop && active === total) {
      return first();
    }

    return next();
  };

  const onPrevious = () => {
    if (loop && active === 1) {
      return last();
    }

    return previous();
  };

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ref: domRef,
      "data-controls": dataAttr(showControls),
      "data-loop": dataAttr(loop),
      "data-dots-jump": dotsJump,
      "data-total": total,
      "data-active": active,
      className: slots.base({class: baseStyles}),
      ...otherProps,
    };
  };

  return {
    Component,
    showControls,
    dotsJump,
    slots,
    styles,
    loop,
    total,
    range,
    active,
    setPage,
    onPrevious,
    onNext,
    renderItem,
    getBaseProps,
  };
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
