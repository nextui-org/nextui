import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Dropdown wrapper **Tailwind Variants** component
 *
 * const { base, trigger, arrow } = dropdown({...})
 *
 * @example
 * <div>
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={base()}>
 *    // dropdown content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
const dropdown = tv({
  slots: {
    base: [
      "w-full",
      "p-1",
      "min-w-[200px]",
      "shadow",
      "shadow-lg",
      "bg-white",
      "dark:bg-content1",
      "border",
      "border-neutral-100",
    ],
    menu: "w-full flex flex-col p-1",
    trigger: [],
  },
  variants: {
    disableAnimation: {
      true: "transition-none",
    },
  },

  defaultVariants: {
    disableAnimation: false,
  },
});

export type DropdownVariantProps = VariantProps<typeof dropdown>;
export type DropdownSlots = keyof ReturnType<typeof dropdown>;

export {dropdown};
