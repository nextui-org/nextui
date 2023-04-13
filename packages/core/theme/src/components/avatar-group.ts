import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * AvatarGroup wrapper **Tailwind Variants** component
 *
 * const classNames = avatarGroup({...})
 *
 * @example
 * <div role="group" className={classNames())}>
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

// calculated classNames
// src/components/avatar/src/use-avatar-group.ts
// -ml-2 hover:-translate-x-0 ml-0
