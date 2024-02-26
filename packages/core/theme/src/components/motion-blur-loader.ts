import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * MotionBlurLoader wrapper **Tailwind Variants** component
 *
 * const {base, circle1, circle2, circle3, label } = motionBlurLoader({...})
 *
 * @example
 * <div className={base())}>
 *    <i className={circle1()}/>
 *    <i className={circle2()}/>
 *    <i className={circle3()}/>
 *    <span className={label()}/>
 * </div>
 */
const motionBlurLoader = tv({
  slots: {
    base: "relative inline-flex flex-col gap-2 items-left justify-left",
    wrapper: "relative flex",
    circle1: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "animate-left-right-motion",
      "opacity-100",
    ],
    circle2: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "animate-left-right-motion-delay-150",
      "opacity-50",
    ],
    circle3: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "animate-left-right-motion-delay-75",
      "opacity-20",
    ],
    label: "text-foreground dark:text-foreground-dark font-regular",
  },
  variants: {
    size: {
      xs: {
        wrapper: "w-3 h-3",
        label: "text-tiny",
      },
      sm: {
        wrapper: "w-5 h-5",
        label: "text-small",
      },
      md: {
        wrapper: "w-8 h-8",
        label: "text-medium",
      },
      lg: {
        wrapper: "w-10 h-10",
        label: "text-large",
      },
    },
    color: {
      current: {
        circle1: "bg-current",
        circle2: "bg-current",
        circle3: "bg-current",
      },
      white: {
        circle1: "bg-white",
        circle2: "bg-white",
        circle3: "bg-white",
      },
      default: {
        circle1: "bg-default",
        circle2: "bg-default",
        circle3: "bg-default",
      },
      primary: {
        circle1: "bg-primary",
        circle2: "bg-primary",
        circle3: "bg-primary",
      },
      secondary: {
        circle1: "bg-secondary",
        circle2: "bg-secondary",
        circle3: "bg-secondary",
      },
      success: {
        circle1: "bg-success",
        circle2: "bg-success",
        circle3: "bg-success",
      },
      warning: {
        circle1: "bg-warning",
        circle2: "bg-warning",
        circle3: "bg-warning",
      },
      danger: {
        circle1: "bg-danger",
        circle2: "bg-danger",
        circle3: "bg-danger",
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

export type MotionBlurLoaderVariantProps = VariantProps<typeof motionBlurLoader>;
export type MotionBlurLoaderSlots = keyof ReturnType<typeof motionBlurLoader>;

export {motionBlurLoader};
