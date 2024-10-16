import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const rating = tv({
  slots: {
    base: "flex flex-col w-fit cursor-pointer",
    mainWrapper: "relative",
    iconWrapper: "inline-flex gap-x-2",
    iconSegment: ["relative"],
    icon: [],
    input: [],
    radioButtonsWrapper: ["absolute inset-0 top-0 flex"],
    radioButtonWrapper: ["col-span-1 inset-0 overflow-hidden opacity-0"],
    description: ["text-tiny", "text-foreground-400"],
    errorMessage: ["text-tiny", "text-red-400"],
  },
  variants: {
    size: {
      sm: {
        icon: "h-8 min-h-8 w-8 min-w-8",
      },
      md: {
        icon: "h-10 min-h-10 w-10 min-w-10",
      },
      lg: {
        icon: "h-12 min-h-12 w-12 min-w-12",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
      false: {},
    },
    disableAnimation: {
      true: {},
      false: {
        iconSegment: "data-[hovered=true]:scale-110 transition-transform duration-50 ease-linear",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type RatingVariantProps = VariantProps<typeof rating>;
export type RatingSlots = keyof ReturnType<typeof rating>;
export type RatingReturnType = ReturnType<typeof rating>;

export {rating};
