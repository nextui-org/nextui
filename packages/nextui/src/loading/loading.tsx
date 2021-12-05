import React, { useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import { NormalSizes, SimpleColors, NormalLoaders } from '../utils/prop-types';
import { CSS } from '../theme/stitches.config';
import {
  StyledLoadingContainer,
  StyledLoading,
  StyledLoadingLabel,
  LoadingContainerVariantsProps
} from './loading.styles';
import Spinner from './spinner';

interface Props {
  size?: NormalSizes;
  color?: SimpleColors;
  gradientBackground?: string | null;
  textColor?: SimpleColors;
  type?: NormalLoaders;
  loadingCss?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  size: 'md' as NormalSizes,
  color: 'primary' as SimpleColors,
  textColor: 'default' as SimpleColors,
  type: 'default' as NormalLoaders
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props | 'css'>;

export type LoadingProps = Props &
  typeof defaultProps &
  NativeAttrs &
  LoadingContainerVariantsProps;

const preClass = 'nextui-loading';

const Loading: React.FC<React.PropsWithChildren<LoadingProps>> = ({
  children,
  size,
  color,
  gradientBackground,
  textColor,
  loadingCss,
  type,
  ...props
}) => {
  const ariaLabel = children ? '' : 'Loading';

  const loadingGradientCSS = useMemo(() => {
    return type === 'gradient' ? { '._2': { bg: gradientBackground } } : {};
  }, [type]);

  if (type === 'spinner') {
    return (
      <Spinner size={size} color={color} {...props}>
        {children}
      </Spinner>
    );
  }

  return (
    <StyledLoadingContainer {...props}>
      <StyledLoading
        className={`${preClass} ${preClass}-${type}`}
        css={{
          ...(loadingCss as any),
          ...loadingGradientCSS
        }}
        color={color}
        type={type}
        size={size}
        aria-label={ariaLabel}
      >
        <i className="_1" />
        <i className="_2" />
        <i className="_3" />
      </StyledLoading>
      {children && (
        <StyledLoadingLabel
          color={textColor}
          size={size}
          className={`${preClass}-label`}
        >
          {children}
        </StyledLoadingLabel>
      )}
    </StyledLoadingContainer>
  );
};

const MemoLoading = React.memo(Loading);

export default withDefaults(MemoLoading, defaultProps);
