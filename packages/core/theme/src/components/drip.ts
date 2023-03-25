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
  base: ["absolute", "will-change-transform", "bg-current", "rounded-full", "animate-drip-expand"],
});

export {drip};
