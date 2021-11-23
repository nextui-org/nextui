import React from 'react';
import withDefaults from '../utils/with-defaults';
import LinkIcon from './icon';
import type * as Stitches from '@stitches/react';
import clsx from '../utils/clsx';
import StyledLink from './link.styles';
import { __DEV__ } from '../utils/assertion';

export interface Props {
  icon?: boolean;
}

const defaultProps = {
  icon: false
};

type NativeAttrs = Omit<
  React.AnchorHTMLAttributes<unknown>,
  keyof Props | 'css'
>;

type LinkProps = Props & NativeAttrs & Stitches.VariantProps<typeof StyledLink>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { children, className, icon, ...props },
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <StyledLink
        ref={ref}
        className={clsx('nextui-link', className)}
        {...props}
      >
        {children}
        {icon && <LinkIcon />}
      </StyledLink>
    );
  }
);

if (__DEV__) {
  Link.displayName = 'Link';
}
const MemoLink = React.memo(Link);

export default withDefaults(MemoLink, defaultProps);
