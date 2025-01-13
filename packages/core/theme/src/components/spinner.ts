import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * Spinner wrapper **Tailwind Variants** component
 *
 * const {base, circle1, circle2, label } = spinner({...})
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
    label: "text-foreground dark:text-foreground-dark font-regular",
    circle1: "absolute w-full h-full rounded-full",
    circle2: "absolute w-full h-full rounded-full",
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
    variant: {
      default: {
        circle1: [
          "animate-spinner-ease-spin",
          "border-solid",
          "border-t-transparent",
          "border-l-transparent",
          "border-r-transparent",
        ],
        circle2: [
          "opacity-75",
          "animate-spinner-linear-spin",
          "border-dotted",
          "border-t-transparent",
          "border-l-transparent",
          "border-r-transparent",
        ],
      },
      gradient: {
        circle1: [
          "border-0",
          "bg-gradient-to-b",
          "from-transparent",
          "via-transparent",
          "to-primary",
          "animate-spinner-linear-spin",
          "[animation-duration:1s]",
          "[-webkit-mask:radial-gradient(closest-side,rgba(0,0,0,0.0)calc(100%-3px),rgba(0,0,0,1)calc(100%-3px))]",
        ],
        circle2: ["hidden"],
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
    labelColor: "foreground",
    variant: "default",
  },
  compoundVariants: [
    {variant: "gradient", color: "current", class: {circle1: "to-current"}},
    {variant: "gradient", color: "white", class: {circle1: "to-white"}},
    {variant: "gradient", color: "default", class: {circle1: "to-default"}},
    {variant: "gradient", color: "primary", class: {circle1: "to-primary"}},
    {variant: "gradient", color: "secondary", class: {circle1: "to-secondary"}},
    {variant: "gradient", color: "success", class: {circle1: "to-success"}},
    {variant: "gradient", color: "warning", class: {circle1: "to-warning"}},
    {variant: "gradient", color: "danger", class: {circle1: "to-danger"}},
  ],
});

export type SpinnerVariantProps = VariantProps<typeof spinner>;
export type SpinnerSlots = keyof ReturnType<typeof spinner>;

export {spinner};
