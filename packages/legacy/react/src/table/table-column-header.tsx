import React, {useRef, useImperativeHandle} from "react";
import {useTableColumnHeader} from "@react-aria/table";
import {GridNode} from "@react-types/grid";
import {TableState} from "@react-stately/table";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {CSS} from "../theme/stitches.config";
import clsx from "../utils/clsx";

import TableSortIcon, {ICON_SIZE} from "./table-sort-icon";
import {StyledTableColumnHeader, TableColumnHeaderVariantsProps} from "./table.styles";

interface Props<T> {
  column: GridNode<T>;
  state: TableState<T>;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableColumnHeaderProps<T = unknown> = Props<T> &
  TableColumnHeaderVariantsProps &
  NativeAttrs & {css?: CSS};

const TableColumnHeader = React.forwardRef<HTMLTableRowElement, TableColumnHeaderProps>(
  ({column, state, ...props}, ref: React.Ref<HTMLTableRowElement | null>) => {
    const tableColumnHeaderRef = useRef<HTMLTableRowElement | null>(null);

    useImperativeHandle(ref, () => tableColumnHeaderRef?.current);

    const {
      columnHeaderProps,
    }: {
      columnHeaderProps: Omit<React.HTMLAttributes<unknown>, keyof TableColumnHeaderProps<unknown>>;
    } = useTableColumnHeader({node: column}, state, tableColumnHeaderRef);

    const {isFocusVisible, focusProps} = useFocusRing();
    const {hideHeader, ...columnProps} = column.props;

    return (
      <StyledTableColumnHeader
        ref={tableColumnHeaderRef}
        className={clsx("nextui-table-column-header", props.className)}
        colSpan={column.colspan}
        isFocusVisible={isFocusVisible}
        {...mergeProps(props, columnHeaderProps, focusProps, columnProps)}
      >
        {hideHeader ? <VisuallyHidden>{column.rendered}</VisuallyHidden> : column.rendered}
        {columnProps.allowsSorting && (
          <TableSortIcon
            ascending={state.sortDescriptor?.direction === "ascending"}
            css={{
              position: "absolute",
              m: "0 $2",
              bottom: `calc(50% - ${ICON_SIZE / 2}px)`,
            }}
            visible={state.sortDescriptor?.column === column.key}
          />
        )}
      </StyledTableColumnHeader>
    );
  },
);

TableColumnHeader.displayName = "NextUI.TableColumnHeader";

TableColumnHeader.toString = () => ".nextui-table-column-header";

export default TableColumnHeader;
