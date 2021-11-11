import React, { useContext, useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import { ModalContext } from './modal-context';
import useTheme from '../use-theme';
import cslx from '../utils/clsx';

interface Props {
  className?: string;
  autoMargin?: boolean;
}

const defaultProps = {
  className: '',
  autoMargin: true
};

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof Props>;
export type ModalContentProps = Props & typeof defaultProps & NativeAttrs;

const ModalContent: React.FC<ModalContentProps> = ({
  className,
  children,
  autoMargin: autoMarginProp,
  ...props
}) => {
  const theme = useTheme();
  const { autoMargin: autoMarginContext, noPadding } = useContext(ModalContext);
  const autoMargin = useMemo(() => {
    return autoMarginContext !== undefined ? autoMarginContext : autoMarginProp;
  }, [autoMarginProp, autoMarginContext]);

  return (
    <>
      <div
        className={cslx(
          'modal-body',
          { 'auto-margin': autoMargin, 'no-padding': noPadding },
          className
        )}
        {...props}
      >
        {children}
      </div>
      <style jsx>{`
        .modal-body {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          padding: ${theme.layout.gapHalf} calc(${theme.layout.gap} + 0.25rem);
          overflow-y: auto;
          position: relative;
          text-align: left;
        }
        .no-padding {
          flex: 1;
          padding: 0;
        }
        .auto-margin > :global(*:first-child) {
          margin-top: 0;
        }
        .auto-margin > :global(*) {
          margin-bottom: 1rem;
        }
        .auto-margin > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
};

const MemoModalContent = React.memo(ModalContent);

export default withDefaults(MemoModalContent, defaultProps);
