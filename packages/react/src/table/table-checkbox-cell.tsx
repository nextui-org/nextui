import React, {useRef, useImperativeHandle} from "react";
import {useTableCell, useTableSelectionCheckbox} from "@react-aria/table";
import {GridNode} from "@react-types/grid";
import {TableState} from "@react-stately/table";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";

import {CSS} from "../theme/stitches.config";
import Checkbox, {CheckboxProps} from "../checkbox";
import clsx from "../utils/clsx";

import {StyledTableCell, TableVariantsProps} from "./table.styles";

type CellProps<T> = GridNode<T> & {parentKey?: React.Key};

interface Props<T> {
  cell: CellProps<T>;
  state: TableState<T>;
  color?: TableVariantsProps["color"];
  animated?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableCheckboxCellProps<T = unknown> = Props<T> & NativeAttrs & {css?: CSS};

const TableCheckboxCell = React.forwardRef<HTMLTableCellElement, TableCheckboxCellProps>(
  ({cell, state, color, animated, ...props}, ref: React.Ref<HTMLTableCellElement | null>) => {
    const tableCellRef = useRef<HTMLTableCellElement | null>(null);

    useImperativeHandle(ref, () => tableCellRef?.current);

    const {
      gridCellProps,
    }: {
      gridCellProps: Omit<React.HTMLAttributes<unknown>, keyof TableCheckboxCellProps<unknown>>;
    } = useTableCell({node: cell}, state, tableCellRef);

    const {checkboxProps} = useTableSelectionCheckbox({key: cell?.parentKey || cell.key}, state);
    const {isFocusVisible, focusProps} = useFocusRing();

    return (
      <StyledTableCell
        ref={tableCellRef}
        className={clsx("nextui-table-checkbox-cell", props.className)}
        isFocusVisible={isFocusVisible}
        {...mergeProps(gridCellProps, focusProps, props)}
      >
        <Checkbox
          {...checkboxProps}
          color={color as CheckboxProps["color"]}
          css={{display: "inherit"}}
          disableAnimation={!animated}
        />
      </StyledTableCell>
    );
  },
);

TableCheckboxCell.displayName = "NextUI.TableCheckboxCell";

TableCheckboxCell.toString = () => ".nextui-table-checkbox-cell";

export default TableCheckboxCell;
