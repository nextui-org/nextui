import {tv, VariantProps} from "tailwind-variants";

/**
 * ButtonGroup wrapper **Tailwind Variants** component
 *
 * const styles = buttonGroup({...})
 *
 * @example
 * <div role="group" className={styles())}>
 *   // button elements
 * </div>
 */
const buttonGroup = tv({
  base: "inline-flex items-center justify-center h-auto w-max-content",
  variants: {
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;

export {buttonGroup};
