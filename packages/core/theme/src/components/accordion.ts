import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Accordion wrapper **Tailwind Variants** component
 *
 * const classNames = accordion({...})
 *
 * @example
 * <div role="group" className={classNames())}>
 *   // avatar elements
 * </div>
 */
const accordion = tv({
  base: "px-2",
  variants: {
    variant: {
      shadow: "px-4 shadow-lg rounded-xl dark:bg-content1 border border-neutral-100",
      bordered: "px-4 border border-neutral rounded-lg",
      splitted: "group is-splitted flex flex-col gap-2", // the classNames are applied in the accordion-item component
    },
  },
});

export type AccordionGroupVariantProps = VariantProps<typeof accordion>;

export {accordion};
