import React from 'react';
import Link from '../link';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';
import type { LinkProps } from '../link';

interface Props {
  children?: React.ReactNode;
}

export type UserLinkProps = Props & Omit<LinkProps, 'icon'>;

const UserLink = React.forwardRef<HTMLAnchorElement, UserLinkProps>(
  (props: UserLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
    const {
      rel = 'noopener',
      color = 'primary',
      target = '_blank',
      className,
      children,
      ...otherProps
    } = props;

    return (
      <Link
        ref={ref}
        rel={rel}
        color={color}
        target={target}
        className={clsx('nextui-user-link', className)}
        {...otherProps}
      >
        {children}
      </Link>
    );
  }
);

if (__DEV__) {
  UserLink.displayName = 'NextUI.UserLink';
}

UserLink.toString = () => '.nextui-user-link';

const MemoUserLink = React.memo(UserLink);

export default MemoUserLink;
