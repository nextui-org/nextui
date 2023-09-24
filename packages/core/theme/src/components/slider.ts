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
    label: "font-medium text-medium",
    output: "",
    track:
      "flex w-full h-7 relative bg-default-300/50 border-x-[calc(theme(spacing.7)/2)] rounded-full border-transparent",
    filler: "bg-primary h-full absolute",
    thumb: [
      "rounded-full cursor-grab top-1/2 w-7 h-7 bg-primary before:w-",
      "data-[dragging=true]:cursor-grabbing",
      "flex",
      "justify-center",
      "items-center",
      "before:absolute",
      "before:w-11",
      "before:h-11",
      "before:rounded-full",
      "data-[dragging=true]:after:scale-95",
      "after:transition-all",
      "after:w-5",
      "after:h-5",
      "after:bg-white",
      "after:shadow-small",
      "after:rounded-full",
      dataFocusVisibleClasses,
    ],
  },
  variants: {
    size: {
      sm: {
        track:
          "h-1 my-[calc((theme(spacing.5)-theme(spacing.1))/2)] border-x-[calc(theme(spacing.5)/2)]",
        label: "text-small",
        output: "text-small",
        thumb: "w-5 h-5 after:w-3 after:h-3",
      },
      md: {
        track:
          "h-3 my-[calc((theme(spacing.6)-theme(spacing.3))/2)] border-x-[calc(theme(spacing.6)/2)]",
        thumb: "w-6 h-6 after:w-4 after:h-4",
        label: "text-small",
        output: "text-small",
      },
      lg: {track: "h-7", label: "text-medium", output: "text-medium"},
    },
    isRangeSlider: {
      true: {track: ""},
      false: {track: "border-s-primary"},
    },
    isDisabled: {
      true: {
        base: "opacity-disabled",
        thumb: "cursor-default",
      },
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

export type SliderVariantProps = VariantProps<typeof slider>;
export type SliderSlots = keyof ReturnType<typeof slider>;

export {slider};
