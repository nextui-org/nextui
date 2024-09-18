import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses} from "../utils";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, topBar, items, buttons} = fileUpload({...})
 *
 * <div className={base()}>
 *    <div className={topBar()}>Top Bar</div>
 *    <div className={items()}>Items</div>
 *    <div className={buttons()}>Buttons</div>
 * </div>
 * ```
 */
const fileUpload = tv({
  slots: {
    base: [
      "flex",
      "flex-col",
      "relative",
      "overflow-hidden",
      "h-auto",
      "outline-none",
      "text-foreground",
      "box-border",
      "bg-content1",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    topBar: ["flex", "gap-3"],
    items: [
      "relative",
      "w-full",
      "p-3",
      "max-h-24",
      "overflow-scroll",
      "break-words",
      "text-start",
      "overflow-y-auto",
      "subpixel-antialiased",
    ],
    buttons: [
      "flex",
      "gap-3",
      "p-3",
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
        base: "shadow-small",
      },
      md: {
        base: "shadow-medium",
      },
      lg: {
        base: "shadow-large",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed",
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    radius: "lg",
    shadow: "md",
    isDisabled: false,
  },
});

export type FileUploadVariantProps = VariantProps<typeof fileUpload>;
export type FileUploadSlots = keyof ReturnType<typeof fileUpload>;
export type FileUploadReturnType = ReturnType<typeof fileUpload>;

export {fileUpload};
