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
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';

interface Props extends DefaultProps {
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

  const spacingStyles = getSpacingsStyles(theme, props);

  const classes = useMemo(() => {
    const aligns: { [key: string]: unknown } = {
      'nextui-container-fluid': fluid,
      'nextui-container-xs': xs,
      'nextui-container-sm': sm,
      'nextui-container-md': md,
      'nextui-container-lg': lg,
      'nextui-container-xl': xl,
      'nextui-container-wrap': wrap,
      'nextui-container-display': display,
      'nextui-container-justify': justify,
      'nextui-container-direction': direction,
      'nextui-container-align-items': alignItems,
      'nextui-container-align-content': alignContent
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
      className={`nextui-container ${classes} ${className}`}
      style={{ ...style, ...spacingStyles }}
      {...props}
    >
      {children}
      <style jsx>{`
        .nextui-container {
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: ${gapUnit};
          padding-left: ${gapUnit};
        }
        .nextui-container-fluid {
          max-width: 100% !important;
        }
        .nextui-container-wrap {
          flex-wrap: ${wrap};
        }
        .nextui-container-display {
          display: ${display};
        }
        .nextui-container-justify {
          justify-content: ${justify};
        }
        .nextui-container-direction {
          flex-direction: ${direction};
        }
        .nextui-container-align-content {
          align-content: ${alignContent};
        }
        .nextui-container-align-items {
          align-items: ${alignItems};
        }
        @media only screen and (min-width: ${theme.breakpoints.xs}) {
          .nextui-container {
            max-width: ${theme.breakpoints.xs};
          }
          .nextui-container-sm,
          .nextui-container-md,
          .nextui-container-lg,
          .nextui-container-xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.sm}) {
          .nextui-container {
            max-width: ${theme.breakpoints.sm};
          }
          .nextui-container-md,
          .nextui-container-lg,
          .nextui-container-xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.md}) {
          .nextui-container {
            max-width: ${theme.breakpoints.md};
          }
          .nextui-container-lg,
          .nextui-container-xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.lg}) {
          .nextui-container {
            max-width: ${theme.breakpoints.lg};
          }
          .nextui-container-xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.xl}) {
          .nextui-container {
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
