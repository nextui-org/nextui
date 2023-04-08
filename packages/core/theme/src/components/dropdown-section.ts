import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Dropdown wrapper **Tailwind Variants** component
 *
 * const { section, heading } = dropdownSection({...})
 *
 * @example
 * <div>
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={section()}>
 *    // dropdown content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
const dropdownSection = tv({
  slots: {
    section: "relative mb-2",
    heading: "pl-1 text-xs text-neutral-500",
  },
  variants: {
    showDivider: {
      true: {
        heading: [
          "mt-2",
          "before-content-['']",
          "before:absolute",
          "before:-top-1",
          "before:left-0",
          "before:right-0",
          "before:h-px",
          "before:bg-neutral-200",
        ],
      },
    },
  },
});

export type DropdownSectionVariantProps = VariantProps<typeof dropdownSection>;
export type DropdownSectionSlots = keyof ReturnType<typeof dropdownSection>;

export {dropdownSection};
