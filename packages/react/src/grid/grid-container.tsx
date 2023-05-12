import type {CSS} from "../theme/stitches.config";

import React, {useMemo, RefAttributes, PropsWithoutRef} from "react";

import {Wrap} from "../utils/prop-types";
import clsx from "../utils/clsx";

import GridBasicItem, {GridItemProps} from "./grid-item";

interface Props {
  gap?: number;
  wrap?: Wrap;
  className?: string;
  css?: CSS;
  children?: React.ReactNode;
}

export type GridContainerProps = Props & GridItemProps;

const GridContainer = React.forwardRef<HTMLDivElement, GridContainerProps>(
  ({gap = 0, wrap = "wrap" as Wrap, css, children, className = "", ...props}, ref) => {
    const gapUnit = useMemo(() => {
      return `calc(${gap} * $space$3)`;
    }, [gap]);

    return (
      <GridBasicItem
        ref={ref}
        className={clsx("nextui-grid-container", className)}
        css={{
          $$gridGapUnit: gapUnit,
          display: "flex",
          flexWrap: wrap,
          boxSizing: "border-box",
          margin: "calc(-1 * $$gridGapUnit)",
          width: "calc(100% + $$gridGapUnit * 2)",
          ...css,
        }}
        {...props}
      >
        {children}
      </GridBasicItem>
    );
  },
);

GridContainer.displayName = "NextUI.GridContainer";
GridContainer.toString = () => ".nextui-grid-container";

type GridContainerComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>;

export default GridContainer as GridContainerComponent<HTMLDivElement, GridContainerProps>;
