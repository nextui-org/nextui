import React, {useRef, useImperativeHandle} from "react";
import {useTableHeaderRow} from "@react-aria/table";
import {GridNode} from "@react-types/grid";
import {TableState} from "@react-stately/table";

import {CSS} from "../theme/stitches.config";
import clsx from "../utils/clsx";

import {StyledTableHeaderRow} from "./table.styles";

interface Props<T> {
  item: GridNode<T>;
  state: TableState<T>;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableHeaderRowProps<T = unknown> = Props<T> & NativeAttrs & {css?: CSS};

const TableHeaderRow = React.forwardRef<HTMLTableRowElement, TableHeaderRowProps>(
  ({children, item, state, ...props}, ref: React.Ref<HTMLTableRowElement | null>) => {
    const tableHeaderRowRef = useRef<HTMLTableRowElement | null>(null);

    useImperativeHandle(ref, () => tableHeaderRowRef?.current);

    const {
      rowProps,
    }: {
      rowProps: Omit<React.HTMLAttributes<unknown>, keyof TableHeaderRowProps<unknown>>;
    } = useTableHeaderRow({node: item}, state, tableHeaderRowRef);

    return (
      <StyledTableHeaderRow
        ref={tableHeaderRowRef}
        className={clsx("nextui-table-header-row", props.className)}
        {...props}
        {...rowProps}
      >
        {children}
      </StyledTableHeaderRow>
    );
  },
);

TableHeaderRow.displayName = "NextUI.TableHeaderRow";

TableHeaderRow.toString = () => ".nextui-table-header-row";

export default TableHeaderRow;
