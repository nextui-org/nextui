import {tv, VariantProps} from "tailwind-variants";

/**
 * Accordion wrapper **Tailwind Variants** component
 *
 * const styles = accordion({...})
 *
 * @example
 * <div role="group" className={styles())}>
 *   // avatar elements
 * </div>
 */
const accordion = tv({
  base: "px-2",
  variants: {},
});

export type AccordionGroupVariantProps = VariantProps<typeof accordion>;

export {accordion};
