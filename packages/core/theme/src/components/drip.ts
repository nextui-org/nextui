import {tv} from "tailwind-variants";

/**
 * Drip wrapper **Tailwind Variants** component
 *
 * const styles = drip({...})
 *
 * @example
 * <span ref={dripRef} className={styles())} data-drip="true/false" />
 */
const drip = tv({
  base: [
    "hidden",
    "absolute",
    "bg-current",
    "rounded-full",
    "pointer-events-none",
    'data-[drip="true"]:block',
    'data-[drip="true"]:animate-drip-expand',
  ],
});

export {drip};
