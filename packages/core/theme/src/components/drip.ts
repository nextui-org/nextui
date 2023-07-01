import {tv} from "../utils/tv";

/**
 * Drip wrapper **Tailwind Variants** component
 *
 * const classNames = drip({...})
 *
 * @example
 * <span ref={dripRef} className={classNames())} />
 */
const drip = tv({
  base: ["absolute", "will-change-transform", "bg-current", "rounded-full", "animate-drip-expand"],
});

export {drip};
