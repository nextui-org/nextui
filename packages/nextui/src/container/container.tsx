import React, { useMemo } from 'react';
import { CSS } from '../theme/stitches.config';
import {
  Wrap,
  Display,
  Justify,
  Direction,
  AlignItems,
  AlignContent
} from '../utils/prop-types';
import StyledContainer, { ContainerVariantsProps } from './container.styles';

interface Props {
  gap?: number;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  wrap?: Wrap;
  display?: Display;
  justify?: Justify;
  direction?: Direction;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  css?: CSS;
}

const defaultProps = {
  gap: 2,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  wrap: 'wrap' as Wrap,
  as: 'div' as keyof JSX.IntrinsicElements,
  display: 'block' as Display
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ContainerProps = Props &
  typeof defaultProps &
  NativeAttrs &
  ContainerVariantsProps;

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  wrap,
  gap,
  as,
  display,
  justify,
  direction,
  alignItems,
  alignContent,
  children,
  className,
  css,
  ...props
}) => {
  const gapUnit = useMemo(() => {
    return `calc(${gap} * $space$sm)`;
  }, [gap]);

  const getMaxWidth = () => {
    if (xs) return '$breakpoints$xs';
    if (sm) return '$breakpoints$sm';
    if (md) return '$breakpoints$md';
    if (lg) return '$breakpoints$lg';
    if (xl) return '$breakpoints$xl';
    return '';
  };

  return (
    <StyledContainer
      css={{
        ...(css as any),
        px: gapUnit,
        maxWidth: getMaxWidth(),
        alignItems,
        alignContent,
        flexWrap: wrap,
        display: display,
        justifyContent: justify,
        flexDirection: direction
      }}
      {...props}
    >
      {children}
    </StyledContainer>
  );
};

type MemoContainerComponent<P = {}> = React.NamedExoticComponent<P>;

Container.defaultProps = defaultProps;

export default React.memo(Container) as MemoContainerComponent<ContainerProps>;
