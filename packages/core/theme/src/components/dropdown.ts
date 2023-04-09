import {tv} from "tailwind-variants";

/**
 * Dropdown wrapper **Tailwind Variants** component
 *
 * const { base, menu  } = dropdown({...})
 *
 * @example
 * <div>
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={base()}>
 *    // dropdown content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
const dropdown = tv({
  base: [
    "w-full",
    "p-1",
    "min-w-[200px]",
    "shadow",
    "shadow-lg",
    "bg-white",
    "dark:bg-content1",
    "border",
    "border-neutral-100",
  ],
});

export {dropdown};
