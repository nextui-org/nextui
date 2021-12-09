import React, { useContext, useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import { ModalContext } from './modal-context';
import { StyledModalBody, ModalBodyVariantsProps } from './modal.styles';
import cslx from '../utils/clsx';

interface Props {
  className?: string;
  autoMargin?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  className: '',
  autoMargin: true
};

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof Props | 'css'>;

export type ModalBodyProps = Props &
  typeof defaultProps &
  NativeAttrs &
  ModalBodyVariantsProps;

const preClass = 'nextui-modal-body';

const ModalBody: React.FC<ModalBodyProps> = ({
  className,
  children,
  autoMargin: autoMarginProp,
  ...props
}) => {
  const { autoMargin: autoMarginContext, noPadding } = useContext(ModalContext);

  const autoMargin = useMemo(() => {
    return autoMarginContext !== undefined ? autoMarginContext : autoMarginProp;
  }, [autoMarginProp, autoMarginContext]);

  return (
    <StyledModalBody
      className={cslx(
        preClass,
        {
          [`${preClass}-auto-margin`]: autoMargin,
          [`${preClass}-no-padding`]: noPadding
        },
        className
      )}
      autoMargin={autoMargin}
      noPadding={noPadding}
      {...props}
    >
      {children}
    </StyledModalBody>
  );
};

const MemoModalBody = React.memo(ModalBody);

export default withDefaults(MemoModalBody, defaultProps);
