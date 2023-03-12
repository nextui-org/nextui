import {tv, type VariantProps} from "tailwind-variants";

/**
 * Toggle (Switch) wrapper **Tailwind Variants** component
 *
 * const {base, content, dot, avatar, closeButton} = toggle({...})
 *
 * @example
 * <div className={base())}>
 *    // left content
 *   <span className={avatar()}/>
 *   <svg className={dot()}/>
 *   <span className={content()}>Default</span>
 *   <svg className={closeButton()}>close button</svg>
 *    // right content
 * </div>
 */
const toggle = tv({
  variants: {},
});

export type ToggleVariantProps = VariantProps<typeof toggle>;
export type ToggleSlots = keyof ReturnType<typeof toggle>;

export {toggle};
