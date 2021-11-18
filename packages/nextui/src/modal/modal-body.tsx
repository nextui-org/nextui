import React, { useContext, useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import { ModalContext } from './modal-context';
import useTheme from '../use-theme';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import cslx from '../utils/clsx';

interface Props extends DefaultProps {
  className?: string;
  autoMargin?: boolean;
}

const defaultProps = {
  className: '',
  autoMargin: true
};

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof Props>;
export type ModalContentProps = Props & typeof defaultProps & NativeAttrs;

const preClass = 'nextui-modal-body';

const ModalContent: React.FC<ModalContentProps> = ({
  className,
  children,
  autoMargin: autoMarginProp,
  ...props
}) => {
  const theme = useTheme();

  const { stringCss } = getSpacingsStyles(theme, props);

  const { autoMargin: autoMarginContext, noPadding } = useContext(ModalContext);
  const autoMargin = useMemo(() => {
    return autoMarginContext !== undefined ? autoMarginContext : autoMarginProp;
  }, [autoMarginProp, autoMarginContext]);

  return (
    <>
      <div
        className={cslx(
          preClass,
          {
            [`${preClass}-auto-margin`]: autoMargin,
            [`${preClass}-no-padding`]: noPadding
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
      <style jsx>{`
        .${preClass} {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          padding: ${theme.spacing.sm} calc(${theme.spacing.lg} + 0.25rem);
          overflow-y: auto;
          position: relative;
          text-align: left;
          ${stringCss};
        }
        .${preClass}-no-padding {
          flex: 1;
          ${!stringCss?.includes('padding') ? 'padding: 0;' : ''};
        }
        .${preClass}-auto-margin > :global(*:first-child) {
          ${!stringCss?.includes('margin') ? 'margin-top: 0;' : ''};
        }
        .${preClass}-auto-margin > :global(*) {
          ${!stringCss?.includes('margin') ? 'margin-bottom: 1rem;' : ''};
        }
        .${preClass}-auto-margin > :global(*:last-child) {
          ${!stringCss?.includes('margin') ? 'margin-bottom: 0;' : ''};
        }
      `}</style>
    </>
  );
};

const MemoModalContent = React.memo(ModalContent);

export default withDefaults(MemoModalContent, defaultProps);
