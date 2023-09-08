import {useCallback} from "react";
import {Spacer} from "@nextui-org/spacer";
import {forwardRef} from "@nextui-org/system";

import {UseTableProps, useTable} from "./use-table";
import TableRowGroup from "./table-row-group";
import TableHeaderRow from "./table-header-row";
import TableColumnHeader from "./table-column-header";
import TableSelectAllCheckbox from "./table-select-all-checkbox";
import TableBody from "./table-body";

export interface TableProps extends Omit<UseTableProps, "isSelectable" | "isMultiSelectable"> {}

const Table = forwardRef<"table", TableProps>((props, ref) => {
  const {
    BaseComponent,
    Component,
    collection,
    values,
    topContent,
    topContentPlacement,
    bottomContentPlacement,
    bottomContent,
    removeWrapper,
    getBaseProps,
    getWrapperProps,
    getTableProps,
  } = useTable({
    ...props,
    ref,
  });

  const Wrapper = useCallback(
    ({children}: {children: JSX.Element}) => {
      if (removeWrapper) {
        return children;
      }

      return <BaseComponent {...getWrapperProps()}>{children}</BaseComponent>;
    },
    [removeWrapper, getWrapperProps],
  );

  return (
    <div {...getBaseProps()}>
      {topContentPlacement === "outside" && topContent}
      <Wrapper>
        <>
          {topContentPlacement === "inside" && topContent}
          <Component {...getTableProps()}>
            <TableRowGroup classNames={values.classNames} slots={values.slots}>
              {collection.headerRows.map((headerRow) => (
                <TableHeaderRow
                  key={headerRow?.key}
                  classNames={values.classNames}
                  node={headerRow}
                  slots={values.slots}
                  state={values.state}
                >
                  {[...headerRow.childNodes].map((column) =>
                    column?.props?.isSelectionCell ? (
                      <TableSelectAllCheckbox
                        key={column?.key}
                        checkboxesProps={values.checkboxesProps}
                        classNames={values.classNames}
                        color={values.color}
                        disableAnimation={values.disableAnimation}
                        node={column}
                        selectionMode={values.selectionMode}
                        slots={values.slots}
                        state={values.state}
                      />
                    ) : (
                      <TableColumnHeader
                        key={column?.key}
                        classNames={values.classNames}
                        node={column}
                        slots={values.slots}
                        state={values.state}
                      />
                    ),
                  )}
                </TableHeaderRow>
              ))}
              <Spacer as="tr" tabIndex={-1} y={1} />
            </TableRowGroup>
            <TableBody
              checkboxesProps={values.checkboxesProps}
              classNames={values.classNames}
              collection={values.collection}
              color={values.color}
              disableAnimation={values.disableAnimation}
              isSelectable={values.isSelectable}
              selectionMode={values.selectionMode}
              slots={values.slots}
              state={values.state}
            />
          </Component>
          {bottomContentPlacement === "inside" && bottomContent}
        </>
      </Wrapper>
      {bottomContentPlacement === "outside" && bottomContent}
    </div>
  );
});

Table.displayName = "NextUI.Table";

export default Table;
