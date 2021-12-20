import React, { useMemo } from 'react';
import {
  BreakpointsValue,
  Justify,
  Direction,
  AlignItems,
  AlignContent
} from '../utils/prop-types';
import { CSS } from '../theme/stitches.config';
import { StyledGridItem, GridItemVariantProps } from './grid.styles';
import clsx from '../utils/clsx';
import withDefaults from '../utils/with-defaults';

interface Props {
  xs?: BreakpointsValue;
  sm?: BreakpointsValue;
  md?: BreakpointsValue;
  lg?: BreakpointsValue;
  xl?: BreakpointsValue;
  justify?: Justify;
  direction?: Direction;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const defaultProps = {
  xs: false as BreakpointsValue,
  sm: false as BreakpointsValue,
  md: false as BreakpointsValue,
  lg: false as BreakpointsValue,
  xl: false as BreakpointsValue,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type GridItemProps = Props &
  Partial<typeof defaultProps> &
  NativeAttrs &
  GridItemVariantProps;

const getItemLayout = (val?: BreakpointsValue): React.CSSProperties => {
  const display = val === 0 ? 'none' : 'inherit';
  if (typeof val === 'number') {
    const width = (100 / 12) * val;
    const ratio = width > 100 ? '100%' : width < 0 ? '0' : `${width}%`;
    return {
      flexGrow: 0,
      display,
      maxWidth: ratio,
      flexBasis: ratio
    };
  }
  return {
    flexGrow: 1,
    display,
    maxWidth: '100%',
    flexBasis: '0'
  };
};

const GridItem: React.FC<React.PropsWithChildren<GridItemProps>> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  css,
  justify,
  direction,
  alignItems,
  alignContent,
  children,
  className,
  ...props
}) => {
  const classes = useMemo(() => {
    const breaks: { [key: string]: unknown } = {
      xs,
      sm,
      md,
      lg,
      xl
    };
    const classString = Object.keys(breaks).reduce((pre, name) => {
      if (breaks[name] !== undefined && breaks[name] !== false)
        return `${pre} ${name}`;
      return pre;
    }, '');
    return classString.trim();
  }, [xs, sm, md, lg, xl]);

  return (
    <StyledGridItem
      className={clsx('nextui-grid-item', classes, className)}
      css={{
        alignItems,
        alignContent,
        justifyContent: justify,
        flexDirection: direction,
        '&.xs': {
          ...getItemLayout(xs)
        },
        '@xsMax': {
          '&.xs': {
            ...getItemLayout(xs)
          }
        },
        '@sm': {
          '&.sm': {
            ...getItemLayout(sm)
          }
        },
        '@md': {
          '&.md': {
            ...getItemLayout(md)
          }
        },
        '@lg': {
          '&.lg': {
            ...getItemLayout(lg)
          }
        },
        '@xl': {
          '&.xl': {
            ...getItemLayout(xl)
          }
        },
        ...(css as any)
      }}
      {...props}
    >
      {children}
    </StyledGridItem>
  );
};

export default withDefaults(GridItem, defaultProps);
