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

const preClass = 'nextui-container';

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
  ...props
}) => {
  const theme = useTheme();

  const { stringCss } = getSpacingsStyles(theme, props);

  const classes = useMemo(() => {
    const aligns: { [key: string]: unknown } = {
      [`${preClass}-fluid`]: fluid,
      [`${preClass}-xs`]: xs,
      [`${preClass}-sm`]: sm,
      [`${preClass}-md`]: md,
      [`${preClass}-lg`]: lg,
      [`${preClass}-xl`]: xl,
      [`${preClass}-wrap`]: wrap,
      [`${preClass}-display`]: display,
      [`${preClass}-justify`]: justify,
      [`${preClass}-direction`]: direction,
      [`${preClass}-align-items`]: alignItems,
      [`${preClass}-align-content`]: alignContent
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
    <Component className={`${preClass} ${classes} ${className}`} {...props}>
      {children}
      <style jsx>{`
        .${preClass} {
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: ${gapUnit};
          padding-left: ${gapUnit};
          ${stringCss};
        }
        .${preClass}-fluid {
          max-width: 100% !important;
        }
        .${preClass}-wrap {
          flex-wrap: ${wrap};
        }
        .${preClass}-display {
          display: ${display};
        }
        .${preClass}-justify {
          justify-content: ${justify};
        }
        .${preClass}-direction {
          flex-direction: ${direction};
        }
        .${preClass}-align-content {
          align-content: ${alignContent};
        }
        .${preClass}-align-items {
          align-items: ${alignItems};
        }
        @media only screen and (min-width: ${theme.breakpoints.xs}) {
          .${preClass} {
            max-width: ${theme.breakpoints.xs};
          }
          .${preClass}-sm, .${preClass}-md, .${preClass}-lg, .${preClass}-xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.sm}) {
          .${preClass} {
            max-width: ${theme.breakpoints.sm};
          }
          .${preClass}-md, .${preClass}-lg, .${preClass}-xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.md}) {
          .${preClass} {
            max-width: ${theme.breakpoints.md};
          }
          .${preClass}-lg, .${preClass}-xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.lg}) {
          .${preClass} {
            max-width: ${theme.breakpoints.lg};
          }
          .${preClass}-xl {
            max-width: 100%;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.xl}) {
          .${preClass} {
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
