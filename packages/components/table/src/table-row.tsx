import type {GridNode} from "@react-types/grid";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useTableRow} from "@react-aria/table";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {useHover} from "@react-aria/interactions";
import {useMemo} from "react";

import {useTableContext} from "./table-context";

export interface TableRowProps<T = object> extends HTMLNextUIProps<"tr"> {
  /**
   * The table row.
   */
  node: GridNode<T>;
}

const TableRow = forwardRef<TableRowProps, "tr">((props, ref) => {
  const {as, className, children, node, ...otherProps} = props;

  const Component = as || "tr";

  const domRef = useDOMRef(ref);

  const {slots, state, isSelectable, classNames} = useTableContext();

  const {rowProps} = useTableRow({node}, state, domRef);

  const trStyles = clsx(classNames?.thead, className, node.props?.className);

  const {isFocusVisible, focusProps} = useFocusRing();

  const isDisabled = state.disabledKeys.has(node.key);
  const isSelected = state.selectionManager.isSelected(node.key);

  const {isHovered, hoverProps} = useHover({isDisabled});

  const {isFirst, isLast, isMiddle, isOdd} = useMemo(() => {
    const isFirst = node.key === state.collection.getFirstKey();
    const isLast = node.key === state.collection.getLastKey();
    const isMiddle = !isFirst && !isLast;
    const isOdd = node?.index ? (node.index + 1) % 2 === 0 : false;

    return {
      isFirst,
      isLast,
      isMiddle,
      isOdd,
    };
  }, [node, state.collection]);

  return (
    <Component
      ref={domRef}
      data-disabled={dataAttr(isDisabled)}
      data-first={dataAttr(isFirst)}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-hover={dataAttr(isHovered)}
      data-last={dataAttr(isLast)}
      data-middle={dataAttr(isMiddle)}
      data-odd={dataAttr(isOdd)}
      data-selected={dataAttr(isSelected)}
      {...mergeProps(
        rowProps,
        isSelectable ? {...hoverProps, ...focusProps} : {},
        filterDOMProps(node.props, {labelable: true}),
        otherProps,
      )}
      className={slots.tr?.({class: trStyles})}
    >
      {children}
    </Component>
  );
});

TableRow.displayName = "NextUI.TableRow";

export default TableRow;
