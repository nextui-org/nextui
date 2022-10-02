import type {Wrap} from "@nextui-org/shared-utils";

import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import GridItem, {GridProps} from "./grid";

export interface GridContainerProps extends GridProps {
  /**
   * The children's spacing, commonly used for `Grid` components
   * @default 0
   */
  gap?: number;
  /**
   * CSS "flex-wrap" property
   * @default "wrap"
   */
  wrap?: Wrap;
}

const GridContainer = forwardRef<GridContainerProps, "div">((props, ref) => {
  const {children, css, gap = 0, wrap = "wrap", className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const gapUnit = useMemo(() => {
    return `calc(${gap} * $space$3)`;
  }, [gap]);

  return (
    <GridItem
      ref={domRef}
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
      {...otherProps}
    >
      {children}
    </GridItem>
  );
});

if (__DEV__) {
  GridContainer.displayName = "NextUI.GridContainer";
}

GridContainer.toString = () => ".nextui-grid-container";

export default GridContainer;
