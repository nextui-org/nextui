import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {StyledGrid} from "./grid.styles";
import GridContainer from "./grid-container";
import {UseGridProps, useGrid} from "./use-grid";

export interface GridProps extends UseGridProps {}

type CompoundGrid = {
  Container: typeof GridContainer;
};

const Grid = forwardRef<GridProps, "div", CompoundGrid>((props, ref) => {
  const {children, gridCss, css, className, ...otherProps} = useGrid(props);

  const domRef = useDOMRef(ref);

  return (
    <StyledGrid
      ref={domRef}
      className={clsx("nextui-grid", className)}
      css={{
        ...gridCss,
        ...css,
      }}
      {...otherProps}
    >
      {children}
    </StyledGrid>
  );
});

Grid.Container = GridContainer;

if (__DEV__) {
  Grid.displayName = "NextUI.Grid";
}

Grid.toString = () => ".nextui-grid";

export default Grid;
