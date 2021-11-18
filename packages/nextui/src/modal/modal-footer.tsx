import React, { useMemo, useContext } from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import { ModalContext } from './modal-context';
import { Justify } from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import cslx from '../utils/clsx';

interface Props extends DefaultProps {
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

const preClass = 'nextui-modal-footer';

const ModalFooter: React.FC<React.PropsWithChildren<ModalFooterProps>> = ({
  children,
  className,
  justify,
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
      <style jsx>{`
        .${preClass} {
          display: flex;
          flex-wrap: wrap;
          flex-shrink: 0;
          overflow: hidden;
          color: inherit;
          align-items: center;
          font-size: 0.875rem;
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          justify-content: ${justify};
          ${stringCss};
        }
        .${preClass}-no-padding {
          ${!stringCss?.includes('padding') ? 'padding: 0;' : ''};
        }
        .${preClass}-auto-margin > :global(*) {
          ${!stringCss?.includes('margin') ? 'margin: 0.25rem;' : ''};
        }
      `}</style>
    </div>
  );
};

const MemoModalFooter = React.memo(ModalFooter);

export default withDefaults(MemoModalFooter, defaultProps);
