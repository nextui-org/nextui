import React, {
  useImperativeHandle,
  useRef,
  RefAttributes,
  PropsWithoutRef
} from 'react';
import { useTable } from '@react-aria/table';
import {
  Cell,
  Row,
  TableBody,
  TableHeader,
  useTableState,
  TableStateProps
} from '@react-stately/table';

import {
  SelectionMode,
  SelectionBehavior,
  CollectionChildren
} from '@react-types/shared';

import { Spacer } from '../index';
import { CSS } from '../theme/stitches.config';
import TableRowGroup from './table-row-group';
import TableColumnHeader from './table-column-header';
import TableHeaderRow from './table-header-row';
import TableRow from './table-row';
import TableCheckboxCell from './table-checkbox-cell';
import TableSelectAllCheckbox from './table-select-all-checkbox';
import TableCell from './table-cell';
import TableColumn from './table-column';
import TablePagination from './table-pagination';
import TableFooter from './table-footer';
import { hasChild, pickSingleChild } from '../utils/collections';
import { StyledTable, TableVariantsProps } from './table.styles';
import TableContext from './table-context';
import withDefaults from '../utils/with-defaults';

interface Props<T> extends TableStateProps<T> {
  selectionMode?: SelectionMode;
  selectionBehavior?: SelectionBehavior;
  animated?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<
  React.TableHTMLAttributes<unknown>,
  keyof Props<object>
>;

export type TableProps<T = object> = Props<T> &
  NativeAttrs &
  Omit<TableVariantsProps, 'isMultiple'> & { css?: CSS };

const defaultProps = {
  animated: true,
  selectionMode: 'none',
  selectionBehavior: 'toggle'
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (tableProps, ref: React.Ref<HTMLTableElement | null>) => {
    const { selectionMode, selectionBehavior, children, ...props } = tableProps;

    const [withoutPaginationChildren, paginationChildren] = pickSingleChild<
      CollectionChildren<any>
    >(children, TablePagination);

    const hasPagination = hasChild(children, TablePagination);

    const state = useTableState({
      ...tableProps,
      children: withoutPaginationChildren,
      showSelectionCheckboxes:
        selectionMode === 'multiple' && selectionBehavior !== 'replace'
    });

    const tableRef = useRef<HTMLTableElement | null>(null);

    useImperativeHandle(ref, () => tableRef?.current);

    const { collection } = state;
    const {
      gridProps
    }: {
      gridProps: Omit<React.HTMLAttributes<unknown>, keyof TableProps<unknown>>;
    } = useTable(tableProps, state, tableRef);

    return (
      <TableContext.Provider>
        <StyledTable
          ref={tableRef}
          hoverable={selectionMode !== 'none' || props.hoverable}
          isMultiple={selectionMode === 'multiple'}
          {...gridProps}
          {...props}
        >
          <TableRowGroup as="thead">
            {collection.headerRows.map((headerRow) => (
              <TableHeaderRow
                key={headerRow?.key}
                item={headerRow}
                state={state}
              >
                {[...headerRow.childNodes].map((column) =>
                  column?.props?.isSelectionCell ? (
                    <TableSelectAllCheckbox
                      key={column?.key}
                      column={column}
                      state={state}
                      color={props.selectedColor}
                      animated={props.animated}
                    />
                  ) : (
                    <TableColumnHeader
                      key={column?.key}
                      column={column}
                      state={state}
                      animated={props.animated}
                    />
                  )
                )}
              </TableHeaderRow>
            ))}
          </TableRowGroup>
          {!props.sticked && <Spacer as="tr" y={0.4} />}
          <TableRowGroup as="tbody">
            {[...collection.body.childNodes].map((row) => {
              if (!row.hasChildNodes) {
                return null;
              }
              return (
                <TableRow
                  key={row?.key}
                  item={row}
                  state={state}
                  animated={props.animated}
                >
                  {[...row.childNodes].map((cell) =>
                    cell?.props?.isSelectionCell ? (
                      <TableCheckboxCell
                        key={cell?.key}
                        cell={cell}
                        state={state}
                        color={props.selectedColor}
                        animated={props.animated}
                      />
                    ) : (
                      <TableCell key={cell?.key} cell={cell} state={state} />
                    )
                  )}
                </TableRow>
              );
            })}
          </TableRowGroup>
          {hasPagination && (
            <TableFooter>
              <Spacer as="tr" y={0.6} />
              <tr role="row">
                <th
                  tabIndex={-1}
                  role="columnheader"
                  colSpan={collection.columnCount}
                >
                  {paginationChildren}
                </th>
              </tr>
            </TableFooter>
          )}
        </StyledTable>
      </TableContext.Provider>
    );
  }
);

type TableComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Cell: typeof Cell;
  Column: typeof TableColumn;
  Row: typeof Row;
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Pagination: typeof TablePagination;
};

Table.displayName = 'NextUI - Table';
Table.toString = () => '.nextui-table';

export default withDefaults(Table, defaultProps) as TableComponent<
  HTMLTableElement,
  TableProps
>;
