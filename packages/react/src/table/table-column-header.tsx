import React, { useRef, useImperativeHandle } from 'react';
import { CSS } from '../theme/stitches.config';
import { useTableColumnHeader } from '@react-aria/table';
import {
  StyledTableColumnHeader,
  TableColumnHeaderVariantsProps
} from './table.styles';
import { GridNode } from '@react-types/grid';
import { TableState } from '@react-stately/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import clsx from '../utils/clsx';

interface Props<T> {
  column: GridNode<T>;
  state: TableState<T>;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableColumnHeaderProps<T = unknown> = Props<T> &
  TableColumnHeaderVariantsProps &
  NativeAttrs & { css?: CSS };

const TableColumnHeader = React.forwardRef<
  HTMLTableRowElement,
  TableColumnHeaderProps
>(({ column, state, ...props }, ref: React.Ref<HTMLTableRowElement | null>) => {
  const tableColumnHeaderRef = useRef<HTMLTableRowElement | null>(null);

  useImperativeHandle(ref, () => tableColumnHeaderRef?.current);

  const {
    columnHeaderProps
  }: {
    columnHeaderProps: Omit<
      React.HTMLAttributes<unknown>,
      keyof TableColumnHeaderProps<unknown>
    >;
  } = useTableColumnHeader({ node: column }, state, tableColumnHeaderRef);

  const { isFocusVisible, focusProps } = useFocusRing();
  const arrowIcon = state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';

  return (
    <StyledTableColumnHeader
      ref={tableColumnHeaderRef}
      isFocusVisible={isFocusVisible}
      colSpan={column.colspan}
      className={clsx('nextui-table-column-header', props.className)}
      {...mergeProps(props, columnHeaderProps, focusProps, column.props)}
    >
      {column.props.hideHeader ? (
        <VisuallyHidden>{column.rendered}</VisuallyHidden>
      ) : (
        column.rendered
      )}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          style={{
            padding: '0 2px',
            visibility:
              state.sortDescriptor?.column === column.key ? 'visible' : 'hidden'
          }}
        >
          {arrowIcon}
        </span>
      )}
    </StyledTableColumnHeader>
  );
});

TableColumnHeader.displayName = 'NextUI - TableColumnHeader';

TableColumnHeader.toString = () => '.nextui-table-column-header';

export default TableColumnHeader;
