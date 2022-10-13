import type {NormalColors, NormalSizes, NormalWeights} from "@nextui-org/shared-utils";
import type {HTMLNextUIProps} from "@nextui-org/system";

import {
  usePagination as useBasePagination,
  UsePaginationProps as UseBasePaginationProps,
} from "@nextui-org/use-pagination";

export interface UsePaginationProps extends HTMLNextUIProps<"nav", UseBasePaginationProps> {
  /**
   * The pagination color.
   * @default "default"
   */
  color?: NormalColors;
  /**
   * The pagination size.
   * @default "md"
   */
  size?: NormalSizes;
  /**
   * The border weight of the bordered pagination.
   * @default "normal"
   */
  borderWeight?: NormalWeights;
  /**
   * Show only dots as pagination elements
   * @default false
   */
  onlyDots?: boolean;
  /**
   * Number of pages that are added or subtracted on the '...' button.
   * @default 5
   */
  dotsJump?: number;
  /**
   * Whether the pagination is bordered.
   * @default false
   */
  bordered?: boolean;
  /**
   * Whether the pagination is rounded.
   * @default false
   */
  rounded?: boolean;
  /**
   * Whether to show a shadow effect.
   * @default false
   */
  shadow?: boolean;
  /**
   * Whether the pagination should have animations.
   * @default true
   */
  animated?: boolean;
  /**
   * Non disable next/previous controls
   * @default false
   */
  loop?: boolean;
  /**
   * Whether the pagination should have a margin.
   * @default false
   */
  noMargin?: boolean;
  /**
   * Whether the pagination should display controls (left/right arrows).
   * @default true
   */
  controls?: boolean;
}

export function usePagination(props: UsePaginationProps) {
  const {
    color = "default",
    size = "md",
    borderWeight = "normal",
    rounded = false,
    noMargin = false,
    bordered = false,
    animated = true,
    shadow = false,
    onlyDots = false,
    controls = true,
    dotsJump = 5,
    loop = false,
    total = 1,
    initialPage,
    page,
    siblings,
    boundaries,
    onChange,

    ...otherProps
  } = props;

  const {range, active, setPage, previous, next, first, last} = useBasePagination({
    page,
    initialPage,
    siblings: onlyDots ? 10 : siblings,
    boundaries: onlyDots ? 10 : boundaries,
    total,
    onChange,
  });

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

  return {
    color,
    size,
    bordered,
    shadow,
    onlyDots,
    controls,
    dotsJump,
    animated,
    noMargin,
    borderWeight,
    loop,
    total,
    active,
    rounded,
    range,
    setPage,
    onNext,
    onPrevious,
    ...otherProps,
  };
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
