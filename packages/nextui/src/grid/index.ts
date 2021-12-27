import Grid from './grid';
import GridContainer from './grid-container';

export type { GridItemProps } from './grid-item';
export type { GridProps } from './grid';
export type { GridContainerProps } from './grid-container';

export { StyledGridContainer, StyledGridItem } from './grid.styles';
export type {
  GridContainerVariantProps,
  GridItemVariantProps
} from './grid.styles';

Grid.Container = GridContainer;

export default Grid;
