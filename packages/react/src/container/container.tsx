import type {CSS} from "../theme/stitches.config";

import React, {useMemo} from "react";

import {useDOMRef} from "../utils/dom";
import {Wrap, Display, Justify, Direction, AlignItems, AlignContent} from "../utils/prop-types";

import StyledContainer from "./container.styles";

interface Props {
  gap?: number;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  responsive?: boolean;
  fluid?: boolean;
  wrap?: Wrap;
  display?: Display;
  justify?: Justify;
  direction?: Direction;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  as?: keyof JSX.IntrinsicElements;
  css?: CSS;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ContainerProps = Props & NativeAttrs;

const Container = React.forwardRef<HTMLElement, ContainerProps>((containerProps, ref) => {
  const {
    xs = false,
    sm = false,
    md = false,
    lg = false,
    xl = false,
    wrap = "wrap" as Wrap,
    gap = 2,
    as = "div" as keyof JSX.IntrinsicElements,
    display = "block" as Display,
    justify,
    direction,
    alignItems,
    alignContent,
    children,
    responsive = true,
    fluid = false,
    css,
    ...otherProps
  } = containerProps;

  const domRef = useDOMRef(ref);

  const gapUnit = useMemo(() => {
    return `calc(${gap} * $space$sm)`;
  }, [gap]);

  const getMaxWidth = () => {
    if (xs) return "$breakpoints$xs";
    if (sm) return "$breakpoints$sm";
    if (md) return "$breakpoints$md";
    if (lg) return "$breakpoints$lg";
    if (xl) return "$breakpoints$xl";

    return "";
  };

  return (
    <StyledContainer
      ref={domRef}
      as={as}
      css={{
        px: gapUnit,
        maxWidth: getMaxWidth(),
        alignItems,
        alignContent,
        flexWrap: wrap,
        display: display,
        justifyContent: justify,
        flexDirection: direction,
        ...css,
      }}
      fluid={fluid}
      responsive={responsive}
      {...otherProps}
    >
      {children}
    </StyledContainer>
  );
});

Container.displayName = "NextUI.Container";

Container.toString = () => ".nextui-container";

type ComponentProps = Props & NativeAttrs;

type MemoContainerComponent<P = {}> = React.NamedExoticComponent<P>;

export default React.memo(Container) as MemoContainerComponent<ComponentProps>;
