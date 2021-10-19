import React from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import { Justify } from '../utils/prop-types';
import clsx from '../utils/clsx';

interface Props {
  autoMargin?: boolean;
  className?: string;
  justify?: Justify;
  noPadding?: boolean;
}

const defaultProps = {
  autoMargin: true,
  justify: 'center' as Justify,
  noPadding: false,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CardHeaderProps = Props & typeof defaultProps & NativeAttrs;

const CardHeader: React.FC<React.PropsWithChildren<CardHeaderProps>> = ({
  children,
  className,
  autoMargin,
  justify,
  noPadding,
  ...props
}) => {
  const theme = useTheme();

  return (
    <div
      className={clsx(
        'card-header',
        { 'auto-margin': autoMargin, 'no-padding': noPadding },
        className
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        .card-header {
          display: flex;
          flex-shrink: 0;
          justify-content: ${justify};
          align-items: center;
          overflow: hidden;
          color: inherit;
          font-size: 0.875rem;
          padding: ${theme.layout.gapHalf}
            calc(${theme.layout.gapHalf} + 0.25rem);
        }
        .no-padding {
          padding: 0;
        }
        .auto-margin > :global(*:first-child) {
          margin-top: 0;
        }
        .auto-margin > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

const MemoCardHeader = React.memo(CardHeader);

export default withDefaults(MemoCardHeader, defaultProps);
