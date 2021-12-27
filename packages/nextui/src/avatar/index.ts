import Avatar from './avatar';
import AvatarGroup from './avatar-group';

export type { AvatarProps } from './avatar';
export type { AvatarGroupProps } from './avatar-group';

export { StyledAvatar } from './avatar.styles';
export { StyledAvatarGroup } from './avatar-group.styles';
export { StyledAvatarGroupCount } from './avatar-group.styles';

Avatar.Group = AvatarGroup;

export default Avatar;
