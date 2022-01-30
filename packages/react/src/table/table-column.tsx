import React, { forwardRef, PropsWithChildren } from 'react';
import { CSS } from '../theme/stitches.config';
import { TableColumnRender, TableDataItemBase } from './table-types';
import { StyledTableColumn } from './table.styles';

interface Props<TableDataItem extends TableDataItemBase> {
  field?: keyof TableDataItem;
  label?: string;
  width?: number;
  className?: string;
  render?: TableColumnRender<TableDataItem>;
  as?: keyof JSX.IntrinsicElements;
}
type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props<any>>;

export type TableColumnProps<TableDataItem extends TableDataItemBase> =
  Props<TableDataItem> & NativeAttrs & { css?: CSS };

const TableColumn = forwardRef<
  HTMLTableCellElement,
  PropsWithChildren<TableColumnProps<TableDataItemBase>>
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
