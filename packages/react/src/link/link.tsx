import React from 'react';
import withDefaults from '../utils/with-defaults';
import LinkIcon from './icon';
import { CSS } from '../theme/stitches.config';
import StyledLink, { LinkVariantsProps } from './link.styles';
import { __DEV__ } from '../utils/assertion';

export interface Props {
  icon?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  icon: false
};

type NativeAttrs = Omit<React.AnchorHTMLAttributes<unknown>, keyof Props>;

export type LinkProps = Props &
  typeof defaultProps &
  NativeAttrs &
  LinkVariantsProps & { css?: CSS };

const Link = React.forwardRef<React.ElementRef<typeof StyledLink>, LinkProps>(
  ({ children, icon, ...props }, forwardedRef) => (
    <StyledLink {...props} ref={forwardedRef}>
      {children}
      {icon && <LinkIcon />}
    </StyledLink>
  )
);

if (__DEV__) {
  Link.displayName = 'NextUI - Link';
}

Link.toString = () => '.nextui-link';

export default withDefaults(Link, defaultProps);
