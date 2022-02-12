import React, { useImperativeHandle, useRef } from 'react';
import { CSS } from '../theme/stitches.config';
import { StyledTable, TableVariantsProps } from './table.styles';

import { useTableState, TableStateProps } from '@react-stately/table';
import { useTable } from '@react-aria/table';
import { SelectionMode, SelectionBehavior } from '@react-types/shared';
import { mergeProps } from '@react-aria/utils';

import TableRowGroup from './table-row-group';
import TableColumnHeader from './table-column-header';
import TableHeaderRow from './table-header-row';
import TableRow from './table-row';
import TableCheckboxCell from './table-checkbox-cell';
import TableSelectAllCheckbox from './table-select-all-checkbox';
import TableCell from './table-cell';

interface Props<T> extends TableStateProps<T> {
  selectionMode?: SelectionMode;
  selectionBehavior?: SelectionBehavior;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<
  React.TableHTMLAttributes<unknown>,
  keyof Props<object> | 'children'
>;

export type TableProps<T = object> = Props<T> &
  NativeAttrs &
  TableVariantsProps & { css?: CSS };

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (tableProps, ref: React.Ref<HTMLTableElement | null>) => {
    const { selectionMode, selectionBehavior } = tableProps;

    const state = useTableState({
      ...tableProps,
      showSelectionCheckboxes:
        selectionMode === 'multiple' && selectionBehavior !== 'replace'
    });

    const tableRef = useRef<HTMLTableElement | null>(null);

    useImperativeHandle(ref, () => tableRef?.current);

    const { collection } = state;
    const { gridProps } = useTable(tableProps, state, tableRef);

    console.log({ ...gridProps });
    console.log({ bodyChildNodes: [...collection.body.childNodes] });

    return (
      <StyledTable ref={tableRef} {...mergeProps(gridProps, tableProps)}>
        <TableRowGroup as="thead">
          {collection.headerRows.map((headerRow) => (
            <TableHeaderRow key={headerRow?.key} item={headerRow} state={state}>
              {[...headerRow.childNodes].map((column) =>
                column?.props?.isSelectionCell ? (
                  <TableSelectAllCheckbox
                    key={column?.key}
                    column={column}
                    state={state}
                  />
                ) : (
                  <TableColumnHeader
                    key={column?.key}
                    column={column}
                    state={state}
                  />
                )
              )}
            </TableHeaderRow>
          ))}
        </TableRowGroup>
        <TableRowGroup as="tbody">
          {[...collection.body.childNodes].map((row) => {
            if (!row.hasChildNodes) {
              return null;
            }
            return (
              <TableRow key={row?.key} item={row} state={state}>
                {[...row.childNodes].map((cell) =>
                  cell?.props?.isSelectionCell ? (
                    <TableCheckboxCell
                      key={cell?.key}
                      cell={cell}
                      state={state}
                    />
                  ) : (
                    <TableCell key={cell?.key} cell={cell} state={state} />
                  )
                )}
              </TableRow>
            );
          })}
        </TableRowGroup>
      </StyledTable>
    );
  }
);

Table.displayName = 'NextUI - Table';
Table.toString = () => '.nextui-table';

export default Table;
