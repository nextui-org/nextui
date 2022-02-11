import React from 'react';
import { TableRowData, TableOnCellClick } from './table-types';
import { TableColumnProps } from './table-column';
import { CSS } from '../theme/stitches.config';
import { StyledTableCell } from './table.styles';

interface Props<TableDataItem extends TableRowData> {
  row?: TableDataItem;
  rowIndex?: number;
  columns?: Array<TableColumnProps<TableDataItem>>;
  emptyText?: string;
  onCellClick?: TableOnCellClick<TableDataItem>;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props<any>>;

export type TableCellProps<TableDataItem extends TableRowData> =
  Props<TableDataItem> & NativeAttrs & { css?: CSS };

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.PropsWithChildren<TableCellProps<TableRowData>>
>(
  (
    { columns, row, rowIndex, emptyText, onCellClick, css, children, ...props },
    ref
  ) => {
    return (
      <React.Fragment>
        {columns?.map((column, columnIndex) => {
          if (column.hide) return null;

          const rowData = row && column?.field && row[column?.field];
          const cellValue = (rowData || emptyText) as React.ReactNode;

          const shouldBeRenderElement = typeof column.renderCell === 'function';

          return (
            <StyledTableCell
              ref={ref}
              role="cell"
              key={`tbody-cell-${column.field}-${columnIndex}`}
              onClick={() =>
                onCellClick && onCellClick(rowData, rowIndex, columnIndex)
              }
              align={column.cellAlign}
              className={column.cellClassName}
              css={{
                ...(css as any),
                ...(column?.cellCss as any)
              }}
              {...props}
            >
              {shouldBeRenderElement
                ? column.renderCell?.({
                    value: cellValue,
                    rowData: row,
                    rowIndex
                  })
                : children || cellValue}
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
