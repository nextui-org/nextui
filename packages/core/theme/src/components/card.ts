import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, header, body, footer} = card({...})
 *
 * <div className={base()}>
 *    <div className={header()}>Header</div>
 *    <div className={body()}>Body</div>
 *    <div className={footer()}>Footer</div>
 * </div>
 * ```
 */
const card = tv({
  slots: {
    base: [
      "flex",
      "flex-col",
      "relative",
      "overflow-hidden",
      "height-auto",
      "outline-none",
      "text-foreground",
      "box-border",
      "bg-content1",
      "border border-boundary",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    header: [
      "flex",
      "p-3",
      "z-10",
      "w-full",
      "justify-start",
      "items-center",
      "shrink-0",
      "overflow-inherit",
      "color-inherit",
      "subpixel-antialiased",
    ],
    body: [
      "relative",
      "flex",
      "flex-1",
      "w-full",
      "p-5",
      "flex-auto",
      "flex-col",
      "place-content-inherit",
      "align-items-inherit",
      "h-auto",
      "break-words",
      "text-left",
      "overflow-y-auto",
      "subpixel-antialiased",
    ],
    footer: [
      "p-3",
      "h-auto",
      "flex",
      "w-full",
      "items-center",
      "overflow-hidden",
      "color-inherit",
      "subpixel-antialiased",
    ],
  },
  variants: {
    shadow: {
      none: {
        base: "shadow-none",
      },
      sm: {
        base: "shadow-sm",
      },
      md: {
        base: "shadow-md",
      },
      lg: {
        base: "shadow-lg",
      },
      xl: {
        base: "shadow-xl",
      },
      "2xl": {
        base: "shadow-2xl",
      },
      inner: {
        base: "shadow-inner",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
        header: "rounded-t-none",
        footer: "rounded-b-none",
      },
      base: {
        base: "rounded",
        header: "rounded-t",
        footer: "rounded-b",
      },
      sm: {
        base: "rounded-sm",
        header: "rounded-t-sm",
        footer: "rounded-b-sm",
      },
      md: {
        base: "rounded-md",
        header: "rounded-t-md",
        footer: "rounded-b-md",
      },
      lg: {
        base: "rounded-lg",
        header: "rounded-t-lg",
        footer: "rounded-b-lg",
      },
      xl: {
        base: "rounded-xl",
        header: "rounded-t-xl",
        footer: "rounded-b-xl",
      },
      "2xl": {
        base: "rounded-2xl",
        header: "rounded-t-2xl",
        footer: "rounded-b-2xl",
      },
      "3xl": {
        base: "rounded-3xl",
        header: "rounded-t-3xl",
        footer: "rounded-b-3xl",
      },
      full: {
        base: "rounded-full",
        header: "rounded-t-full",
        footer: "rounded-b-full",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isHoverable: {
      true: {
        base: "data-[hover=true]:bg-content2 dark:data-[hover=true]:bg-content2",
      },
    },
    isPressable: {
      true: {base: "cursor-pointer"},
    },
    isBlurred: {
      true: {
        base: [
          "bg-background/80",
          "dark:bg-background/20",
          "backdrop-blur-md",
          "backdrop-saturate-150",
        ],
      },
    },
    isFooterBlurred: {
      true: {
        footer: ["bg-background/10", "backdrop-blur", "backdrop-saturate-150"],
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 cursor-not-allowed",
      },
    },
    disableAnimation: {
      true: "",
      false: {base: "transition-transform-background motion-reduce:transition-none"},
    },
  },
  compoundVariants: [
    {
      isPressable: true,
      disableAnimation: false,
      class: "data-[pressed=true]:scale-95 tap-highlight-transparent",
    },
  ],
  defaultVariants: {
    radius: "xl",
    shadow: "lg",
    fullWidth: false,
    isHoverable: false,
    isPressable: false,
    isDisabled: false,
    disableAnimation: false,
    isFooterBlurred: false,
  },
});

export type CardVariantProps = VariantProps<typeof card>;
export type CardSlots = keyof ReturnType<typeof card>;
export type CardReturnType = ReturnType<typeof card>;

export {card};
