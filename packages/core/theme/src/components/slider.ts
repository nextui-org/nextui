import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

/**
 * Slider wrapper **Tailwind Variants** component
 *
 * @example
 *
 * TODO: Add example here
 * const styles = slider()
 *
 * <span className={styles} />
 */
const slider = tv({
  slots: {
    base: "flex flex-col w-full gap-1",
    labelWrapper: "w-full flex justify-between",
    label: "",
    output: "",
    step: [
      "h-1.5",
      "w-1.5",
      "absolute",
      "rounded-full",
      "bg-default-300/50",
      "data-[in-range=true]:bg-background/50",
      "-translate-x-1/2",
      "-translate-y-1/2",
    ],
    trackWrapper: "relative flex gap-2",
    track: [
      "flex",
      "w-full",
      "relative",
      "rounded-full",
      "bg-default-300/50",
      "border-transparent",
    ],
    filler: "h-full absolute",
    thumb: [
      "rounded-full",
      "flex",
      "justify-center",
      "items-center",
      "before:absolute",
      "before:w-11",
      "before:h-11",
      "before:rounded-full",
      "data-[dragging=true]:after:scale-80",
      "after:shadow-small",
      "after:rounded-full",
      "after:shadow-small",
      "after:bg-background",
      dataFocusVisibleClasses,
    ],
    startContent: [],
    endContent: [],
  },
  variants: {
    size: {
      sm: {
        label: "text-small",
        output: "text-small",
        thumb: "w-5 h-5 after:w-4 after:h-4",
        step: "data-[in-range=false]:bg-default-200",
      },
      md: {
        thumb: "w-6 h-6 after:w-5 after:h-5",
        label: "text-small",
        output: "text-small",
      },
      lg: {
        thumb: "h-7 w-7 after:w-5 after:h-5",
        step: "w-2 h-2",
        label: "text-medium",
        output: "text-medium",
      },
    },
    color: {
      foreground: {
        filler: "bg-foreground",
        thumb: "bg-foreground",
      },
      primary: {
        filler: "bg-primary",
        thumb: "bg-primary",
      },
      secondary: {
        filler: "bg-secondary",
        thumb: "bg-secondary",
      },
      success: {
        filler: "bg-success",
        thumb: "bg-success",
      },
      warning: {
        filler: "bg-warning",
        thumb: "bg-warning",
      },
      danger: {
        filler: "bg-danger",
        thumb: "bg-danger",
      },
    },
    isVertical: {
      true: {
        base: "w-auto h-full flex-col-reverse items-center",
        trackWrapper: "flex-col h-full justify-center items-center",
        track: "h-full",
        labelWrapper: "flex-col justify-center items-center",
        filler: "w-full h-auto",
        step: "left-1/2",
        thumb: "left-1/2",
      },
      false: {
        step: "top-1/2",
        thumb: "top-1/2",
        trackWrapper: "items-center",
      },
    },
    isDisabled: {
      false: {
        thumb: ["cursor-grab", "data-[dragging=true]:cursor-grabbing"],
      },
      true: {
        base: "opacity-disabled",
        thumb: "cursor-default",
      },
    },
    disableAnimation: {
      true: {
        thumb: "data-[dragging=true]:after:scale-100",
      },
      false: {
        thumb: "after:transition-all motion-reduce:after:transition-none",
      },
    },
    showOutline: {
      true: {
        thumb: "ring-2 ring-background",
      },
      false: {
        thumb: "ring-transparent border-0",
      },
    },
  },
  compoundVariants: [
    // size && color
    {
      size: "sm",
      color: "foreground",
      class: {
        step: "data-[in-range=true]:bg-foreground",
      },
    },
    {
      size: "sm",
      color: "primary",
      class: {
        step: "data-[in-range=true]:bg-primary",
      },
    },
    {
      size: "sm",
      color: "secondary",
      class: {
        step: "data-[in-range=true]:bg-secondary",
      },
    },
    {
      size: "sm",
      color: "success",
      class: {
        step: "data-[in-range=true]:bg-success",
      },
    },
    {
      size: "sm",
      color: "warning",
      class: {
        step: "data-[in-range=true]:bg-warning",
      },
    },
    {
      size: "sm",
      color: "danger",
      class: {
        step: "data-[in-range=true]:bg-danger",
      },
    },

    // size && !isVertical
    {
      size: "sm",
      isVertical: false,
      class: {
        track:
          "h-1 my-[calc((theme(spacing.5)-theme(spacing.1))/2)] border-x-[calc(theme(spacing.5)/2)]",
      },
    },
    {
      size: "md",
      isVertical: false,
      class: {
        track:
          "h-3 my-[calc((theme(spacing.6)-theme(spacing.3))/2)] border-x-[calc(theme(spacing.6)/2)]",
      },
    },
    {
      size: "lg",
      isVertical: false,
      class: {
        track:
          "h-7 my-[calc((theme(spacing.7)-theme(spacing.5))/2)] border-x-[calc(theme(spacing.7)/2)]",
      },
    },
    // size && isVertical
    {
      size: "sm",
      isVertical: true,
      class: {
        track:
          "w-1 mx-[calc((theme(spacing.5)-theme(spacing.1))/2)] border-y-[calc(theme(spacing.5)/2)]",
      },
    },
    {
      size: "md",
      isVertical: true,
      class: {
        track:
          "w-3 mx-[calc((theme(spacing.6)-theme(spacing.3))/2)] border-y-[calc(theme(spacing.6)/2)]",
      },
    },
    {
      size: "lg",
      isVertical: true,
      class: {
        track:
          "w-7 mx-[calc((theme(spacing.7)-theme(spacing.5))/2)] border-y-[calc(theme(spacing.7)/2)]",
      },
    },
    // color && !isVertical
    {
      color: "foreground",
      isVertical: false,
      class: {
        track: 'data-[thumb-count="1"]:border-s-foreground',
      },
    },
    {
      color: "primary",
      isVertical: false,
      class: {
        track: 'data-[thumb-count="1"]:border-s-primary',
      },
    },
    {
      color: "secondary",
      isVertical: false,
      class: {
        track: 'data-[thumb-count="1"]:border-s-secondary',
      },
    },
    {
      color: "success",
      isVertical: false,
      class: {
        track: 'data-[thumb-count="1"]:border-s-success',
      },
    },
    {
      color: "warning",
      isVertical: false,
      class: {
        track: 'data-[thumb-count="1"]:border-s-warning',
      },
    },
    {
      color: "danger",
      isVertical: false,
      class: {
        track: 'data-[thumb-count="1"]:border-s-danger',
      },
    },
    // color && isVertical
    {
      color: "foreground",
      isVertical: true,
      class: {
        track: 'data-[thumb-count="1"]:border-b-foreground',
      },
    },
    {
      color: "primary",
      isVertical: true,
      class: {
        track: 'data-[thumb-count="1"]:border-b-primary',
      },
    },
    {
      color: "secondary",
      isVertical: true,
      class: {
        track: 'data-[thumb-count="1"]:border-b-secondary',
      },
    },
    {
      color: "success",
      isVertical: true,
      class: {
        track: 'data-[thumb-count="1"]:border-b-success',
      },
    },
    {
      color: "warning",
      isVertical: true,
      class: {
        track: 'data-[thumb-count="1"]:border-b-warning',
      },
    },
    {
      color: "danger",
      isVertical: true,
      class: {
        track: 'data-[thumb-count="1"]:border-b-danger',
      },
    },
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
    isDisabled: false,
    disableAnimation: false,
    showOutline: false,
  },
});

export type SliderVariantProps = VariantProps<typeof slider>;
export type SliderSlots = keyof ReturnType<typeof slider>;

export {slider};
