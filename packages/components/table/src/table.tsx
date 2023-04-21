import {forwardRef} from "@nextui-org/system";

import {TableProvider} from "./table-context";
import {UseTableProps, useTable} from "./use-table";

export interface TableProps extends Omit<UseTableProps, "ref"> {}

const Table = forwardRef<TableProps, "div">((props, ref) => {
  const {Component, children, context, getBaseProps, getTableProps} = useTable({ref, ...props});

  return (
    <TableProvider value={context}>
      <div {...getBaseProps()}>
        <Component {...getTableProps()}>{children}</Component>
      </div>
    </TableProvider>
  );
});

Table.displayName = "NextUI.Table";

export default Table;
