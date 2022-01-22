import * as React from 'react';
import cn from 'classnames';
import withDefaults from '@utils/with-defaults';
import { styled, CSS } from '@nextui-org/react';

export interface StickyProps {
  offset?: number;
  shadow?: boolean;
  className?: string;
  css?: CSS;
}

const defaultProps = {
  offset: 0,
  shadow: false,
  className: ''
};

const StyledSticky = styled('div', {
  background: 'transparent',
  position: 'sticky',
  zIndex: '$max',
  variants: {
    shadow: {
      true: {
        bs: '$sm'
      }
    }
  }
});

const Sticky: React.FC<React.PropsWithChildren<StickyProps>> = ({
  offset,
  children,
  shadow,
  className,
  css
}) => {
  return (
    <StyledSticky
      css={{ ...(css as any), top: offset || 0 }}
      className={cn(className, { shadow })}
      shadow={shadow}
    >
      {children}
    </StyledSticky>
  );
};

const MemoSticky = React.memo(Sticky);

export default withDefaults(MemoSticky, defaultProps);
