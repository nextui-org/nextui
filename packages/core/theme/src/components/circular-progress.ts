import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * CircularProgress **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, svgWrapper, svg, indicator, value, label} = circularProgress({...})
 *
 * <div className={base()} aria-label="progress" role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}>
 *   <div className={svgWrapper()}>
 *      <svg className={svg()}>
 *        <circle className={track()} />
 *        <circle className={indicator()} />
 *      </svg>
 *      <span className={value()}>{value}</span>
 *   </div>
 *    <span className={label()}>{label}</span>
 * </div>
 * ```
 */
const circularProgress = tv({
  slots: {
    base: "flex flex-col justify-center gap-1 max-w-fit items-center",
    label: "",
    svgWrapper: "relative block",
    svg: "z-0 relative overflow-hidden",
    track: "h-full stroke-default-300/50",
    indicator: "h-full stroke-current",
    value: "absolute font-normal inset-0 flex items-center justify-center",
  },
  variants: {
    color: {
      default: {
        svg: "text-default-400",
      },
      primary: {
        svg: "text-primary",
      },
      secondary: {
        svg: "text-secondary",
      },
      success: {
        svg: "text-success",
      },
      warning: {
        svg: "text-warning",
      },
      danger: {
        svg: "text-danger",
      },
    },
    size: {
      sm: {
        svg: "w-8 h-8",
        label: "text-small",
        value: "text-[0.5rem]",
      },
      md: {
        svg: "w-10 h-10",
        label: "text-small",
        value: "text-[0.55rem]",
      },
      lg: {
        svg: "w-12 h-12",
        label: "text-medium",
        value: "text-[0.6rem]",
      },
    },
    isIndeterminate: {
      true: {
        svg: "animate-spinner-ease-spin",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed",
      },
    },
    disableAnimation: {
      true: {},
      false: {
        indicator: "transition-all !duration-500",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // disableAnimation && !isIndeterminate
    {
      disableAnimation: true,
      isIndeterminate: false,
      class: {
        svg: "!transition-none motion-reduce:transition-none",
      },
    },
  ],
});

export type CircularProgressVariantProps = VariantProps<typeof circularProgress>;
export type CircularProgressSlots = keyof ReturnType<typeof circularProgress>;

export {circularProgress};
