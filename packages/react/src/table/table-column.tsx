import React, { forwardRef, PropsWithChildren } from 'react';
import { CSS } from '../theme/stitches.config';
import {
  TableRowData,
  TableColumnProps as TableColumnPropsBase
} from './table-types';
import { StyledTableColumn } from './table.styles';

interface Props {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;

export type TableColumnProps<TableDataItem extends TableRowData> =
  TableColumnPropsBase<TableDataItem> & Props & NativeAttrs & { css?: CSS };

const TableColumn = forwardRef<
  HTMLTableCellElement,
  PropsWithChildren<TableColumnProps<TableRowData>>
>(({ children, label, ...props }, ref) => {
  return (
    <StyledTableColumn role="columnheader" ref={ref} {...props}>
      {children || label}
    </StyledTableColumn>
  );
});

TableColumn.displayName = 'NextUI - TableColumn';
TableColumn.toString = () => '.nextui-table-column';

export default TableColumn;
