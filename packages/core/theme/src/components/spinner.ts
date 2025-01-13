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
    dots: "relative rounded-full mx-auto",
    spinnerBars: [
      "absolute",
      "animate-fade-out",
      "rounded-full",
      "w-[25%]",
      "h-[8%]",
      "left-[calc(37.5%)]",
      "top-[calc(46%)]",
      "[&:nth-child(1)]:[animation-delay:-1.2s]",
      "[&:nth-child(2)]:[animation-delay:-1.1s]",
      "[&:nth-child(3)]:[animation-delay:-1s]",
      "[&:nth-child(4)]:[animation-delay:-0.9s]",
      "[&:nth-child(5)]:[animation-delay:-0.8s]",
      "[&:nth-child(6)]:[animation-delay:-0.7s]",
      "[&:nth-child(7)]:[animation-delay:-0.6s]",
      "[&:nth-child(8)]:[animation-delay:-0.5s]",
      "[&:nth-child(9)]:[animation-delay:-0.4s]",
      "[&:nth-child(10)]:[animation-delay:-0.3s]",
      "[&:nth-child(11)]:[animation-delay:-0.2s]",
      "[&:nth-child(12)]:[animation-delay:-0.1s]",
      "[&:nth-child(1)]:[transform:rotate(0deg)translate(140%)]",
      "[&:nth-child(2)]:[transform:rotate(30deg)translate(140%)]",
      "[&:nth-child(3)]:[transform:rotate(60deg)translate(140%)]",
      "[&:nth-child(4)]:[transform:rotate(90deg)translate(140%)]",
      "[&:nth-child(5)]:[transform:rotate(120deg)translate(140%)]",
      "[&:nth-child(6)]:[transform:rotate(150deg)translate(140%)]",
      "[&:nth-child(7)]:[transform:rotate(180deg)translate(140%)]",
      "[&:nth-child(8)]:[transform:rotate(210deg)translate(140%)]",
      "[&:nth-child(9)]:[transform:rotate(240deg)translate(140%)]",
      "[&:nth-child(10)]:[transform:rotate(270deg)translate(140%)]",
      "[&:nth-child(11)]:[transform:rotate(300deg)translate(140%)]",
      "[&:nth-child(12)]:[transform:rotate(330deg)translate(140%)]",
    ],
  },
  variants: {
    size: {
      sm: {
        wrapper: "w-5 h-5",
        circle1: "border-2",
        circle2: "border-2",
        dots: "size-1",
        label: "text-small",
      },
      md: {
        wrapper: "w-8 h-8",
        circle1: "border-3",
        circle2: "border-3",
        dots: "size-1.5",
        label: "text-medium",
      },
      lg: {
        wrapper: "w-10 h-10",
        circle1: "border-3",
        circle2: "border-3",
        dots: "size-2",
        label: "text-large",
      },
    },
    color: {
      current: {
        circle1: "border-b-current",
        circle2: "border-b-current",
        dots: "bg-current",
        spinnerBars: "bg-current",
      },
      white: {
        circle1: "border-b-white",
        circle2: "border-b-white",
        dots: "bg-white",
        spinnerBars: "bg-white",
      },
      default: {
        circle1: "border-b-default",
        circle2: "border-b-default",
        dots: "bg-default",
        spinnerBars: "bg-default",
      },
      primary: {
        circle1: "border-b-primary",
        circle2: "border-b-primary",
        dots: "bg-primary",
        spinnerBars: "bg-primary",
      },
      secondary: {
        circle1: "border-b-secondary",
        circle2: "border-b-secondary",
        dots: "bg-secondary",
        spinnerBars: "bg-secondary",
      },
      success: {
        circle1: "border-b-success",
        circle2: "border-b-success",
        dots: "bg-success",
        spinnerBars: "bg-success",
      },
      warning: {
        circle1: "border-b-warning",
        circle2: "border-b-warning",
        dots: "bg-warning",
        spinnerBars: "bg-warning",
      },
      danger: {
        circle1: "border-b-danger",
        circle2: "border-b-danger",
        dots: "bg-danger",
        spinnerBars: "bg-danger",
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
      dots: {
        wrapper: "translate-y-3/4",
        dots: [
          "animate-sway",
          "[&:nth-child(2)]:[animation-delay:250ms]",
          "[&:nth-child(3)]:[animation-delay:500ms]",
        ],
      },
      "dots-blink": {
        dots: [
          "animate-blink",
          "[&:nth-child(2)]:[animation-delay:200ms]",
          "[&:nth-child(3)]:[animation-delay:400ms]",
        ],
      },
      "spinner-bars": {},
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
    {
      variant: "dots",
      size: "sm",
      class: {
        base: "h-5",
        wrapper: "w-5 h-1",
      },
    },
    {
      variant: "dots",
      size: "md",
      class: {
        base: "h-8",
        wrapper: "w-8 h-1.5",
      },
    },
    {
      variant: "dots",
      size: "lg",
      class: {
        base: "h-10",
        wrapper: "w-12 h-2",
      },
    },
    {
      variant: "dots-blink",
      size: "sm",
      class: {
        base: "h-5",
        wrapper: "w-4 h-1",
      },
    },
    {
      variant: "dots-blink",
      size: "md",
      class: {
        base: "h-8",
        wrapper: "w-6 h-1.5",
      },
    },
    {
      variant: "dots-blink",
      size: "lg",
      class: {
        base: "h-10",
        wrapper: "w-9 h-2",
      },
    },
  ],
});

export type SpinnerVariantProps = VariantProps<typeof spinner>;
export type SpinnerSlots = keyof ReturnType<typeof spinner>;

export {spinner};
