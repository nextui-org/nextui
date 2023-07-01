import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * Spacer wrapper **Tailwind Variants** component
 *
 * @example
 *
 * const styles = spacer()
 *
 * <span className={styles} />
 */
const spacer = tv({
  base: "w-px h-px inline-block",
  variants: {
    isInline: {
      true: "inline-block",
      false: "block",
    },
  },
  defaultVariants: {
    isInline: false,
  },
});

export type SpacerVariantProps = VariantProps<typeof spacer>;

export {spacer};
