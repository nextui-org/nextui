import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

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
        xs: {
          label: "text-xs",
          value: "text-xs",
          track: "h-1",
        },
        sm: {
          label: "text-sm",
          value: "text-sm",
          track: "h-2",
        },
        md: {
          label: "text-base",
          value: "text-base",
          track: "h-4",
        },
        lg: {
          label: "text-lg",
          value: "text-lg",
          track: "h-6",
        },
        xl: {
          label: "text-lg",
          value: "text-lg",
          track: "h-7",
        },
      },
      radius: {
        none: {
          track: "rounded-none",
          indicator: "rounded-none",
        },
        base: {
          track: "rounded",
          indicator: "rounded",
        },
        sm: {
          track: "rounded-sm",
          indicator: "rounded-sm",
        },
        md: {
          track: "rounded-md",
          indicator: "rounded-md",
        },
        lg: {
          track: "rounded-lg",
          indicator: "rounded-lg",
        },
        xl: {
          track: "rounded-xl",
          indicator: "rounded-xl",
        },
        full: {
          track: "rounded-full",
          indicator: "rounded-full",
        },
      },
      isStriped: {
        true: {
          indicator: "bg-stripe-gradient bg-[length:1.25rem_1.25rem]",
        },
      },
      isIndeterminate: {
        true: {
          indicator: ["absolute", "w-full", "origin-left", "animate-indeterminate-bar"],
        },
      },
      isDisabled: {
        true: {
          base: "opacity-50 cursor-not-allowed",
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
      disableAnimation: false,
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
    ],
  },
  {
    twMerge: false,
  },
);

export type ProgressVariantProps = VariantProps<typeof progress>;
export type ProgressSlots = keyof ReturnType<typeof progress>;

export {progress};
