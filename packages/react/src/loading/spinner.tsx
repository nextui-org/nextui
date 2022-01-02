import React from 'react';
import { NormalSizes, SimpleColors } from '../utils/prop-types';
import { CSS } from '../theme/stitches.config';
import {
  StyledSpinner,
  StyledSpinnerContainer,
  StyledSpinnerSpan,
  StyledLoadingLabel,
  SpinnerVariantsProps
} from './loading.styles';
import clsx from '../utils/clsx';

interface Props {
  size?: NormalSizes;
  color?: SimpleColors;
  textColor?: SimpleColors;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type SpinnerProps = Props &
  NativeAttrs &
  SpinnerVariantsProps & { css?: CSS };

const Spinner: React.FC<React.PropsWithChildren<SpinnerProps>> = ({
  children,
  size,
  color,
  textColor,
  className,
  ...props
}) => {
  const isValidChildren = Array.isArray(children)
    ? children?.length > 1 && children[0] !== undefined
    : children !== undefined;

  const ariaLabel = children && isValidChildren ? '' : 'Loading';

  return (
    <StyledSpinner
      className={clsx('nextui-spinner', className)}
      color={color}
      size={size}
      {...props}
    >
      <StyledSpinnerContainer
        className="nextui-spinner-container"
        aria-label={ariaLabel}
      >
        {[...new Array(12)].map((_, index) => (
          <StyledSpinnerSpan key={`nextui-spinner-${index}`} />
        ))}
      </StyledSpinnerContainer>
      {children && (
        <StyledLoadingLabel size={size} color={textColor}>
          {children}
        </StyledLoadingLabel>
      )}
    </StyledSpinner>
  );
};

Spinner.toString = () => '.nextui-spinner';

export default Spinner;
