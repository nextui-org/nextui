import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

/**
 * Slider wrapper **Tailwind Variants** component
 *
 * @example
 *
 * const slots = slider()
 *
 * <div className={slots.base()}>
 *  <div className={slots.labelWrapper()}>
 *    <label className={slots.label()}>Label</label>
 *    <output className={slots.value()} />
 *  </div>
 *  <div className={slots.trackWrapper()}>
 *      <div className={slots.startContent()}>Start Content</div>
 *      <div className={slots.track()}>
 *         <div className={slots.filler()} />
 *         <div className={slots.step()} />
 *         <div className={slots.thumb()} />
 *         <div className={slots.mark()}>Mark</div>
 *      </div>
 *     <div className={slots.endContent()}>End Content</div>
 *   </div>
 * </div>
 */
const slider = tv({
  slots: {
    base: "flex flex-col w-full gap-1",
    labelWrapper: "w-full flex justify-between items-center",
    label: "",
    value: "",
    step: [
      "h-1.5",
      "w-1.5",
      "absolute",
      "rounded-full",
      "bg-default-300/50",
      "data-[in-range=true]:bg-background/50",
    ],
    mark: [
      "absolute",
      "text-small",
      "cursor-default",
      "opacity-50",
      "data-[in-range=true]:opacity-100",
    ],
    trackWrapper: "relative flex gap-2",
    track: ["flex", "w-full", "relative", "rounded-full", "bg-default-300/50"],
    filler: "h-full absolute",
    thumb: [
      "flex",
      "justify-center",
      "items-center",
      "before:absolute",
      "before:w-11",
      "before:h-11",
      "before:rounded-full",
      "after:shadow-small",
      "after:shadow-small",
      "after:bg-background",
      "data-[focused=true]:z-10",
      dataFocusVisibleClasses,
    ],
    startContent: [],
    endContent: [],
  },
  variants: {
    size: {
      sm: {
        label: "text-small",
        value: "text-small",
        thumb: "w-5 h-5 after:w-4 after:h-4",
        step: "data-[in-range=false]:bg-default-200",
      },
      md: {
        thumb: "w-6 h-6 after:w-5 after:h-5",
        label: "text-small",
        value: "text-small",
      },
      lg: {
        thumb: "h-7 w-7 after:w-5 after:h-5",
        step: "w-2 h-2",
        label: "text-medium",
        value: "text-medium",
        mark: "mt-2",
      },
    },
    radius: {
      none: {
        thumb: "rounded-none after:rounded-none",
      },
      sm: {
        thumb:
          "rounded-[calc(theme(borderRadius.small)/2)] after:rounded-[calc(theme(borderRadius.small)/3)]",
      },
      md: {
        thumb:
          "rounded-[calc(theme(borderRadius.medium)/2)] after:rounded-[calc(theme(borderRadius.medium)/3)]",
      },
      lg: {
        thumb:
          "rounded-[calc(theme(borderRadius.large)/1.5)] after:rounded-[calc(theme(borderRadius.large)/2)]",
      },
      full: {
        thumb: "rounded-full after:rounded-full",
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
        filler: "w-full h-auto",
        thumb: "left-1/2",
        track: "h-full border-y-transparent",
        labelWrapper: "flex-col justify-center items-center",
        step: ["left-1/2", "-translate-x-1/2", "translate-y-1/2"],
        mark: ["left-1/2", "ml-1", "translate-x-1/2", "-translate-y-1/2"],
      },
      false: {
        thumb: "top-1/2",
        trackWrapper: "items-center",
        track: "border-x-transparent",
        step: ["top-1/2", "-translate-x-1/2", "-translate-y-1/2"],
        mark: ["top-1/2", "mt-1", "-translate-x-1/2", "translate-y-1/2"],
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
    hasMarks: {
      true: {
        base: "mb-5",
      },
      false: {},
    },
    showOutline: {
      true: {
        thumb: "ring-2 ring-background",
      },
      false: {
        thumb: "ring-transparent border-0",
      },
    },
    hideValue: {
      true: {
        value: "sr-only",
      },
    },
    hideThumb: {
      true: {
        thumb: "sr-only",
        track: "overflow-hidden cursor-pointer",
      },
    },
    hasSingleThumb: {
      true: {},
      false: {},
    },
    disableAnimation: {
      true: {
        thumb: "data-[dragging=true]:after:scale-100",
      },
      false: {
        thumb: "after:transition-all motion-reduce:after:transition-none",
        mark: "transition-opacity motion-reduce:transition-none",
      },
    },
    disableThumbScale: {
      true: {},
      false: {
        thumb: "data-[dragging=true]:after:scale-80",
      },
    },
  },
  compoundVariants: [
    // size="sm" || size="md" && showOutline={false}
    {
      size: ["sm", "md"],
      showOutline: false,
      class: {
        thumb: "shadow-small",
      },
    },
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
          "h-1 my-[calc((theme(spacing.5)-theme(spacing.1))/2)] data-[thumb-hidden=false]:border-x-[calc(theme(spacing.5)/2)]",
      },
    },
    {
      size: "md",
      isVertical: false,
      class: {
        track:
          "h-3 my-[calc((theme(spacing.6)-theme(spacing.3))/2)] data-[thumb-hidden=false]:border-x-[calc(theme(spacing.6)/2)]",
      },
    },
    {
      size: "lg",
      isVertical: false,
      class: {
        track:
          "h-7 my-[calc((theme(spacing.7)-theme(spacing.5))/2)] data-[thumb-hidden=false]:border-x-[calc(theme(spacing.7)/2)]",
      },
    },
    // size && isVertical
    {
      size: "sm",
      isVertical: true,
      class: {
        track:
          "w-1 mx-[calc((theme(spacing.5)-theme(spacing.1))/2)] data-[thumb-hidden=false]:border-y-[calc(theme(spacing.5)/2)]",
      },
    },
    {
      size: "md",
      isVertical: true,
      class: {
        track:
          "w-3 mx-[calc((theme(spacing.6)-theme(spacing.3))/2)] data-[thumb-hidden=false]:border-y-[calc(theme(spacing.6)/2)]",
      },
    },
    {
      size: "lg",
      isVertical: true,
      class: {
        track:
          "w-7 mx-[calc((theme(spacing.7)-theme(spacing.5))/2)] data-[thumb-hidden=false]:border-y-[calc(theme(spacing.7)/2)]",
      },
    },
    // color && !isVertical && hasSingleThumb
    {
      color: "foreground",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-foreground",
      },
    },
    {
      color: "primary",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-primary",
      },
    },
    {
      color: "secondary",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-secondary",
      },
    },
    {
      color: "success",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-success",
      },
    },
    {
      color: "warning",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-warning",
      },
    },
    {
      color: "danger",
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-danger",
      },
    },
    // color && isVertical && hasSingleThumb
    {
      color: "foreground",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-foreground",
      },
    },
    {
      color: "primary",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-primary",
      },
    },
    {
      color: "secondary",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-secondary",
      },
    },
    {
      color: "success",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-success",
      },
    },
    {
      color: "warning",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-warning",
      },
    },
    {
      color: "danger",
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-danger",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
    radius: "full",
    hideValue: false,
    hideThumb: false,
    isDisabled: false,
    disableThumbScale: false,
    disableAnimation: false,
    showOutline: false,
  },
});

export type SliderVariantProps = VariantProps<typeof slider>;
export type SliderSlots = keyof ReturnType<typeof slider>;

export {slider};
