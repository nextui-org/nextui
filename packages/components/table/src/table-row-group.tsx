import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx} from "@nextui-org/shared-utils";
import {useTableRowGroup} from "@react-aria/table";
import {mergeProps} from "@react-aria/utils";

import {useTableContext} from "./table-context";

const TableRowGroup = forwardRef<HTMLNextUIProps, "thead">((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "thead";
  const domRef = useDOMRef(ref);

  const {slots, classNames} = useTableContext();

  const {rowGroupProps} = useTableRowGroup();

  const theadStyles = clsx(classNames?.thead, className);

  return (
    <Component
      ref={domRef}
      className={slots.thead?.({class: theadStyles})}
      {...mergeProps(rowGroupProps, otherProps)}
    >
      {children}
    </Component>
  );
});

TableRowGroup.displayName = "NextUI.TableRowGroup";

export default TableRowGroup;
