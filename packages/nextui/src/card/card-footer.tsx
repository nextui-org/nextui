import React from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import clsx from '../utils/clsx';

interface Props {
  autoMargin?: boolean;
  className?: string;
}

const defaultProps = {
  autoMargin: true,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CardFooterProps = Props & typeof defaultProps & NativeAttrs;

const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = ({
  children,
  className,
  autoMargin,
  ...props
}) => {
  const theme = useTheme();

  return (
    <div
      className={clsx('card-footer', { 'auto-margin': autoMargin }, className)}
      {...props}
    >
      {children}
      <style jsx>{`
        .card-footer {
          padding: ${theme.layout.gapHalf} ${theme.layout.gap};
          display: flex;
          align-items: center;
          overflow: hidden;
          color: inherit;
          background-color: inherit;
          font-size: 0.875rem;
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
          min-height: calc(2.5 * ${theme.layout.gap});
        }
        .auto-margin :global(*) {
          margin-top: 0;
          margin-bottom: 0;
          margin-right: ${theme.layout.gapQuarter};
        }
      `}</style>
    </div>
  );
};

const MemoCardFooter = React.memo(CardFooter);

export default withDefaults(MemoCardFooter, defaultProps);
