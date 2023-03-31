import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {ringClasses} from "../utils";

/**
 * User wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, name, description} = user({...})
 *
 * @example
 * <div className={base())}>
 *   // avatar element @see avatar
 *  <div className={wrapper())}>
 *    <span className={name())}>user name</span>
 *    <span className={description())}>user description</span>
 *  </div>
 * </div>
 */
const user = tv({
  slots: {
    base: "inline-flex items-center justify-center gap-2",
    wrapper: "inline-flex flex-col items-start",
    name: "text-sm text-foreground dark:text-foreground-dark",
    description: "text-xs text-neutral-500",
  },
  variants: {
    isFocusVisible: {
      true: {
        base: [...ringClasses, "rounded-sm"],
      },
    },
  },
});

export type UserVariantProps = VariantProps<typeof user>;
export type UserSlots = keyof ReturnType<typeof user>;

export {user};
