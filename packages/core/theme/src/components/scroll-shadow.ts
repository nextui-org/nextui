import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * ScrollShadow wrapper **Tailwind Variants** component
 *
 * const classNames = scrollShadow({...})
 *
 * @example
 * <div className={classNames)}>
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *   ...
 * </div>
 */
const scrollShadow = tv({
  base: [
    "overflow-y-auto",
    "mask-image:transparent",
    "data-[has-top-scroll=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-_var(--scroll-shadow-height)),transparent)]",
    "data-[has-bottom-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_var(--scroll-shadow-height)),transparent)]",
    "data-[has-both-scroll=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-height),#000_calc(100%_-_var(--scroll-shadow-height)),transparent)]",
  ],
  variants: {},
});

export type ScrollShadowVariantProps = VariantProps<typeof scrollShadow>;

export {scrollShadow};
