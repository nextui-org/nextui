import type {GridNode} from "@react-types/grid";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";
import {useTableColumnHeader} from "@react-aria/table";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {useTableContext} from "./table-context";

export interface TableColumnHeaderProps<T = object> extends HTMLNextUIProps<"th"> {
  /**
   * The table node to render.
   */
  node: GridNode<T>;
}

const TableColumnHeader = forwardRef<TableColumnHeaderProps, "th">((props, ref) => {
  const {as, className, node, ...otherProps} = props;

  const Component = as || "th";
  const domRef = useDOMRef(ref);

  const {slots, state, classNames} = useTableContext();

  const {columnHeaderProps} = useTableColumnHeader({node}, state, domRef);

  const thStyles = clsx(classNames?.th, className, node.props?.className);

  const {isFocusVisible, focusProps} = useFocusRing();
  const {hideHeader, ...columnProps} = node.props;

  let arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";

  return (
    <Component
      ref={domRef}
      colSpan={node.colspan}
      data-focus-visible={isFocusVisible}
      {...mergeProps(
        columnHeaderProps,
        focusProps,
        filterDOMProps(columnProps, {labelable: true}),
        otherProps,
      )}
      className={slots.th?.({class: thStyles})}
    >
      {hideHeader ? <VisuallyHidden>{node.rendered}</VisuallyHidden> : node.rendered}
      {columnProps.allowsSorting && (
        <span
          aria-hidden="true"
          style={{
            padding: "0 2px",
            visibility: state.sortDescriptor?.column === node.key ? "visible" : "hidden",
          }}
        >
          {arrowIcon}
        </span>
        // <TableSortIcon
        //   ascending={state.sortDescriptor?.direction === "ascending"}
        //   css={{
        //     position: "absolute",
        //     m: "0 $2",
        //     bottom: `calc(50% - ${ICON_SIZE / 2}px)`,
        //   }}
        //   visible={state.sortDescriptor?.column === column.key}
        // />
      )}
    </Component>
  );
});

TableColumnHeader.displayName = "NextUI.TableColumnHeader";

export default TableColumnHeader;
