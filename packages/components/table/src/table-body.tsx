import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";
import {useMemo} from "react";

import TableRow from "./table-row";
import TableCell from "./table-cell";
import TableRowGroup from "./table-row-group";
import TableCheckboxCell from "./table-checkbox-cell";
import {useTableContext} from "./table-context";

const TableBody = forwardRef<HTMLNextUIProps, "tbody">((props, ref) => {
  const {as: asProp, className, ...otherProps} = props;

  const as = asProp || "tbody";
  const domRef = useDOMRef(ref);

  const {slots, collection, classNames} = useTableContext();

  const tbodyStyles = clsx(classNames?.tbody, className);

  const renderRows = useMemo(() => {
    return [...collection.body.childNodes].map((row) => (
      <TableRow key={row.key} node={row}>
        {[...row.childNodes].map((cell) =>
          cell.props.isSelectionCell ? (
            <TableCheckboxCell key={cell.key} node={cell} rowKey={row.key} />
          ) : (
            <TableCell key={cell.key} node={cell} rowKey={row.key} />
          ),
        )}
      </TableRow>
    ));
  }, [collection.body.childNodes]);

  return (
    <TableRowGroup
      ref={domRef}
      as={as}
      {...otherProps}
      className={slots.tbody?.({class: tbodyStyles})}
    >
      {renderRows}
    </TableRowGroup>
  );
});

TableBody.displayName = "NextUI.TableBody";

export default TableBody;
