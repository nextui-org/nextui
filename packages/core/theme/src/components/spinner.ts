import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

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
    base: "relative inline-flex flex-col gap-2 items-center justify-center",
    wrapper: "relative flex",
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
      sm: {
        wrapper: "w-5 h-5",
        circle1: "border-2",
        circle2: "border-2",
        label: "text-small",
      },
      md: {
        wrapper: "w-8 h-8",
        circle1: "border-3",
        circle2: "border-3",
        label: "text-medium",
      },
      lg: {
        wrapper: "w-10 h-10",
        circle1: "border-3",
        circle2: "border-3",
        label: "text-large",
      },
    },
    color: {
      current: {
        circle1: "border-b-current",
        circle2: "border-b-current",
      },
      white: {
        circle1: "border-b-white",
        circle2: "border-b-white",
      },
      default: {
        circle1: "border-b-default",
        circle2: "border-b-default",
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
      foreground: {
        label: "text-foreground",
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
    labelColor: "foreground",
  },
});

export type SpinnerVariantProps = VariantProps<typeof spinner>;
export type SpinnerSlots = keyof ReturnType<typeof spinner>;

export {spinner};
