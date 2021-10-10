import React, { useContext, useMemo } from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import { ModalContext } from './modal-context';
import { Justify } from '../utils/prop-types';
import cslx from '../utils/clsx';

interface Props {
  className?: string;
  justify?: Justify;
  autoMargin?: boolean;
}

const defaultProps = {
  className: '',
  justify: 'center' as Justify,
  autoMargin: true
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ModalHeaderProps = Props & typeof defaultProps & NativeAttrs;

const ModalHeader: React.FC<React.PropsWithChildren<ModalHeaderProps>> = ({
  children,
  className,
  justify,
  autoMargin: autoMarginProp,
  ...props
}) => {
  const theme = useTheme();
  const { autoMargin: autoMarginContext } = useContext(ModalContext);
  const autoMargin = useMemo(() => {
    return autoMarginContext !== undefined ? autoMarginContext : autoMarginProp;
  }, [autoMarginProp, autoMarginContext]);
  return (
    <div
      className={cslx('modal-header', { 'auto-margin': autoMargin }, className)}
      {...props}
    >
      {children}
      <style jsx>{`
        .modal-header {
          display: flex;
          flex-shrink: 0;
          justify-content: ${justify};
          align-items: center;
          overflow: hidden;
          color: inherit;
          background-color: inherit;
          font-size: 0.875rem;
          padding: ${theme.layout.gapHalf} calc(${theme.layout.gap} + 0.25rem);
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
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

const MemoModalHeader = React.memo(ModalHeader);

export default withDefaults(MemoModalHeader, defaultProps);
