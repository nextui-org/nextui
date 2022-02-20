import React, { useMemo } from 'react';
import { CSS } from '../theme/stitches.config';
import { TableCollection } from '@react-types/table';
import { TableVariantsProps, StyledBaseTableCell } from './table.styles';
import { TableState } from '@react-stately/table';
import TableRowGroup from './table-row-group';
import TableRow from './table-row';
import TableCell from './table-cell';
import TableCheckboxCell from './table-checkbox-cell';
import { useTableContext } from './table-context';
import clsx from '../utils/clsx';

interface Props<T> {
  state: TableState<T>;
  collection: TableCollection<T>;
  animated?: boolean;
  hasPagination?: boolean;
  selectedColor?: TableVariantsProps['selectedColor'];
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableBodyProps<T = unknown> = Props<T> &
  NativeAttrs & { css?: CSS };

const TableBody: React.FC<TableBodyProps> = ({
  collection,
  state,
  animated,
  selectedColor,
  hasPagination,
  ...props
}) => {
  const { currentPage, rowsPerPage } = useTableContext();

  const rows = useMemo(() => {
    const data = [...collection.body.childNodes];
    if (!hasPagination) {
      return data;
    }
    return data?.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [hasPagination, collection, currentPage, rowsPerPage]);

  const completeSpaces = useMemo(() => {
    const rowsCount = rows.length;
    if (rowsCount >= rowsPerPage) {
      return null;
    }
    return (
      <tr role="row" className="nextui-table-hidden-row" aria-hidden="true">
        <StyledBaseTableCell
          aria-hidden="true"
          colSpan={collection.columnCount}
          css={{
            height: `calc(${rowsPerPage - rowsCount} * $space$14)`
          }}
        />
      </tr>
    );
  }, [collection.columnCount, rows, rowsPerPage]);

  return (
    <TableRowGroup
      as="tbody"
      className={clsx('nextui-table-body', props.className)}
      {...props}
    >
      {rows?.map((row) => {
        if (!row.hasChildNodes) {
          return null;
        }
        return (
          <TableRow
            key={row?.key}
            aria-hidden="false"
            item={row}
            state={state}
            animated={animated}
          >
            {[...row.childNodes].map((cell) =>
              cell?.props?.isSelectionCell ? (
                <TableCheckboxCell
                  key={cell?.key}
                  cell={cell}
                  state={state}
                  color={selectedColor}
                  animated={animated}
                />
              ) : (
                <TableCell key={cell?.key} cell={cell} state={state} />
              )
            )}
          </TableRow>
        );
      })}
      {completeSpaces}
    </TableRowGroup>
  );
};

TableBody.displayName = 'NextUI - TableBody';

TableBody.toString = () => '.nextui-table-body';

export default TableBody;
