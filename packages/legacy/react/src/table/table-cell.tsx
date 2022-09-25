import React from "react";
import {useTableCell} from "@react-aria/table";
import {GridNode} from "@react-types/grid";
import {TableState} from "@react-stately/table";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";

import {CSS} from "../theme/stitches.config";
import clsx from "../utils/clsx";
import {useDOMRef} from "../utils/dom";

import {StyledTableCell} from "./table.styles";

type CellProps<T> = GridNode<T> & {rendered: React.ReactNode};

interface Props<T> {
  cell: CellProps<T>;
  state: TableState<T>;
  // @internal
  isStatic?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableCellProps<T = unknown> = Props<T> & NativeAttrs & {css?: CSS};

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({cell, state, isStatic, ...props}, ref: React.Ref<HTMLTableCellElement | null>) => {
    const domRef = useDOMRef<HTMLTableCellElement>(ref);

    const {
      gridCellProps,
    }: {
      gridCellProps: Omit<React.HTMLAttributes<unknown>, keyof TableCellProps<unknown>>;
    } = useTableCell({node: cell}, state, domRef);

    const {isFocusVisible, focusProps} = useFocusRing();

    const customGridCellProps = isStatic
      ? {
          ...gridCellProps,
          onMouseDown: (e: MouseEvent) => e.stopPropagation(),
          onPointerDown: (e: MouseEvent) => e.stopPropagation(),
        }
      : gridCellProps;

    return (
      <StyledTableCell
        ref={domRef}
        className={clsx("nextui-table-cell", props.className)}
        css={cell.props.css}
        isFocusVisible={isFocusVisible}
        isStatic={isStatic}
        {...mergeProps(customGridCellProps, focusProps, props)}
      >
        {cell.rendered}
      </StyledTableCell>
    );
  },
);

TableCell.displayName = "NextUI.TableCell";

TableCell.toString = () => ".nextui-table-cell";

export default TableCell;
