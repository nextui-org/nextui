import User from './user';
import UserLink from './user-link';

User.Link = UserLink;

export type { UserProps } from './user';
export type { UserLinkProps } from './user-link';

export {
  StyledUser,
  StyledUserInfo,
  StyledUserName,
  StyledUserSocial,
  StyledUserLink
} from './user.styles';
export type {
  UserVariantsProps,
  UserInfoVariantsProps,
  UserNameVariantsProps,
  UserSocialVariantsProps,
  UserLinkVariantsProps
} from './user.styles';

export default User;
