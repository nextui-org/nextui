import { styled, VariantProps } from '../theme/stitches.config';

export const StyledGridContainer = styled('div', {});

export const StyledGridItem = styled('div', {
  margin: 0,
  boxSizing: 'border-box',
  padding: '$$gridGapUnit'
});

export type GridContainerVariantProps = VariantProps<
  typeof StyledGridContainer
>;
export type GridItemVariantProps = VariantProps<typeof StyledGridItem>;
