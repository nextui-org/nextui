import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * Progress **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, labelWrapper, label, value, track, indicator} = progress({...})
 *
 * <div className={base()} aria-label="progress" role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}>
 *   <div className={labelWrapper()}>
 *      <span className={label()}>{label}</span>
 *      <span className={value()}>{value}</span>
 *   </div>
 *   <div className={track()}>
 *     <div className={indicator()} style={{width: `${value}%`}} />
 *   </div>
 * </div>
 * ```
 */
const progress = tv(
  {
    slots: {
      base: "flex flex-col gap-2 w-full",
      label: "",
      labelWrapper: "flex justify-between",
      value: "",
      track: "z-0 relative bg-default-300/50 overflow-hidden",
      indicator: "h-full",
    },
    variants: {
      color: {
        default: {
          indicator: "bg-default-400",
        },
        primary: {
          indicator: "bg-primary",
        },
        secondary: {
          indicator: "bg-secondary",
        },
        success: {
          indicator: "bg-success",
        },
        warning: {
          indicator: "bg-warning",
        },
        danger: {
          indicator: "bg-danger",
        },
      },
      size: {
        sm: {
          label: "text-small",
          value: "text-small",
          track: "h-1",
        },
        md: {
          label: "text-medium",
          value: "text-medium",
          track: "h-3",
        },
        lg: {
          label: "text-large",
          value: "text-large",
          track: "h-5",
        },
      },
      radius: {
        none: {
          track: "rounded-none",
          indicator: "rounded-none",
        },
        sm: {
          track: "rounded-small",
          indicator: "rounded-small",
        },
        md: {
          track: "rounded-medium",
          indicator: "rounded-medium",
        },
        lg: {
          track: "rounded-large",
          indicator: "rounded-large",
        },
        full: {
          track: "rounded-full",
          indicator: "rounded-full",
        },
      },
      isStriped: {
        true: {
          indicator: "bg-stripe-gradient-default bg-stripe-size",
        },
      },
      isIndeterminate: {
        true: {
          indicator: ["absolute", "w-full", "origin-left", "animate-indeterminate-bar"],
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
          indicator: "transition-transform !duration-500",
        },
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
      radius: "full",
      isStriped: false,
      isIndeterminate: false,
      isDisabled: false,
    },
    compoundVariants: [
      // disableAnimation && !isIndeterminate
      {
        disableAnimation: true,
        isIndeterminate: false,
        class: {
          indicator: "!transition-none motion-reduce:transition-none",
        },
      },
      {
        color: "primary",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-primary bg-stripe-size",
        },
      },
      {
        color: "secondary",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-secondary bg-stripe-size",
        },
      },
      {
        color: "success",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-success bg-stripe-size",
        },
      },

      {
        color: "warning",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-warning bg-stripe-size",
        },
      },

      {
        color: "danger",
        isStriped: true,
        class: {
          indicator: "bg-stripe-gradient-danger bg-stripe-size",
        },
      },
    ],
  },
  {
    twMerge: true,
  },
);

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

export type ProgressVariantProps = VariantProps<typeof progress>;
export type ProgressSlots = keyof ReturnType<typeof progress>;
export type CircularProgressVariantProps = VariantProps<typeof circularProgress>;
export type CircularProgressSlots = keyof ReturnType<typeof circularProgress>;

export {progress, circularProgress};
