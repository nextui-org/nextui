import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Image wrapper **Tailwind Variants** component
 *
 * const {base, img, blurredImg, zoomedWrapper} = image({...})
 *
 * @example
 * <div className={base()}>
 *    <img alt="image" className={img())} src="https://..." />
 *      // wrap the image if you want to zoom it
 *      <div className={zoomedWrapper()}>
 *       <img alt="image" className={img())} src="https://..." />
 *     </div>
 *    // duplicate it for the blur effect
 *    <img alt="image" className={blurredImg())} src="https://..." />
 * </div>
 */
const image = tv({
  slots: {
    base: "relative shadow-black/5",
    zoomedWrapper: "relative overflow-hidden rounded-inherit",
    img: "relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100",
    blurredImg: [
      "absolute",
      "z-0",
      "inset-0",
      "w-full",
      "h-full",
      "object-cover",
      "filter",
      "blur-lg",
      "scale-105",
      "saturate-150",
      "opacity-30",
      "translate-y-1",
    ],
  },
  variants: {
    radius: {
      none: {},
      base: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      "2xl": {},
      "3xl": {},
      full: {},
    },
    shadow: {
      none: {
        base: "shadow-none",
        img: "shadow-none",
      },
      sm: {
        base: "shadow-sm",
        img: "shadow-sm",
      },
      base: {
        base: "shadow",
        img: "shadow",
      },

      md: {
        base: "shadow-md",
        img: "shadow-md",
      },
      lg: {
        base: "shadow-lg",
        img: "shadow-lg",
      },
      xl: {
        base: "shadow-xl",
        img: "shadow-xl",
      },
      "2xl": {
        base: "shadow-2xl",
        img: "shadow-2xl",
      },
      inner: {
        base: "shadow-inner",
        img: "shadow-inner",
      },
    },
    isZoomed: {
      true: {
        img: ["object-cover", "transform", "hover:scale-125"],
      },
    },
    showSkeleton: {
      true: {
        base: [
          "group",
          "relative",
          "overflow-hidden",
          "bg-content3 dark:bg-content2",
          // before
          "before:opacity-100",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_infinite]",
          "before:border-t",
          "before:border-content4/30",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-content4",
          "dark:before:via-default-700/10",
          "before:to-transparent",
          //after
          "after:opacity-100",
          "after:absolute",
          "after:inset-0",
          "after:-z-10",
          "after:bg-content3",
          "dark:after:bg-content2",
        ],
        img: "opacity-0",
      },
    },
    disableAnimation: {
      true: {
        img: "transition-none",
      },
      false: {
        img: "transition-transform-opacity motion-reduce:transition-none !duration-300",
      },
    },
  },
  defaultVariants: {
    radius: "xl",
    shadow: "none",
    isZoomed: false,
    isBlurred: false,
    showSkeleton: false,
    disableAnimation: false,
  },
  compoundSlots: [
    {
      slots: ["base", "img", "blurredImg", "zoomedWrapper"],
      radius: "none",
      class: "rounded-none",
    },
    {
      slots: ["base", "img", "blurredImg", "zoomedWrapper"],
      radius: "full",
      class: "rounded-full",
    },
    {
      slots: ["base", "img", "blurredImg", "zoomedWrapper"],
      radius: "base",
      class: "rounded",
    },
    {
      slots: ["base", "img", "blurredImg", "zoomedWrapper"],
      radius: "sm",
      class: "rounded-sm",
    },
    {
      slots: ["base", "img", "blurredImg", "zoomedWrapper"],
      radius: "md",
      class: "rounded-md",
    },
    {
      slots: ["base", "img", "blurredImg", "zoomedWrapper"],
      radius: "lg",
      class: "rounded-lg",
    },
    {
      slots: ["base", "img", "blurredImg", "zoomedWrapper"],
      radius: "xl",
      class: "rounded-xl",
    },
    {
      slots: ["base", "img", "blurredImg", "zoomedWrapper"],
      radius: "2xl",
      class: "rounded-2xl",
    },
    {
      slots: ["base", "img", "blurredImg", "zoomedWrapper"],
      radius: "3xl",
      class: "rounded-3xl",
    },
  ],
});

export type ImageVariantProps = VariantProps<typeof image>;
export type ImageSlots = keyof ReturnType<typeof image>;

export {image};
