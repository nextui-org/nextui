import {forwardRef} from "@nextui-org/system";
import {Spacer} from "@nextui-org/spacer";
import {useCallback} from "react";

import {TableProvider} from "./table-context";
import {UseTableProps, useTable} from "./use-table";
import TableRowGroup from "./table-row-group";
import TableHeaderRow from "./table-header-row";
import TableColumnHeader from "./table-column-header";
import TableSelectAllCheckbox from "./table-select-all-checkbox";
import TableBody from "./table-body";

export interface TableProps
  extends Omit<UseTableProps, "ref" | "isSelectable" | "isMultiSelectable"> {}

const Table = forwardRef<TableProps, "table">((props, ref) => {
  const {
    BaseComponent,
    Component,
    collection,
    context,
    topContent,
    bottomContent,
    removeWrapper,
    getBaseProps,
    getTableProps,
  } = useTable({
    ref,
    ...props,
  });

  const BaseWrapper = useCallback(
    ({children}: {children: JSX.Element}) => {
      if (removeWrapper) {
        return children;
      }

      return <BaseComponent {...getBaseProps()}>{children}</BaseComponent>;
    },
    [removeWrapper, getBaseProps],
  );

  return (
    <TableProvider value={context}>
      <BaseWrapper>
        <>
          {topContent}
          <Component {...getTableProps()}>
            <TableRowGroup>
              {collection.headerRows.map((headerRow) => (
                <TableHeaderRow key={headerRow?.key} node={headerRow}>
                  {[...headerRow.childNodes].map((column) =>
                    column?.props?.isSelectionCell ? (
                      <TableSelectAllCheckbox key={column?.key} node={column} />
                    ) : (
                      <TableColumnHeader key={column?.key} node={column} />
                    ),
                  )}
                </TableHeaderRow>
              ))}
              <Spacer as="tr" y={0.4} />
            </TableRowGroup>
            <TableBody />
          </Component>
          {bottomContent}
        </>
      </BaseWrapper>
    </TableProvider>
  );
});

Table.displayName = "NextUI.Table";

export default Table;
