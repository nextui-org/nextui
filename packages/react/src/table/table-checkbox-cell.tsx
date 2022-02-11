import React, { useRef, useImperativeHandle } from 'react';
import { CSS } from '../theme/stitches.config';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { useToggleState } from '@react-stately/toggle';
import { StyledTableCell } from './table.styles';
import { GridNode } from '@react-types/grid';
import { TableState } from '@react-stately/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useCheckbox } from '@react-aria/checkbox';
import Checkbox, { CheckboxProps } from '../checkbox';

type CellProps<T> = GridNode<T> & { parentKey: React.Key };

interface Props<T> {
  cell: CellProps<T>;
  state: TableState<T>;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableCheckboxCellProps<T = unknown> = Props<T> &
  NativeAttrs & { css?: CSS };

const TableCheckboxCell = React.forwardRef<
  HTMLTableCellElement,
  TableCheckboxCellProps
>(({ cell, state, ...props }, ref: React.Ref<HTMLTableCellElement | null>) => {
  const tableCellRef = useRef<HTMLTableCellElement | null>(null);

  useImperativeHandle(ref, () => tableCellRef?.current);

  const {
    gridCellProps
  }: {
    gridCellProps: Omit<
      React.HTMLAttributes<unknown>,
      keyof TableCheckboxCellProps<unknown>
    >;
  } = useTableCell({ node: cell }, state, tableCellRef);

  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey },
    state
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    inputProps
  }: {
    inputProps: Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      keyof CheckboxProps
    >;
  } = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef);

  return (
    <StyledTableCell
      {...mergeProps(gridCellProps, focusProps, props)}
      isFocusVisible={isFocusVisible}
      ref={tableCellRef}
    >
      <Checkbox {...inputProps} />
    </StyledTableCell>
  );
});

TableCheckboxCell.displayName = 'NextUI - TableCheckboxCell';

TableCheckboxCell.toString = () => '.nextui-table-checkbox-cell';

export default TableCheckboxCell;
