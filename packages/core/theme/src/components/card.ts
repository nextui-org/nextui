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
      "m-0",
      "p-0",
      "relative",
      "overflow-hidden",
      "w-full",
      "height-auto",
      "bg-white",
      "text-foreground",
      "rounded-xl",
      "box-border",
      "dark:bg-neutral-900",
      "dark:text-foreground-dark",
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
    ],
  },
  variants: {
    variant: {
      shadow: {
        base: "drop-shadow-lg",
      },
      bordered: {
        base: "border-border dark:border-border-dark",
      },
      flat: {
        base: "bg-neutral-100",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
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
      false: {base: "!transition motion-reduce:transition-none"},
    },
  },
  compoundVariants: [
    {
      isHoverable: true,
      disableAnimation: false,
      class: "hover:-translate-y-0.5",
    },
    {
      isPressable: true,
      disableAnimation: false,
      class: "active:scale-95",
    },
    {
      variant: "bordered",
      borderWeight: "light",
      class: "border",
    },
    {
      variant: "bordered",
      borderWeight: "normal",
      class: "border-2",
    },
    {
      variant: "bordered",
      borderWeight: "bold",
      class: "border-3",
    },
    {
      variant: "bordered",
      borderWeight: "extrabold",
      class: "border-4",
    },
    {
      variant: "bordered",
      borderWeight: "black",
      class: "border-5",
    },
  ],
  defaultVariants: {
    variant: "shadow",
    isHoverable: false,
    isPressable: false,
  },
});

export type CardVariantProps = VariantProps<typeof card>;
export type CardSlots = keyof ReturnType<typeof card>;
export type CardReturnType = ReturnType<typeof card>;

export {card};
