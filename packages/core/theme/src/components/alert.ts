import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
/**
 * Input wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, mainWrapper, title, description} = input({...})
 *
 * <div className={base())}>
 *     // start content comes here if present
 *      <div classsName ={mainWrapper()}>
 *        <div className={title()}>Title</div>
 *        <div className={description()}>Description</div>
 *     </div>
 *    // end content comes here if present
 *    // close button
 * </div>
 * ```
 */
const alert = tv({
  slots: {
    base: ["w-6 group flex flex-row items-start data-[hidden=true]:hidden px-4 py-3"],
    title: ["text-medium  font-medium text-foreground-100 block"],
    description: ["text-small text-foreground-100 block"],
    mainWrapper: ["w-full px-3 flex flex-col h-full box-border items-start justify-center"],
    closeButton: [],
  },
  variants: {
    color: {
      default: {
        base: ["bg-default-200", "border-default-200"],
        title: ["text-white"],
        description: ["text-white"],
      },
      primary: {
        base: ["bg-primary-100", "border-primary-200"],
      },
      secondary: {
        base: ["bg-secondary-100", "border-secondary-200"],
      },
      success: {
        base: ["bg-success-100", "border-success-200"],
      },
      warning: {
        base: ["bg-warning-100", "border-warning-200"],
      },
      danger: {
        base: ["bg-danger-100", "border-danger-200"],
      },
    },
    radius: {
      none: {
        base: "rounded-none",
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
      full: {
        base: "rounded-full",
      },
    },
  },
  defaultVariants: {
    color: "default",
    size: "lg",
  },
});

export type AlertVariantProps = VariantProps<typeof alert>;
export type AlertSlots = keyof ReturnType<typeof alert>;

export {alert};
