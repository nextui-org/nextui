import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const verticalShadow = [
  "data-[top-scroll=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
  "data-[bottom-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
  "data-[top-bottom-scroll=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
];

const horizontalShadow = [
  "data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
  "data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
  "data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
];

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
  base: [],
  variants: {
    orientation: {
      vertical: ["overflow-y-auto", ...verticalShadow],
      horizontal: ["overflow-x-auto", ...horizontalShadow],
    },
    hideScrollBar: {
      true: "scrollbar-hide",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    hideScrollBar: false,
  },
});

export type ScrollShadowVariantProps = VariantProps<typeof scrollShadow>;

export {scrollShadow};
