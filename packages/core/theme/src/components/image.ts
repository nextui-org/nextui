import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Image wrapper **Tailwind Variants** component
 *
 * const {base, img, blurredImg} = image({...})
 *
 * @example
 * <div className={base()}>
 *    <img alt="image" className={img())} src="https://..." />
 *    // duplicate it for the blur effect
 *    <img alt="image" className={blurredImg())} src="https://..." />
 * </div>
 */
const image = tv({
  slots: {
    base: "relative",
    img: "",
    blurredImg: [
      "absolute",
      "-z-10",
      "inset-0",
      "w-full",
      "h-full",
      "object-cover",
      "filter",
      "blur-lg",
      "opacity-40",
      "translate-x-1",
      "translate-y-2",
    ],
  },
  variants: {
    radius: {
      none: {
        base: "rounded-none",
        img: "rounded-none",
        blurredImg: "rounded-none",
      },
      base: {
        base: "rounded",
        img: "rounded",
        blurredImg: "rounded",
      },
      sm: {
        base: "rounded-sm",
        img: "rounded-sm",
        blurredImg: "rounded-sm",
      },
      md: {
        base: "rounded-md",
        img: "rounded-md",
        blurredImg: "rounded-md",
      },
      lg: {
        base: "rounded-lg",
        img: "rounded-lg",
        blurredImg: "rounded-lg",
      },
      xl: {
        base: "rounded-xl",
        img: "rounded-xl",
        blurredImg: "rounded-xl",
      },
      "2xl": {
        base: "rounded-2xl",
        img: "rounded-2xl",
        blurredImg: "rounded-2xl",
      },
      "3xl": {
        base: "rounded-3xl",
        img: "rounded-3xl",
        blurredImg: "rounded-3xl",
      },
      full: {
        base: "rounded-full",
        img: "rounded-full",
        blurredImg: "rounded-full",
      },
    },
    isZoomed: {
      true: {
        base: "overflow-hidden",
        img: [
          "object-cover",
          "transform",
          "hover:scale-125",
          "transition-transform",
          "!duration-300",
          "motion-reduce:transition-none",
        ],
      },
    },
    isLoading: {
      true: {
        base: [
          "space-y-5",
          "overflow-hidden",
          "bg-white/5",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_infinite]",
          "before:border-t",
          "before:border-content4/70",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-content4",
          "dark:before:via-neutral-700/10",
          "before:to-transparent",
          //after
          "after:absolute",
          "after:inset-0",
          "after:-z-10",
          "after:bg-content3",
          "dark:after:bg-content2",
        ],
        img: "opacity-0",
      },
    },
  },
  defaultVariants: {
    isZoomed: false,
    isBlurred: false,
    radius: "xl",
  },
});

export type ImageVariantProps = VariantProps<typeof image>;
export type ImageSlots = keyof ReturnType<typeof image>;

export {image};
