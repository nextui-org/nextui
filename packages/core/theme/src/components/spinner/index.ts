import {tv, type VariantProps} from "tailwind-variants";

/**
 * Spinner wrapper **Tailwind Variants** component
 *
 * const {base, line1, line2, label } = spinner({...})
 *
 * @example
 * <div className={base())}>
 *    <i className={circle1()}/>
 *    <i className={circle2()}/>
 *    <span className={label()}/>
 * </div>
 */
const spinner = tv({
  slots: {
    base: "flex flex-col items-center justify-center relative",
    circle1: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "animate-spinner-ease-spin",
      "border-2",
      "border-solid",
      "border-t-transparent",
      "border-l-transparent",
      "border-r-transparent",
    ],
    circle2: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "opacity-75",
      "animate-spinner-linear-spin",
      "border-2",
      "border-dotted",
      "border-t-transparent",
      "border-l-transparent",
      "border-r-transparent",
    ],
    label: "text-foreground dark:text-foreground-dark font-regular",
  },
  variants: {
    size: {
      xs: {
        base: "w-4 h-4",
        circle1: "border-2",
        circle2: "border-2",
        label: "translate-y-6 text-xs",
      },
      sm: {
        base: "w-5 h-5",
        circle1: "border-2",
        circle2: "border-2",
        label: "translate-y-6 text-xs",
      },
      md: {
        base: "w-8 h-8",
        circle1: "border-[3px]",
        circle2: "border-[3px]",
        label: "translate-y-8 text-sm",
      },
      lg: {
        base: "w-10 h-10",
        circle1: "border-[3px]",
        circle2: "border-[3px]",
        label: "translate-y-10 text-base",
      },
      xl: {
        base: "w-12 h-12",
        circle1: "border-4",
        circle2: "border-4",
        label: "translate-y-12 text-lg",
      },
    },
    color: {
      white: {
        circle1: "border-b-white",
        circle2: "border-b-white",
      },
      neutral: {
        circle1: "border-b-neutral",
        circle2: "border-b-neutral",
      },
      primary: {
        circle1: "border-b-primary",
        circle2: "border-b-primary",
      },
      secondary: {
        circle1: "border-b-secondary",
        circle2: "border-b-secondary",
      },
      success: {
        circle1: "border-b-success",
        circle2: "border-b-success",
      },
      warning: {
        circle1: "border-b-warning",
        circle2: "border-b-warning",
      },
      danger: {
        circle1: "border-b-danger",
        circle2: "border-b-danger",
      },
    },
    labelColor: {
      neutral: {
        label: "text-neutral",
      },
      primary: {
        label: "text-primary",
      },
      secondary: {
        label: "text-secondary",
      },
      success: {
        label: "text-success",
      },
      warning: {
        label: "text-warning",
      },
      danger: {
        label: "text-danger",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

export type SpinnerVariantProps = VariantProps<typeof spinner>;
export type SpinnerSlots = keyof ReturnType<typeof spinner>;

export {spinner};
