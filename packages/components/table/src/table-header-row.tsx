import type {GridNode} from "@react-types/grid";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";
import {useTableHeaderRow} from "@react-aria/table";
import {filterDOMProps, mergeProps} from "@react-aria/utils";

import {useTableContext} from "./table-context";

export interface TableHeaderRowProps<T = object> extends HTMLNextUIProps<"tr"> {
  /**
   * The table node to render.
   */
  node: GridNode<T>;
}

const TableHeaderRow = forwardRef<TableHeaderRowProps, "tr">((props, ref) => {
  const {as, className, children, node, ...otherProps} = props;

  const Component = as || "tr";
  const domRef = useDOMRef(ref);

  const {slots, state, classNames} = useTableContext();

  const {rowProps} = useTableHeaderRow({node}, state, domRef);

  const trStyles = clsx(classNames?.tr, className, node.props?.className);

  return (
    <Component
      ref={domRef}
      {...mergeProps(rowProps, filterDOMProps(node.props, {labelable: true}), otherProps)}
      className={slots.tr?.({class: trStyles})}
    >
      {children}
    </Component>
  );
});

TableHeaderRow.displayName = "NextUI.TableHeaderRow";

export default TableHeaderRow;
