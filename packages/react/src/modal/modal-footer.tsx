import React, { useMemo, useContext } from 'react';
import withDefaults from '../utils/with-defaults';
import { ModalContext } from './modal-context';
import { Justify } from '../utils/prop-types';
import { CSS } from '../theme/stitches.config';
import { StyledModalFooter, ModalFooterVariantsProps } from './modal.styles';
import cslx from '../utils/clsx';

interface Props {
  className?: string;
  justify?: Justify;
  autoMargin?: boolean;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  className: '',
  justify: 'flex-end' as Justify,
  autoMargin: true
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ModalFooterProps = Props &
  typeof defaultProps &
  NativeAttrs &
  ModalFooterVariantsProps;

const preClass = 'nextui-modal-footer';

const ModalFooter: React.FC<React.PropsWithChildren<ModalFooterProps>> = ({
  children,
  className,
  justify,
  autoMargin: autoMarginProp,
  css,
  ...props
}) => {
  const { autoMargin: autoMarginContext, noPadding } = useContext(ModalContext);

  const autoMargin = useMemo(() => {
    return autoMarginContext !== undefined ? autoMarginContext : autoMarginProp;
  }, [autoMarginProp, autoMarginContext]);

  return (
    <StyledModalFooter
      className={cslx(
        preClass,
        {
          [`${preClass}-auto-margin`]: autoMargin,
          [`${preClass}-no-padding`]: noPadding
        },
        className
      )}
      noPadding={noPadding}
      autoMargin={autoMargin}
      css={{ justifyContent: justify, ...css }}
      {...props}
    >
      {children}
    </StyledModalFooter>
  );
};

ModalFooter.toString = () => '.nextui-modal-footer';

const MemoModalFooter = React.memo(ModalFooter);

export default withDefaults(MemoModalFooter, defaultProps);
