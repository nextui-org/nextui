import React from 'react';
import { TableDataItemBase, TableOnCellClick } from './table-types';
import { TableColumnProps } from './table-column';
import { CSS } from '../theme/stitches.config';
import { StyledTableCell } from './table.styles';

interface Props<TableDataItem extends TableDataItemBase> {
  row?: TableDataItem;
  rowIndex?: number;
  columns?: Array<TableColumnProps<TableDataItem>>;
  emptyText?: string;
  onCellClick?: TableOnCellClick<TableDataItem>;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props<any>>;

export type TableCellProps<TableDataItem extends TableDataItemBase> =
  Props<TableDataItem> & NativeAttrs & { css?: CSS };

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.PropsWithChildren<TableCellProps<TableDataItemBase>>
>(
  (
    { columns, row, rowIndex, emptyText, onCellClick, children, ...props },
    ref
  ) => {
    return (
      <React.Fragment>
        {columns?.map((column, columnIndex) => {
          const rowData = row && column?.field && row[column?.field];
          const cellValue = (rowData || emptyText) as React.ReactNode;

          return (
            <StyledTableCell
              ref={ref}
              role="cell"
              key={`tbody-cell-${column.field}-${columnIndex}`}
              onClick={() =>
                onCellClick && onCellClick(rowData, rowIndex, columnIndex)
              }
              className={column.className}
              {...props}
            >
              {children || cellValue}
            </StyledTableCell>
          );
        })}
      </React.Fragment>
    );
  }
);

TableCell.displayName = 'NextUI - TableCell';
TableCell.toString = () => '.nextui-table-cell';

export default TableCell;
