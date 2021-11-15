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
  autoMargin: false,
  justify: 'flex-start' as Justify,
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
        'nextui-card-header',
        {
          'nextui-card-header-auto-margin': autoMargin,
          'nextui-card-header-no-padding': noPadding
        },
        className
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        .nextui-card-header {
          width: 100%;
          display: flex;
          flex-shrink: 0;
          z-index: 1;
          justify-content: ${justify};
          align-items: center;
          overflow: hidden;
          color: inherit;
          font-size: 0.875rem;
          padding: ${theme.spacing.sm};
        }
        .nextui-card-header-no-padding {
          padding: 0;
        }
        .nextui-card-header-auto-margin > :global(*:first-child) {
          margin-top: 0;
        }
        .nextui-card-header-auto-margin > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

const MemoCardHeader = React.memo(CardHeader);

export default withDefaults(MemoCardHeader, defaultProps);
