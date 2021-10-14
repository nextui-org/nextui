import React, { useMemo, useContext } from 'react';
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
  justify: 'flex-end' as Justify,
  autoMargin: true
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ModalFooterProps = Props & typeof defaultProps & NativeAttrs;

const ModalFooter: React.FC<React.PropsWithChildren<ModalFooterProps>> = ({
  children,
  className,
  justify,
  autoMargin: autoMarginProp,
  ...props
}) => {
  const theme = useTheme();
  const { autoMargin: autoMarginContext, noPadding } = useContext(ModalContext);
  const autoMargin = useMemo(() => {
    return autoMarginContext !== undefined ? autoMarginContext : autoMarginProp;
  }, [autoMarginProp, autoMarginContext]);
  return (
    <div
      className={cslx(
        'modal-footer',
        { 'auto-margin': autoMargin, 'no-padding': noPadding },
        className
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        .modal-footer {
          display: flex;
          flex-wrap: wrap;
          flex-shrink: 0;
          overflow: hidden;
          color: inherit;
          align-items: center;
          font-size: 0.875rem;
          padding: ${theme.layout.gapHalf} ${theme.layout.gap};
          justify-content: ${justify};
        }
        .no-padding {
          padding: 0;
        }
        .auto-margin > :global(*) {
          margin: 0.25rem;
        }
      `}</style>
    </div>
  );
};

const MemoModalFooter = React.memo(ModalFooter);

export default withDefaults(MemoModalFooter, defaultProps);
