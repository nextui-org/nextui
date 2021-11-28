import React from 'react';
import withDefaults from '../utils/with-defaults';
import LinkIcon from './icon';
import StyledLink, { LinkVariantsProps } from './link.styles';
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

export type LinkProps = Props & NativeAttrs & LinkVariantsProps;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, icon, ...props }, ref: React.Ref<HTMLAnchorElement>) => {
    return (
      <StyledLink ref={ref} {...props}>
        {children}
        {icon && <LinkIcon />}
      </StyledLink>
    );
  }
);

if (__DEV__) {
  Link.displayName = 'NextUI - Link';
}
const MemoLink = React.memo(Link);

export default withDefaults(MemoLink, defaultProps);
