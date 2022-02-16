import React, { useRef, useImperativeHandle } from 'react';
import { CSS } from '../theme/stitches.config';
import { useTableRow } from '@react-aria/table';
import { StyledTableRow } from './table.styles';
import { GridNode } from '@react-types/grid';
import { TableState } from '@react-stately/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

interface Props<T> {
  item: GridNode<T>;
  state: TableState<T>;
  animated?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableRowProps<T = unknown> = Props<T> & NativeAttrs & { css?: CSS };

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.PropsWithChildren<TableRowProps>
>(
  (
    { children, item, state, ...props },
    ref: React.Ref<HTMLTableRowElement | null>
  ) => {
    const tableRowRef = useRef<HTMLTableRowElement | null>(null);

    useImperativeHandle(ref, () => tableRowRef?.current);

    const { rowProps } = useTableRow({ node: item }, state, tableRowRef);

    const { isFocusVisible, focusProps } = useFocusRing();

    return (
      <StyledTableRow
        ref={tableRowRef}
        isFocusVisible={isFocusVisible}
        isSelected={!!rowProps['aria-selected']}
        {...mergeProps(rowProps, focusProps, props)}
      >
        {children}
      </StyledTableRow>
    );
  }
);

TableRow.displayName = 'NextUI - TableRow';

TableRow.toString = () => '.nextui-table-row';

export default TableRow;
