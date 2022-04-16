import React from 'react';
import Link from '../link';
import { StyledUserLink } from './user.styles';
import { CSS } from '../theme/stitches.config';
import { __DEV__ } from '../utils/assertion';

interface Props {
  href?: string;
}
type NativeAttrs = Omit<React.AnchorHTMLAttributes<unknown>, keyof Props>;
export type UserLinkProps = Props & NativeAttrs & { css?: CSS };

const UserLink = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<UserLinkProps>
>(
  (
    { href, className, children, ...props },
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <StyledUserLink {...props}>
        <Link
          ref={ref}
          href={href}
          color="primary"
          target="_blank"
          rel="noopener"
        >
          {children}
        </Link>
      </StyledUserLink>
    );
  }
);

if (__DEV__) {
  UserLink.displayName = 'NextUI.UserLink';
}

UserLink.toString = () => '.nextui-user-link';

const MemoUserLink = React.memo(UserLink);

export default MemoUserLink;
