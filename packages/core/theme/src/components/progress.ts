import {tv, type VariantProps} from "tailwind-variants";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, wrapper, filler, labelWrapper, label, value} = progress({...})
 *
 * <div className={base()} aria-label="progress" role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}>
 *   <div className={labelWrapper()}>
 *      <span className={label()}>{label}</span>
 *      <span className={value()}>{value}</span>
 *   </div>
 *   <div className={wrapper()}>
 *     <div className={filler()} style={{width: `${value}%`}} />
 *   </div>
 * </div>
 * ```
 */
const progress = tv({
  slots: {
    base: "flex flex-col gap-2",
    label: "",
    labelWrapper: "flex justify-between",
    value: "",
    wrapper: "flex flex-1 bg-neutral",
    filler: "",
  },
  variants: {
    color: {
      neutral: {
        filler: "bg-neutral-500",
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
        filler: "h-1",
      },
      sm: {
        filler: "h-2",
      },
      md: {
        filler: "h-4",
      },
      lg: {
        filler: "h-6",
      },
      xl: {
        filler: "h-7",
      },
    },
    radius: {
      none: {
        wrapper: "rounded-none",
        filler: "rounded-none",
      },
      wrapper: {
        wrapper: "rounded",
        filler: "rounded",
      },
      sm: {
        wrapper: "rounded-sm",
        filler: "rounded-sm",
      },
      md: {
        wrapper: "rounded-md",
        filler: "rounded-md",
      },
      lg: {
        wrapper: "rounded-lg",
        filler: "rounded-lg",
      },
      xl: {
        wrapper: "rounded-xl",
        filler: "rounded-xl",
      },
      full: {
        wrapper: "rounded-full",
        filler: "rounded-full",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 cursor-not-allowed",
      },
    },
    disableAnimation: {
      true: {},
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    radius: "full",
    isDisabled: false,
    disableAnimation: false,
  },
});

export type ProgressVariantProps = VariantProps<typeof progress>;
export type ProgressSlots = keyof ReturnType<typeof progress>;

export {progress};
