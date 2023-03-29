import {tv, type VariantProps} from "tailwind-variants";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, labelWrapper, label, value, track, filler} = progress({...})
 *
 * <div className={base()} aria-label="progress" role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}>
 *   <div className={labelWrapper()}>
 *      <span className={label()}>{label}</span>
 *      <span className={value()}>{value}</span>
 *   </div>
 *   <div className={track()}>
 *     <div className={filler()} style={{width: `${value}%`}} />
 *   </div>
 * </div>
 * ```
 */
const progress = tv(
  {
    slots: {
      base: "flex flex-col gap-2",
      label: "",
      labelWrapper: "flex justify-between",
      value: "",
      track: "z-0 relative bg-neutral-200 overflow-hidden",
      filler: "h-full",
    },
    variants: {
      color: {
        neutral: {
          filler: "bg-neutral-400",
        },
        primary: {
          filler: "bg-primary",
        },
        secondary: {
          filler: "bg-secondary",
        },
        success: {
          filler: "bg-success",
        },
        warning: {
          filler: "bg-warning",
        },
        danger: {
          filler: "bg-danger",
        },
      },
      size: {
        xs: {
          track: "h-1",
        },
        sm: {
          track: "h-2",
        },
        md: {
          track: "h-4",
        },
        lg: {
          track: "h-6",
        },
        xl: {
          track: "h-7",
        },
      },
      radius: {
        none: {
          track: "rounded-none",
          filler: "rounded-none",
        },
        base: {
          track: "rounded",
          filler: "rounded",
        },
        sm: {
          track: "rounded-sm",
          filler: "rounded-sm",
        },
        md: {
          track: "rounded-md",
          filler: "rounded-md",
        },
        lg: {
          track: "rounded-lg",
          filler: "rounded-lg",
        },
        xl: {
          track: "rounded-xl",
          filler: "rounded-xl",
        },
        full: {
          track: "rounded-full",
          filler: "rounded-full",
        },
      },
      isStriped: {
        true: {
          filler: "bg-stripe-gradient bg-[length:1.25rem_1.25rem]",
        },
      },
      isIndeterminate: {
        true: {
          filler: ["absolute", "w-1/2", "animate-indeterminate-bar"],
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
          filler: "transition-transform !duration-500",
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
          filler: "!transition-none motion-reduce:transition-none",
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
