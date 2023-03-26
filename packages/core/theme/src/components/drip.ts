import {tv} from "tailwind-variants";

/**
 * Drip wrapper **Tailwind Variants** component
 *
 * const styles = drip({...})
 *
 * @example
 * <span ref={dripRef} className={styles())} />
 */
const drip = tv({
  base: [
    "hidden",
    "absolute",
    "opacity-0",
    "will-change-transform",
    "bg-current",
    "rounded-full",
    "animate-drip-expand",
    "data-[visible='true']:block",
    "data-[visible='true']:opacity-20",
  ],
});

export {drip};
