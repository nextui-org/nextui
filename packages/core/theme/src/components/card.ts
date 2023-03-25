import {tv, type VariantProps} from "tailwind-variants";

import {ringClasses} from "../utils";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, header, body, footer} = card({...})
 *
 * <div className={card()}>
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
      "w-full",
      "height-auto",
      "text-foreground",
      "box-border",
      "dark:bg-content1",
      "border border-neutral-100",
    ],
    header: [
      "flex",
      "justify-start",
      "items-center",
      "shrink-0",
      "w-full",
      "overflow-inherit",
      "color-inherit",
      "p-3",
      "z-10",
      "subpixel-antialiased",
    ],
    body: [
      "relative",
      "flex",
      "flex-auto",
      "flex-col",
      "place-content-inherit",
      "align-items-inherit",
      "w-full",
      "h-auto",
      "py-5",
      "px-3",
      "text-left",
      "overflow-y-auto",
      "subpixel-antialiased",
    ],
    footer: [
      "w-full",
      "h-auto",
      "p-3",
      "flex",
      "items-center",
      "overflow-hidden",
      "color-inherit",
      "rounded-b-xl",
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
      },
      base: {
        base: "rounded",
      },
      sm: {
        base: "rounded-sm",
      },
      md: {
        base: "rounded-md",
      },
      lg: {
        base: "rounded-lg",
      },
      xl: {
        base: "rounded-xl",
      },
      "2xl": {
        base: "rounded-2xl",
      },
      "3xl": {
        base: "rounded-3xl",
      },
      full: {
        base: "rounded-full",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isBordered: {
      true: {
        base: "border-2 border-neutral",
      },
    },
    isHoverable: {
      true: {
        base: "hover:drop-shadow-lg",
      },
    },
    isPressable: {
      true: {base: "cursor-pointer"},
    },
    isFocusVisible: {
      true: {
        base: [...ringClasses],
      },
    },
    isFooterBlurred: {
      true: {
        footer: "backdrop-blur-md backdrop-saturate-[1.8]",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 cursor-not-allowed",
      },
    },
    disableAnimation: {
      true: "",
      false: {base: "transition-transform motion-reduce:transition-none"},
    },
  },
  compoundVariants: [
    {
      isHoverable: true,
      disableAnimation: false,
      class: "hover:-translate-y-2",
    },
    {
      isPressable: true,
      disableAnimation: false,
      class: "active:scale-95",
    },
  ],
  defaultVariants: {
    radius: "xl",
    shadow: "lg",
    fullWidth: false,
    isHoverable: false,
    isPressable: false,
    isFocusVisible: false,
    isBordered: false,
    isDisabled: false,
    disableAnimation: false,
    isFooterBlurred: false,
  },
});

export type CardVariantProps = VariantProps<typeof card>;
export type CardSlots = keyof ReturnType<typeof card>;
export type CardReturnType = ReturnType<typeof card>;

export {card};
