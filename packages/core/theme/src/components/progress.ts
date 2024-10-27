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

export type ProgressVariantProps = VariantProps<typeof progress>;
export type ProgressSlots = keyof ReturnType<typeof progress>;

export {progress};
