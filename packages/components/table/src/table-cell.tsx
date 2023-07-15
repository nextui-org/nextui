import type {GridNode} from "@react-types/grid";

import {Key, useMemo} from "react";
import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useTableCell} from "@react-aria/table";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";

import {ValuesType} from "./use-table";

// @internal
export interface TableCellProps<T = object> extends HTMLNextUIProps<"td"> {
  /**
   * The key of the table row.
   */
  rowKey: Key;
  /**
   * The table cell.
   */
  node: GridNode<T>;
  slots: ValuesType["slots"];
  state: ValuesType["state"];
  classNames?: ValuesType["classNames"];
}

const TableCell = forwardRef<TableCellProps, "td">((props, ref) => {
  const {as, className, node, rowKey, slots, state, classNames, ...otherProps} = props;

  const Component = as || "td";
  const domRef = useDOMRef(ref);

  const {gridCellProps} = useTableCell({node}, state, domRef);

  const tdStyles = clsx(classNames?.td, className, node.props?.className);
  const {isFocusVisible, focusProps} = useFocusRing();
  const isRowSelected = state.selectionManager.isSelected(rowKey);

  const cell = useMemo(() => {
    const cellType = typeof node.rendered;

    return cellType !== "object" && cellType !== "function" ? (
      <span>{node.rendered}</span>
    ) : (
      node.rendered
    );
  }, [node.rendered]);

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
