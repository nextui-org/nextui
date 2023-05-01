import {tv} from "tailwind-variants";

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
    base: [
      "inline-flex items-center justify-center gap-2 rounded-sm outline-none",
      // focus ring
      "data-[focus-visible=true]:outline-none",
      "data-[focus-visible=true]:ring-2",
      "data-[focus-visible=true]:ring-primary",
      "data-[focus-visible=true]:ring-offset-2",
      "data-[focus-visible=true]:ring-offset-background",
      "data-[focus-visible=true]:dark:ring-offset-background-dark",
    ],
    wrapper: "inline-flex flex-col items-start",
    name: "text-sm text-inherit",
    description: "text-xs text-neutral-400",
  },
});

export type UserSlots = keyof ReturnType<typeof user>;

export {user};
