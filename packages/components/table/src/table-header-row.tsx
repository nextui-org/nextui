import type {GridNode} from "@react-types/grid";

import {forwardRef, HTMLHeroUIProps} from "@heroui/system";
import {useDOMRef, filterDOMProps} from "@heroui/react-utils";
import {clsx} from "@heroui/shared-utils";
import {useTableHeaderRow} from "@react-aria/table";
import {mergeProps} from "@react-aria/utils";

import {ValuesType} from "./use-table";

// @internal
export interface TableHeaderRowProps<T = object> extends HTMLHeroUIProps<"tr"> {
  /**
   * The table node to render.
   */
  node: GridNode<T>;
  slots: ValuesType["slots"];
  state: ValuesType["state"];
  classNames?: ValuesType["classNames"];
}

const TableHeaderRow = forwardRef<"tr", TableHeaderRowProps>((props, ref) => {
  const {as, className, children, node, slots, classNames, state, ...otherProps} = props;

  const Component = as || "tr";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);

  const {rowProps} = useTableHeaderRow({node}, state, domRef);

  const trStyles = clsx(classNames?.tr, className, node.props?.className);

  return (
    <Component
      ref={domRef}
      {...mergeProps(
        rowProps,
        filterDOMProps(node.props, {
          enabled: shouldFilterDOMProps,
        }),
        otherProps,
      )}
      className={slots.tr?.({class: trStyles})}
    >
      {children}
    </Component>
  );
});

TableHeaderRow.displayName = "HeroUI.TableHeaderRow";

export default TableHeaderRow;
