import React, { useRef, useImperativeHandle } from 'react';
import { CSS } from '../theme/stitches.config';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { GridNode } from '@react-types/grid';
import { TableState } from '@react-stately/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import Checkbox, { CheckboxProps } from '../checkbox';
import { StyledTableCell, TableVariantsProps } from './table.styles';
import { mapPropsToCheckboxAttr } from './utils';
import clsx from '../utils/clsx';

type CellProps<T> = GridNode<T> & { parentKey?: React.Key };

interface Props<T> {
  cell: CellProps<T>;
  state: TableState<T>;
  color?: TableVariantsProps['color'];
  animated?: boolean;
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
    { cell, state, color, animated, ...props },
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

    const mappedProps = mapPropsToCheckboxAttr(checkboxProps);

    return (
      <StyledTableCell
        ref={tableCellRef}
        isFocusVisible={isFocusVisible}
        className={clsx('nextui-table-checkbox-cell', props.className)}
        {...mergeProps(gridCellProps, focusProps, props)}
      >
        <Checkbox
          {...mappedProps}
          color={color as CheckboxProps['color']}
          animated={animated}
          css={{ display: 'inherit' }}
        />
      </StyledTableCell>
    );
  }
);

TableCheckboxCell.displayName = 'NextUI - TableCheckboxCell';

TableCheckboxCell.toString = () => '.nextui-table-checkbox-cell';

export default TableCheckboxCell;
