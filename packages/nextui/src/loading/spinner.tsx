import React from 'react';
import { NormalSizes, SimpleColors } from '../utils/prop-types';
import {
  StyledSpinner,
  StyledSpinnerContainer,
  StyledSpinnerSpan,
  StyledLoadingLabel,
  SpinnerVariantsProps
} from './loading.styles';

interface Props {
  size?: NormalSizes;
  color?: SimpleColors;
  textColor?: SimpleColors;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props | 'css'>;
export type SpinnerProps = Props & NativeAttrs & SpinnerVariantsProps;

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
      className={`nextui-spinner ${className}`}
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

export default Spinner;
