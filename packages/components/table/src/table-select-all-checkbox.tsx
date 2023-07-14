import type {GridNode} from "@react-types/grid";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useTableColumnHeader, useTableSelectAllCheckbox} from "@react-aria/table";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {Checkbox} from "@nextui-org/checkbox";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {useTableContext} from "./table-context";

export interface TableSelectAllCheckboxProps<T = object> extends HTMLNextUIProps<"th"> {
  /**
   * The table column.
   */
  node: GridNode<T>;
}

const TableSelectAllCheckbox = forwardRef<TableSelectAllCheckboxProps, "th">((props, ref) => {
  const {as, className, node, ...otherProps} = props;

  const Component = as || "th";
  const domRef = useDOMRef(ref);

  const {slots, state, selectionMode, color, disableAnimation, classNames} = useTableContext();

  const {columnHeaderProps} = useTableColumnHeader({node}, state, domRef);
  const {isFocusVisible, focusProps} = useFocusRing();

  const {checkboxProps} = useTableSelectAllCheckbox(state);

  const thStyles = clsx(classNames?.th, className, node.props?.className);

  const isSingleSelectionMode = selectionMode === "single";

  const {onChange, ...otherCheckboxProps} = checkboxProps;

  return (
    <Component
      ref={domRef}
      data-focus-visible={dataAttr(isFocusVisible)}
      {...mergeProps(
        columnHeaderProps,
        focusProps,
        filterDOMProps(node.props, {labelable: true}),
        filterDOMProps(otherProps, {labelable: true}),
      )}
      className={slots.th?.({class: thStyles})}
    >
      {isSingleSelectionMode ? (
        <VisuallyHidden>{checkboxProps["aria-label"]}</VisuallyHidden>
      ) : (
        <Checkbox
          color={color}
          disableAnimation={disableAnimation}
          onValueChange={onChange}
          {...otherCheckboxProps}
        />
      )}
    </Component>
  );
});

TableSelectAllCheckbox.displayName = "NextUI.TableSelectAllCheckbox";

export default TableSelectAllCheckbox;
