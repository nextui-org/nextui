import React, { useImperativeHandle, useRef } from 'react';
import { useTableState, TableStateProps } from '@react-stately/table';
import { useTable } from '@react-aria/table';
import { SelectionMode, SelectionBehavior } from '@react-types/shared';
import { Spacer } from '../index';
import { CSS } from '../theme/stitches.config';
import TableRowGroup from './table-row-group';
import TableColumnHeader from './table-column-header';
import TableHeaderRow from './table-header-row';
import TableRow from './table-row';
import TableCheckboxCell from './table-checkbox-cell';
import TableSelectAllCheckbox from './table-select-all-checkbox';
import TableCell from './table-cell';
import { StyledTable, TableVariantsProps } from './table.styles';
import { FocusScope } from '@react-aria/focus';
import withDefaults from '../utils/with-defaults';

interface Props<T> extends TableStateProps<T> {
  selectionMode?: SelectionMode;
  selectionBehavior?: SelectionBehavior;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<
  React.TableHTMLAttributes<unknown>,
  keyof Props<object>
>;

export type TableProps<T = object> = Props<T> &
  NativeAttrs &
  TableVariantsProps & { css?: CSS };

const defaultProps = {
  selectionMode: 'none',
  selectionBehavior: 'toggle'
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (tableProps, ref: React.Ref<HTMLTableElement | null>) => {
    const { selectionMode, selectionBehavior, ...props } = tableProps;

    const state = useTableState({
      ...tableProps,
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
      <StyledTable
        ref={tableRef}
        hoverable={selectionMode !== 'none'}
        isMultiple={selectionMode === 'multiple'}
        {...gridProps}
        {...props}
      >
        <FocusScope>
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
          <Spacer y={0.2} />
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
                        color={props.selectedColor}
                      />
                    ) : (
                      <TableCell key={cell?.key} cell={cell} state={state} />
                    )
                  )}
                </TableRow>
              );
            })}
          </TableRowGroup>
        </FocusScope>
      </StyledTable>
    );
  }
);

Table.displayName = 'NextUI - Table';
Table.toString = () => '.nextui-table';

export default withDefaults(Table, defaultProps);
