import {tv} from "tailwind-variants";

/**
 * CheckboxGroup wrapper **Tailwind Variants** component
 *
 * const {base, label, wrapper,} = checkboxGroup({...})
 *
 * @example
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={wrapper()} data-orientation="vertical/horizontal">
 *     // checkboxes
 *  </div>
 * </div>
 */
const checkboxGroup = tv({
  slots: {
    base: "relative flex flex-col gap-2",
    label: "relative text-neutral-500",
    wrapper: "flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row ",
  },
});

export type CheckboxGroupSlots = keyof ReturnType<typeof checkboxGroup>;

export {checkboxGroup};
