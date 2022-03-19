import React from 'react';
import { styled, VariantProps, CSS } from '../theme/stitches.config';

const StyledSortIcon = styled('svg', {
  opacity: 0,
  transition: '$default',
  path: {
    fill: '$$tableRowTextColor'
  },
  variants: {
    visible: {
      true: {
        opacity: 1
      }
    },
    ascending: {
      true: {
        transform: 'rotate(180deg)'
      }
    }
  }
});

type SortIconVariants = VariantProps<typeof StyledSortIcon>;

type NativeAttrs = Omit<
  React.SVGAttributes<SVGElement>,
  keyof SortIconVariants
>;

export type TableSortIconProps = SortIconVariants & NativeAttrs & { css?: CSS };

export const ICON_SIZE = 22;

const TableSortIcon: React.FC<TableSortIconProps> = (props) => (
  <StyledSortIcon
    role="presentation"
    aria-hidden="true"
    focusable="false"
    className="nextui-table-sort-icon"
    width={ICON_SIZE}
    height={ICON_SIZE}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.06 11.27L12.53 14.8C12.38 14.95 12.19 15.02 12 15.02C11.81 15.02 11.62 14.95 11.47 14.8L7.94 11.27C7.65 10.98 7.65 10.5 7.94 10.21C8.23 9.92 8.71 9.92 9 10.21L12 13.21L15 10.21C15.29 9.92 15.77 9.92 16.06 10.21C16.35 10.5 16.35 10.97 16.06 11.27Z" />
  </StyledSortIcon>
);

export default TableSortIcon;
