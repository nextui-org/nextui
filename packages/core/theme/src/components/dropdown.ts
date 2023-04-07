import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

// import {colorVariants, ringClasses} from "../utils";
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
    base: [],
    trigger: [],
    section: [],
    sectionHeading: [],
  },
  variants: {},
  defaultVariants: {},
});

export type DropdownVariantProps = VariantProps<typeof dropdown>;
export type DropdownSlots = keyof ReturnType<typeof dropdown>;

export {dropdown};
