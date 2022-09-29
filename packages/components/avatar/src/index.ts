import Avatar from "./avatar";
import AvatarGroup from "./avatar-group";

// export styled components
export * from "./avatar.styles";
export * from "./avatar-group.styles";

// export types
export type {AvatarProps} from "./avatar";
export type {AvatarGroupProps} from "./avatar-group";

Avatar.Group = AvatarGroup;

// export component
export {Avatar, AvatarGroup};
