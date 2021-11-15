import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import {
  BreakpointsValue,
  Justify,
  Direction,
  AlignItems,
  AlignContent
} from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';

interface Props extends DefaultProps {
  xs?: BreakpointsValue;
  sm?: BreakpointsValue;
  md?: BreakpointsValue;
  lg?: BreakpointsValue;
  xl?: BreakpointsValue;
  justify?: Justify;
  direction?: Direction;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
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
export type GridBasicItemProps = Props & typeof defaultProps & NativeAttrs;

type ItemLayoutValue = {
  grow: number;
  width: string;
  basis: string;
  display: string;
};
const getItemLayout = (val: BreakpointsValue): ItemLayoutValue => {
  const display = val === 0 ? 'display: none;' : 'display: inherit';
  if (typeof val === 'number') {
    const width = (100 / 12) * val;
    const ratio = width > 100 ? '100%' : width < 0 ? '0' : `${width}%`;
    return {
      grow: 0,
      display,
      width: ratio,
      basis: ratio
    };
  }
  return {
    grow: 1,
    display,
    width: '100%',
    basis: '0'
  };
};

const GridBasicItem: React.FC<React.PropsWithChildren<GridBasicItemProps>> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  justify,
  direction,
  alignItems,
  alignContent,
  children,
  className,
  style,
  ...props
}) => {
  const theme = useTheme();

  const spacingStyles = getSpacingsStyles(theme, props);

  const classes = useMemo(() => {
    const aligns: { [key: string]: unknown } = {
      'nextui-grid-item-justify': justify,
      'nextui-grid-item-direction': direction,
      'nextui-grid-item-align-items': alignItems,
      'nextui-grid-item-align-content': alignContent,
      'nextui-grid-item-xs': xs,
      'nextui-grid-item-sm': sm,
      'nextui-grid-item-md': md,
      'nextui-grid-item-lg': lg,
      'nextui-grid-item-xl': xl
    };
    const classString = Object.keys(aligns).reduce((pre, name) => {
      if (aligns[name] !== undefined && aligns[name] !== false)
        return `${pre} ${name}`;
      return pre;
    }, '');
    return classString.trim();
  }, [justify, direction, alignItems, alignContent, xs, sm, md, lg, xl]);

  const layout = useMemo<
    {
      [key in ['xs', 'sm', 'md', 'lg', 'xl'][number]]: ItemLayoutValue;
    }
  >(
    () => ({
      xs: getItemLayout(xs),
      sm: getItemLayout(sm),
      md: getItemLayout(md),
      lg: getItemLayout(lg),
      xl: getItemLayout(xl)
    }),
    [xs, sm, md, lg, xl]
  );
  return (
    <div
      className={`nextui-grid-item ${classes} ${className}`}
      style={{ ...style, ...spacingStyles }}
      {...props}
    >
      {children}
      <style jsx>{`
        .nextui-grid-item {
        }
        .nextui-grid-item-justify {
          justify-content: ${justify};
        }
        .nextui-grid-item-direction {
          flex-direction: ${direction};
        }
        .nextui-grid-item-align-content {
          align-content: ${alignContent};
        }
        .nextui-grid-item-align-items {
          align-items: ${alignItems};
        }
        .nextui-grid-item-xs {
          flex-grow: ${layout.xs.grow};
          max-width: ${layout.xs.width};
          flex-basis: ${layout.xs.basis};
          ${layout.xs.display}
        }
        @media only screen and (max-width: ${theme.breakpoints.xs}) {
          .nextui-grid-item-xs {
            flex-grow: ${layout.xs.grow};
            max-width: ${layout.xs.width};
            flex-basis: ${layout.xs.basis};
            ${layout.xs.display}
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.sm}) {
          .nextui-grid-item-sm {
            flex-grow: ${layout.sm.grow};
            max-width: ${layout.sm.width};
            flex-basis: ${layout.sm.basis};
            ${layout.sm.display}
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.md}) {
          .nextui-grid-item-md {
            flex-grow: ${layout.md.grow};
            max-width: ${layout.md.width};
            flex-basis: ${layout.md.basis};
            ${layout.md.display}
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.lg}) {
          .nextui-grid-item-lg {
            flex-grow: ${layout.lg.grow};
            max-width: ${layout.lg.width};
            flex-basis: ${layout.lg.basis};
            ${layout.lg.display}
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.xl}) {
          .nextui-grid-item-xl {
            flex-grow: ${layout.xl.grow};
            max-width: ${layout.xl.width};
            flex-basis: ${layout.xl.basis};
            ${layout.xl.display}
          }
        }
      `}</style>
    </div>
  );
};

type MemoBasicItemComponent<P = {}> = React.NamedExoticComponent<P>;
export type GridBasicItemComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

GridBasicItem.defaultProps = defaultProps;

export default React.memo(
  GridBasicItem
) as MemoBasicItemComponent<GridBasicItemComponentProps>;
