import type {GridNode} from "@react-types/grid";
import type {Key} from "react";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useTableCell, useTableSelectionCheckbox} from "@react-aria/table";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {Checkbox} from "@nextui-org/checkbox";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {useTableContext} from "./table-context";

export interface TableCheckboxCellProps<T = object> extends HTMLNextUIProps<"td"> {
  /**
   * The key of the table row.
   */
  rowKey: Key;
  /**
   * The table cell.
   */
  node: GridNode<T>;
}

const TableCheckboxCell = forwardRef<TableCheckboxCellProps, "td">((props, ref) => {
  const {as, className, node, rowKey, ...otherProps} = props;

  const Component = as || "td";
  const domRef = useDOMRef(ref);

  const {slots, state, color, disableAnimation, checkboxesProps, selectionMode, classNames} =
    useTableContext();

  const {gridCellProps} = useTableCell({node}, state, domRef);
  const {isFocusVisible, focusProps} = useFocusRing();

  const {checkboxProps} = useTableSelectionCheckbox({key: node?.parentKey || node.key}, state);

  const tdStyles = clsx(classNames?.td, className, node.props?.className);

  const isSingleSelectionMode = selectionMode === "single";

  const {onChange, ...otherCheckboxProps} = checkboxProps;
  const isRowSelected = state.selectionManager.isSelected(rowKey);

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
      {isSingleSelectionMode ? (
        <VisuallyHidden>{checkboxProps["aria-label"]}</VisuallyHidden>
      ) : (
        <Checkbox
          color={color}
          disableAnimation={disableAnimation}
          onValueChange={onChange}
          {...mergeProps(checkboxesProps, otherCheckboxProps)}
        />
      )}
    </Component>
  );
});

TableCheckboxCell.displayName = "NextUI.TableCheckboxCell";

export default TableCheckboxCell;
