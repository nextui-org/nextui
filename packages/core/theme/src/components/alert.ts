import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
/**
 * Input wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, helperWrapper, innerWrapper, title, description} = input({...})
 *
 * <div className={base())}>
 *    <div className={innerWrapper()}>
 *     // start content comes here if present
 *      <div classsName ={helperWrapper()}>
 *        <div className={title()}>Title</div>
 *        <div className={description()}>Description</div>
 *      </div>
 *     // end content comes here if present
 *    </div>
 *   // close button
 * </div>
 * ```
 */
const alert = tv({
  slots: {
    base: ["group flex flex-row items-start data-[hidden=true]:hidden"],
    title: ["text-medium font-medium text-foreground-600 block"],
    helperWrapper: ["relative w-full inline-flex flex-col h-full items-center box-border"],
    description: ["text-small text-foreground-400 block"],
    innerWrapper: ["w-full flex h-full items-center box-border"],
  },
  variants: {
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
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
});

export type AlertVariantProps = VariantProps<typeof alert>;
export type AlertSlots = keyof ReturnType<typeof alert>;

export {alert};
