import User from './user';
import UserLink from './user-link';

User.Link = UserLink;

export type { UserProps } from './user';
export type { UserLinkProps } from './user-link';

export {
  StyledUser,
  StyledUserInfo,
  StyledUserName,
  StyledUserDesc,
  StyledUserLink
} from './user.styles';

export default User;
