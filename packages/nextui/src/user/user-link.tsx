import React from 'react';
import Link from '../link';
import withDefaults from '../utils/with-defaults';
import { __DEV__ } from '../utils/assertion';

interface Props {
  href?: string;
  className?: string;
}

const defaultProps = {
  className: ''
};

type NativeAttrs = Omit<React.AnchorHTMLAttributes<unknown>, keyof Props>;
export type UserLinkProps = Props & typeof defaultProps & NativeAttrs;

const UserLink = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<UserLinkProps>
>(
  (
    { href, className, children, ...props },
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <div className={className} {...props}>
        <Link
          ref={ref}
          href={href}
          color="primary"
          target="_blank"
          rel="noopener"
        >
          {children}
        </Link>
        <style jsx>{`
          div :global(a:hover) {
            opacity: 0.7;
          }
        `}</style>
      </div>
    );
  }
);

if (__DEV__) {
  UserLink.displayName = 'UserLink';
}
const MemoUserLink = React.memo(UserLink);

export default withDefaults(MemoUserLink, defaultProps);
