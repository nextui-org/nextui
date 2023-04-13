import type {PaginationSlots, PaginationVariantProps, SlotsToClasses} from "@nextui-org/theme";
import type {Timer} from "@nextui-org/shared-utils";
import type {ReactNode, Ref} from "react";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {
  UsePaginationProps as UseBasePaginationProps,
  PaginationItemValue,
} from "@nextui-org/use-pagination";

import {useEffect, useRef, useMemo} from "react";
import {mapPropsVariants} from "@nextui-org/system";
import {usePagination as useBasePagination} from "@nextui-org/use-pagination";
import {pagination} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";

export type PaginationItemRenderProps<T extends HTMLElement = HTMLElement> = {
  ref?: Ref<T>;
  value: PaginationItemValue;
  index: number;
  activePage: number;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  isNext: boolean;
  isPrevious: boolean;
  className: string;
  onNext: () => void;
  onPrevious: () => void;
  setPage: (page: number) => void;
};

interface Props extends Omit<HTMLNextUIProps<"ul">, "onChange"> {
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
  renderItem?: <T extends HTMLElement>(props: PaginationItemRenderProps<T>) => ReactNode;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Pagination classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    prev: "prev-classes", // prev button classes
   *    item: "item-classes",
   *    next: "next-classes", // next button classes
   *    cursor: "cursor-classes", // this is the one that moves when an item is selected
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<PaginationSlots>;
}

export type UsePaginationProps = Props & UseBasePaginationProps & PaginationVariantProps;

export const CURSOR_TRANSITION_TIMEOUT = 300; // in ms

export function usePagination(originalProps: UsePaginationProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, pagination.variantKeys);

  const {
    as,
    ref,
    classNames,
    dotsJump = 5,
    loop = false,
    showControls = false,
    total = 1,
    initialPage = 1,
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
  const cursorRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<Map<number, HTMLElement>>();

  const cursorTimer = useRef<Timer>();

  function getItemsRefMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }

    return itemsRef.current;
  }

  function getItemRef(node: HTMLElement | null, value: number) {
    const map = getItemsRefMap();

    if (node) {
      map.set(value, node);
    } else {
      map.delete(value);
    }
  }

  function scrollTo(value: number) {
    const map = getItemsRefMap();

    const node = map.get(value);

    // clean up the previous cursor timer (if any)
    cursorTimer.current && clearTimeout(cursorTimer.current);

    if (node) {
      // get position of the item
      const {offsetLeft} = node;

      // move the cursor to the item
      if (cursorRef.current) {
        cursorRef.current.setAttribute("data-moving", "true");
        cursorRef.current.style.transform = `translateX(${offsetLeft}px) scale(1.1)`;
      }

      cursorTimer.current = setTimeout(() => {
        // reset the scale of the cursor
        if (cursorRef.current) {
          cursorRef.current.setAttribute("data-moving", "false");
          cursorRef.current.style.transform = `translateX(${offsetLeft}px) scale(1)`;
        }
        cursorTimer.current && clearTimeout(cursorTimer.current);
      }, CURSOR_TRANSITION_TIMEOUT);
    }
  }

  const {range, activePage, setPage, previous, next, first, last} = useBasePagination({
    page,
    total,
    initialPage,
    siblings,
    boundaries,
    showControls,
    onChange,
  });

  useEffect(() => {
    if (activePage && !originalProps.disableAnimation) {
      scrollTo(activePage);
    }
  }, [
    activePage,
    originalProps.disableAnimation,
    originalProps.isCompact,
    originalProps.disableCursor,
  ]);

  const slots = useMemo(
    () =>
      pagination({
        ...variantProps,
        disableCursor: originalProps.disableCursor || originalProps.disableAnimation,
      }),
    [...Object.values(variantProps)],
  );

  const baseStyles = clsx(classNames?.base, className);

  const onNext = () => {
    if (loop && activePage === total) {
      return first();
    }

    return next();
  };

  const onPrevious = () => {
    if (loop && activePage === 1) {
      return last();
    }

    return previous();
  };

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ref: domRef,
      role: "navigation",
      "data-controls": dataAttr(showControls),
      "data-loop": dataAttr(loop),
      "data-dots-jump": dotsJump,
      "data-total": total,
      "data-active-page": activePage,
      className: slots.base({class: baseStyles}),
      ...otherProps,
    };
  };

  const getItemProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ref: (node) => getItemRef(node, props.value),
      isActive: props.value === activePage,
      className: slots.item({class: classNames?.item}),
      onPress: () => {
        if (props.value !== activePage) {
          setPage(props.value);
        }
      },
    };
  };

  const getCursorProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ref: cursorRef,
      activePage,
      className: slots.cursor({class: classNames?.cursor}),
    };
  };

  return {
    Component,
    showControls,
    dotsJump,
    slots,
    classNames,
    loop,
    total,
    range,
    activePage,
    getItemRef,
    disableCursor: originalProps.disableCursor,
    disableAnimation: originalProps.disableAnimation,
    setPage,
    onPrevious,
    onNext,
    renderItem,
    getBaseProps,
    getItemProps,
    getCursorProps,
  };
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
