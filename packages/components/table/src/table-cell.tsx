import type {GridNode} from "@react-types/grid";

import {Key} from "react";
import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useTableCell} from "@react-aria/table";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";

import {useTableContext} from "./table-context";

export interface TableCellProps<T = object> extends HTMLNextUIProps<"td"> {
  /**
   * The key of the table row.
   */
  rowKey: Key;
  /**
   * The table cell.
   */
  node: GridNode<T>;
}

const TableCell = forwardRef<TableCellProps, "td">((props, ref) => {
  const {as, className, node, rowKey, ...otherProps} = props;

  const Component = as || "td";
  const domRef = useDOMRef(ref);

  const {slots, state, classNames} = useTableContext();

  const {gridCellProps} = useTableCell({node}, state, domRef);

  const tdStyles = clsx(classNames?.td, className, node.props?.className);
  const {isFocusVisible, focusProps} = useFocusRing();
  const isRowSelected = state.selectionManager.isSelected(rowKey);

  const cell = typeof node.rendered === "string" ? <span>{node.rendered}</span> : node.rendered;

  return (
    <Component
      ref={domRef}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-selected={dataAttr(isRowSelected)}
      {...mergeProps(
        gridCellProps,
        focusProps,
        filterDOMProps(node.props, {labelable: true}),
        otherProps,
      )}
      className={slots.td?.({class: tdStyles})}
    >
      {cell}
    </Component>
  );
});

TableCell.displayName = "NextUI.TableCell";

export default TableCell;
