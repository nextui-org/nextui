import type {GridNode} from "@react-types/grid";
import type {TableRowProps as BaseTableRowProps} from "./base/table-row";

import {forwardRef} from "@nextui-org/system";
import {useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useTableRow} from "@react-aria/table";
import {mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {useHover} from "@react-aria/interactions";
import {useMemo} from "react";

import {ValuesType} from "./use-table";

export interface TableRowProps<T = object> extends Omit<BaseTableRowProps, "children"> {
  node: GridNode<T>;
  slots: ValuesType["slots"];
  state: ValuesType["state"];
  isSelectable?: ValuesType["isSelectable"];
  classNames?: ValuesType["classNames"] & {
    trStriped?: string;
    trSelected?: string;
    trStripedSelected?: string;
  };
}

const TableRow = forwardRef<"tr", TableRowProps>((props, ref) => {
  const {as, className, children, node, slots, state, isSelectable, classNames, ...otherProps} =
    props;

  const Component = as || (props?.href ? "a" : "tr");
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const {rowProps} = useTableRow({node}, state, domRef);
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

  const trStyles = slots.tr?.({
    class: clsx(classNames?.tr, className, node.props?.className, {
      [classNames?.trStriped ?? ""]: isOdd,
      [classNames?.trSelected ?? ""]: isSelected,
      [classNames?.trStripedSelected ?? ""]: isOdd && isSelected,
    }),
  });

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
        focusProps,
        isSelectable ? hoverProps : {},
        filterDOMProps(node.props, {
          enabled: shouldFilterDOMProps,
        }),
        otherProps,
      )}
      className={trStyles}
    >
      {children}
    </Component>
  );
});

TableRow.displayName = "NextUI.TableRow";

export default TableRow;
