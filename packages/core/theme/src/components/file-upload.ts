import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses} from "../utils";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, topbar, items, item, buttons} = fileUpload({...})
 *
 * <div className={base()}>
 *     <div className={topbar()}>Topbar</div>
 *     <div className={items()}>
 *         <div className={item()}>
 *             Item
 *         </div>
 *     </div>
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
      ...dataFocusVisibleClasses,
    ],
    topbar: ["flex", "gap-3"],
    items: [
      "relative",
      "p-3",
      "break-words",
      "text-start",
      "overflow-y-auto",
      "subpixel-antialiased",
    ],
    item: ["flex", "gap-4", "my-4"],
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
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed",
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    isDisabled: false,
  },
});

export type FileUploadVariantProps = VariantProps<typeof fileUpload>;
export type FileUploadSlots = keyof ReturnType<typeof fileUpload>;
export type FileUploadReturnType = ReturnType<typeof fileUpload>;

export {fileUpload};
