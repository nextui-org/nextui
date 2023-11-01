// Listbox is based on menu component

////////

/**
 * Listbox wrapper **Tailwind Variants** component
 *
 * const classNames = listbox({...})
 */
export {menu as listbox} from "./menu";

/**
 * ListboxItem wrapper **Tailwind Variants** component
 *
 * const {base, heading, indicator, trigger, leftIndicator, title, subtitle, content } = listboxItem({...})
 *
 * @example
 * <div className={base())} data-focus-visible={boolean} data-hover={boolean}>
 *   <div className={heading())}>
 *    <button className={trigger())}>
 *      <div className={leftIndicator()}>
 *         // content
 *      </div>
 *      <div className={titleWrapper()}>
 *        <h3 className={title())}>Title</h3>
 *        <span className={subtitle())}>Subtitle</span>
 *      </div>
 *      <span className={indicator())}>Indicator</span>
 *    </button>
 *  </div>
 *  <div className={content())}>Content</div>
 * </div>
 */
export {menuItem as listboxItem} from "./menu";

/**
 * Listbox section wrapper **Tailwind Variants** component
 *
 * const { base, section, heading } = listboxSection({...})
 *
 * @example
 * <div className={base()}>
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={section()}>
 *    // menu content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
export {menuSection as listboxSection} from "./menu";

// export types
export type {
  MenuSectionVariantProps as ListboxSectionVariantProps,
  MenuSlots as ListboxSlots,
  MenuSectionSlots as ListboxSectionSlots,
  MenuItemVariantProps as ListboxItemVariantProps,
  MenuItemSlots as ListboxItemSlots,
  MenuVariantProps as ListboxVariantProps,
} from "./menu";
