import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import {
  Wrap,
  Display,
  Justify,
  Direction,
  AlignItems,
  AlignContent
} from '../utils/prop-types';

interface Props {
  fluid?: boolean;
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
  className?: string;
  style?: object;
  children?: React.ReactNode;
}

const defaultProps = {
  gap: 2,
  fluid: false,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  wrap: 'wrap' as Wrap,
  as: 'div' as keyof JSX.IntrinsicElements,
  display: 'block' as Display,
  className: ''
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
      alignContent
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
    alignContent
  ]);
  const gapUnit = useMemo(() => {
    return `calc(${gap} * ${theme.spacing.sm})`;
  }, [gap, theme.spacing.sm]);

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
        @media only screen and (min-width: ${theme.breakpoints.xs}) {
          .container {
            max-width: ${theme.breakpoints.xs};
          }
          .sm,
          .md,
          .lg,
          .xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.sm}) {
          .container {
            max-width: ${theme.breakpoints.sm};
          }
          .md,
          .lg,
          .xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.md}) {
          .container {
            max-width: ${theme.breakpoints.md};
          }
          .lg,
          .xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.lg}) {
          .container {
            max-width: ${theme.breakpoints.lg};
          }
          .xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.xl}) {
          .container {
            max-width: ${theme.breakpoints.xl};
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
