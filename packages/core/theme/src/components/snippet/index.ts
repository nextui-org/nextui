import {tv, type VariantProps} from "tailwind-variants";

/**
 * Snippet wrapper **Tailwind Variants** component
 *
 * const {base, svg} = snippet({...})
 *
 * @example
 * <div className={base())}>
 *   <svg className={svg()}>
 *    // drip svg content
 *  </svg>
 * </div>
 */
const snippet = tv({
  slots: {
    base: "",
    svg: "",
  },
});

export type SnippetVariantProps = VariantProps<typeof snippet>;
export type SnippetSlots = keyof ReturnType<typeof snippet>;

export {snippet};
