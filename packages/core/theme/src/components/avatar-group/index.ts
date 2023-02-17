import {tv} from "tailwind-variants";

/**
 * AvatarGroup wrapper tv component
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
});

export {avatarGroup};
