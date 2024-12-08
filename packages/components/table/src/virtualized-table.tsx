import {useCallback, useRef} from "react";
import {Spacer} from "@nextui-org/spacer";
import {forwardRef} from "@nextui-org/system";
import {useVirtualizer} from "@tanstack/react-virtual";

import {UseTableProps, useTable} from "./use-table";
import TableRowGroup from "./table-row-group";
import TableHeaderRow from "./table-header-row";
import TableColumnHeader from "./table-column-header";
import TableSelectAllCheckbox from "./table-select-all-checkbox";
import VirtualizedTableBody from "./virtualized-table-body"; // Import the virtualized table body component

export interface TableProps<T = object>
  extends Omit<UseTableProps<T>, "isSelectable" | "isMultiSelectable"> {
  isVirtualized?: boolean;
  rowHeight?: number;
  maxTableHeight?: number;
}

const VirtualizedTable = forwardRef<"table", TableProps>((props, ref) => {
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

  const {
    rowHeight = 40, // Default row height
    maxTableHeight = 600, // Default max body height
  } = props;

  const Wrapper = useCallback(
    ({children}: {children: JSX.Element}) => {
      if (removeWrapper) {
        return children;
      }

      return <BaseComponent {...getWrapperProps()}>{children}</BaseComponent>;
    },
    [removeWrapper, getWrapperProps],
  );

  const items = [...collection.body.childNodes];

  const count = items.length;

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  return (
    <div {...getBaseProps()}>
      <div
        ref={parentRef}
        style={{overflow: "auto", height: maxTableHeight, display: "block", width: "100%"}}
      >
        {topContentPlacement === "outside" && topContent}
        <div
          className="p-4 z-0 relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full"
          style={{height: `${rowVirtualizer.getTotalSize()}px`}}
        >
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
              <VirtualizedTableBody
                checkboxesProps={values.checkboxesProps}
                classNames={values.classNames}
                collection={values.collection}
                color={values.color}
                disableAnimation={values.disableAnimation}
                isSelectable={values.isSelectable}
                rowVirtualizer={rowVirtualizer}
                selectionMode={values.selectionMode}
                slots={values.slots}
                state={values.state}
              />
            </Component>
            {bottomContentPlacement === "inside" && bottomContent}
          </>
        </div>
        {bottomContentPlacement === "outside" && bottomContent}
      </div>
    </div>
  );
});

VirtualizedTable.displayName = "NextUI.VirtualizedTable";

export default VirtualizedTable;
