import React, { useRef, useImperativeHandle } from 'react';
import { CSS } from '../theme/stitches.config';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { useToggleState } from '@react-stately/toggle';
import { GridNode } from '@react-types/grid';
import { TableState } from '@react-stately/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useCheckbox } from '@react-aria/checkbox';
import Checkbox, { CheckboxProps } from '../checkbox';
import { StyledTableCell, TableVariantsProps } from './table.styles';

type CellProps<T> = GridNode<T> & { parentKey?: React.Key };

interface Props<T> {
  cell: CellProps<T>;
  state: TableState<T>;
  color?: TableVariantsProps['selectedColor'];
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableCheckboxCellProps<T = unknown> = Props<T> &
  NativeAttrs & { css?: CSS };

const TableCheckboxCell = React.forwardRef<
  HTMLTableCellElement,
  TableCheckboxCellProps
>(
  (
    { cell, state, color, ...props },
    ref: React.Ref<HTMLTableCellElement | null>
  ) => {
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
      { key: cell?.parentKey || cell.key },
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
        <Checkbox
          {...inputProps}
          ref={inputRef}
          color={color as CheckboxProps['color']}
          css={{ display: 'inherit' }}
        />
      </StyledTableCell>
    );
  }
);

TableCheckboxCell.displayName = 'NextUI - TableCheckboxCell';

TableCheckboxCell.toString = () => '.nextui-table-checkbox-cell';

export default TableCheckboxCell;
