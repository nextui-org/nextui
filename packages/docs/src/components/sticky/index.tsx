import * as React from 'react';
import cn from 'classnames';
import withDefaults from '@utils/with-defaults';
import { NextUIThemes, useTheme } from '@nextui-org/react';

export interface StickyProps {
  offset?: number;
  shadow?: boolean;
  className?: string;
}

const defaultProps = {
  offset: 0,
  shadow: false,
  className: ''
};

const Sticky: React.FC<React.PropsWithChildren<StickyProps>> = ({
  offset,
  children,
  shadow,
  className
}) => {
  const theme = useTheme() as NextUIThemes;
  return (
    <div style={{ top: offset || 0 }} className={cn(className, { shadow })}>
      {children}
      <style jsx>{`
        div {
          background: 'transparent';
          position: sticky;
          z-index: 1000;
        }
        div.shadow {
          box-shadow: ${theme.shadows.sm};
        }
      `}</style>
    </div>
  );
};

const MemoSticky = React.memo(Sticky);

export default withDefaults(MemoSticky, defaultProps);
