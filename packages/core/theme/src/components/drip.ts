import {tv, type VariantProps} from "tailwind-variants";

import {absoluteFullClasses} from "../utils";

/**
 * Drip wrapper **Tailwind Variants** component
 *
 * const {base, svg} = drip({...})
 *
 * @example
 * <div className={base())}>
 *   <svg className={svg()}>
 *    // drip svg content
 *  </svg>
 * </div>
 */
const drip = tv({
  slots: {
    base: [...absoluteFullClasses, "overflow-hidden"],
    svg: "absolute animate-drip-expand",
  },
});

export type DripVariantProps = VariantProps<typeof drip>;
export type DripSlots = keyof ReturnType<typeof drip>;

export {drip};
