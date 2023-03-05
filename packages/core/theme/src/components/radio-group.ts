import {tv} from "tailwind-variants";

/**
 * RadioGroup wrapper **Tailwind Variants** component
 *
 * const {base, label, wrapper} = radioGroup({...})
 *
 * @example
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={wrapper()} data-orientation="vertical/horizontal">
 *     // radios
 *  </div>
 * </div>
 */
const radioGroup = tv({
  slots: {
    base: "relative flex flex-col gap-2",
    label: "relative text-neutral-500",
    wrapper: "flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row ",
  },
});

export type RadioGroupSlots = keyof ReturnType<typeof radioGroup>;

export {radioGroup};
