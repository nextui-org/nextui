import {tv, VariantProps} from "tailwind-variants";

/**
 * AvatarGroup wrapper **Tailwind Variants** component
 *
 * const styles = avatarGroup({...})
 *
 * @example
 * <div role="group" className={styles())}>
 *   // avatar elements
 * </div>
 */
const avatarGroup = tv({
  base: "flex items-center justify-center h-auto w-max-content",
  variants: {
    isGrid: {
      true: "inline-grid grid-cols-4 gap-3",
    },
  },
});

export type AvatarGroupVariantProps = VariantProps<typeof avatarGroup>;

export {avatarGroup};

// calculated styles
// src/components/avatar/src/use-avatar-group.ts
// -ml-2 hover:-translate-x-0 ml-0
