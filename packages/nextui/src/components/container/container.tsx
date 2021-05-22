import React, { useMemo, ReactNode } from 'react';
import useTheme from '@hooks/use-theme';
import {
  BreakpointsValue,
  Wrap,
  Display,
  Justify,
  Direction,
  AlignItems,
  AlignContent,
} from '@utils/prop-types';

interface Props {
  fluid?: boolean;
  gap: number;
  xs?: BreakpointsValue;
  sm?: BreakpointsValue;
  md?: BreakpointsValue;
  lg?: BreakpointsValue;
  xl?: BreakpointsValue;
  wrap?: Wrap;
  display?: Display;
  justify?: Justify;
  direction?: Direction;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  children: ReactNode;
  as: keyof JSX.IntrinsicElements;
  className?: string;
  style?: object;
}

const defaultProps = {
  gap: 2,
  fluid: false,
  wrap: 'wrap' as Wrap,
  as: 'div' as keyof JSX.IntrinsicElements,
  xs: false as BreakpointsValue,
  sm: false as BreakpointsValue,
  md: false as BreakpointsValue,
  lg: false as BreakpointsValue,
  xl: false as BreakpointsValue,
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ContainerProps = Props & typeof defaultProps & NativeAttrs;

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  fluid,
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
  style,
  ...props
}) => {
  const theme = useTheme();
  const classes = useMemo(() => {
    const aligns: { [key: string]: unknown } = {
      fluid,
      xs,
      sm,
      md,
      lg,
      xl,
      wrap,
      display,
      justify,
      direction,
      alignItems,
      alignContent,
    };
    const classString = Object.keys(aligns).reduce((pre, name) => {
      if (aligns[name] !== undefined && aligns[name] !== false)
        return `${pre} ${name}`;
      return pre;
    }, '');
    return classString.trim();
  }, [
    xs,
    sm,
    md,
    lg,
    xl,
    fluid,
    wrap,
    display,
    justify,
    direction,
    alignItems,
    alignContent,
  ]);
  const gapUnit = useMemo(() => {
    return `calc(${gap} * ${theme.layout.gapQuarter})`;
  }, [gap, theme.layout.gapQuarter]);

  const Component = as;

  return (
    <Component
      className={`container ${classes} ${className}`}
      style={style}
      {...props}
    >
      {children}
      <style jsx>{`
        .container {
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: ${gapUnit};
          padding-left: ${gapUnit};
        }
        .fluid {
          max-width: 100% !important;
        }
        .wrap {
          flex-wrap: ${wrap};
        }
        .display {
          display: ${display};
        }
        .justify {
          justify-content: ${justify};
        }
        .direction {
          flex-direction: ${direction};
        }
        .alignContent {
          align-content: ${alignContent};
        }
        .alignItems {
          align-items: ${alignItems};
        }
        @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
          .container {
            max-width: ${theme.breakpoints.xs.max};
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.sm.min}) {
          .container {
            max-width: ${theme.breakpoints.sm.min};
          }
          .md {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.md.min}) {
          .container {
            max-width: ${theme.breakpoints.md.min};
          }
          .lg {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.lg.min}) {
          .container {
            max-width: ${theme.breakpoints.lg.min};
          }
          .xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.xl.min}) {
          .container {
            max-width: ${theme.breakpoints.xl.min};
          }
        }
      `}</style>
    </Component>
  );
};

type MemoContainerComponent<P = {}> = React.NamedExoticComponent<P>;

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps>;

Container.defaultProps = defaultProps;

export default React.memo(Container) as MemoContainerComponent<ComponentProps>;
