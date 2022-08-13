import React, {useRef, useImperativeHandle} from "react";
import {useTableColumnHeader, useTableSelectAllCheckbox} from "@react-aria/table";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {GridNode} from "@react-types/grid";
import {TableState} from "@react-stately/table";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";

import {CSS} from "../theme/stitches.config";
import Checkbox, {CheckboxProps} from "../checkbox";
import clsx from "../utils/clsx";

import {StyledTableHeaderCell, TableVariantsProps} from "./table.styles";

interface Props<T> {
  column: GridNode<T>;
  state: TableState<T>;
  color?: TableVariantsProps["color"];
  animated?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableSelectAllCheckboxProps<T = unknown> = Props<T> & NativeAttrs & {css?: CSS};

const TableSelectAllCheckbox = React.forwardRef<HTMLTableCellElement, TableSelectAllCheckboxProps>(
  ({column, state, color, animated, ...props}, ref: React.Ref<HTMLTableCellElement | null>) => {
    const tableCellRef = useRef<HTMLTableCellElement | null>(null);

    useImperativeHandle(ref, () => tableCellRef?.current);

    const isSingleSelectionMode = state.selectionManager.selectionMode === "single";

    const {
      columnHeaderProps,
    }: {
      columnHeaderProps: Omit<
        React.HTMLAttributes<unknown>,
        keyof TableSelectAllCheckboxProps<unknown>
      >;
    } = useTableColumnHeader({node: column}, state, tableCellRef);

    const {checkboxProps} = useTableSelectAllCheckbox(state);
    const {isFocusVisible, focusProps} = useFocusRing();

    return (
      <StyledTableHeaderCell
        ref={tableCellRef}
        className={clsx("nextui-table-select-all-checkbox", props.className)}
        isFocusVisible={isFocusVisible}
        {...mergeProps(columnHeaderProps, focusProps, props)}
      >
        {isSingleSelectionMode ? (
          <VisuallyHidden>{checkboxProps["aria-label"]}</VisuallyHidden>
        ) : (
          <Checkbox
            {...checkboxProps}
            color={color as CheckboxProps["color"]}
            css={{
              display: "inherit",
              $$checkboxBorderColor: "$colors$accents3",
            }}
            disableAnimation={!animated}
          />
        )}
      </StyledTableHeaderCell>
    );
  },
);

TableSelectAllCheckbox.displayName = "NextUI.TableSelectAllCheckbox";

TableSelectAllCheckbox.toString = () => ".nextui-table-select-all-checkbox";

export default TableSelectAllCheckbox;
