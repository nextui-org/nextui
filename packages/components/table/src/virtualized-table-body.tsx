import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useTableRowGroup} from "@react-aria/table";
import {filterDOMProps} from "@nextui-org/react-utils";
import {mergeProps} from "@react-aria/utils";
import {useRef} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";

import TableRow from "./table-row";
import TableCell from "./table-cell";
import TableCheckboxCell from "./table-checkbox-cell";
import {ValuesType} from "./use-table";

// @internal
export interface VirtualizedTableBodyProps extends HTMLNextUIProps<"tbody"> {
  slots: ValuesType["slots"];
  collection: ValuesType["collection"];
  state: ValuesType["state"];
  isSelectable: ValuesType["isSelectable"];
  color: ValuesType["color"];
  disableAnimation: ValuesType["disableAnimation"];
  checkboxesProps: ValuesType["checkboxesProps"];
  selectionMode: ValuesType["selectionMode"];
  classNames?: ValuesType["classNames"];
  rowHeight: number;
  maxBodyHeight: number;
}

const VirtualizedTableBody = forwardRef<"tbody", VirtualizedTableBodyProps>((props, ref) => {
  const {
    as,
    className,
    slots,
    state,
    collection,
    isSelectable,
    color,
    disableAnimation,
    checkboxesProps,
    selectionMode,
    classNames,
    rowHeight,
    maxBodyHeight,
    ...otherProps
  } = props;

  const Component = as || "tbody";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const {rowGroupProps} = useTableRowGroup();

  const tbodyStyles = clsx(classNames?.tbody, className);
  const bodyProps = collection?.body.props;

  const isLoading =
    bodyProps?.isLoading ||
    bodyProps?.loadingState === "loading" ||
    bodyProps?.loadingState === "loadingMore";

  const parentRef = useRef<HTMLDivElement>(null);

  // Convert childNodes to an array
  const items = [...collection.body.childNodes];

  // Get the count
  const count = items.length;

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 5, // Adjust as needed
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  let emptyContent;
  let loadingContent;

  if (collection.size === 0 && bodyProps.emptyContent) {
    emptyContent = (
      <tr role="row">
        <td
          className={slots?.emptyWrapper({class: classNames?.emptyWrapper})}
          colSpan={collection.columnCount}
          role="gridcell"
        >
          {!isLoading && bodyProps.emptyContent}
        </td>
      </tr>
    );
  }

  if (isLoading && bodyProps.loadingContent) {
    loadingContent = (
      <tr role="row">
        <td
          className={slots?.loadingWrapper({class: classNames?.loadingWrapper})}
          colSpan={collection.columnCount}
          role="gridcell"
        >
          {bodyProps.loadingContent}
        </td>
        {!emptyContent && collection.size === 0 ? (
          <td className={slots?.emptyWrapper({class: classNames?.emptyWrapper})} />
        ) : null}
      </tr>
    );
  }

  return (
    <Component
      ref={domRef}
      {...mergeProps(
        rowGroupProps,
        filterDOMProps(bodyProps, {
          enabled: shouldFilterDOMProps,
        }),
        otherProps,
      )}
      className={slots.tbody?.({class: tbodyStyles})}
      data-empty={dataAttr(collection.size === 0)}
      data-loading={dataAttr(isLoading)}
    >
      <tr>
        <td colSpan={collection.columnCount} style={{padding: 0}}>
          <div
            ref={parentRef}
            style={{
              maxHeight: maxBodyHeight,
              overflow: "auto",
              position: "relative",
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {virtualItems.map((virtualRow) => {
                const row = items[virtualRow.index];

                if (!row) {
                  return null;
                }

                return (
                  <div
                    key={virtualRow.index} // Use index as key
                    ref={rowVirtualizer.measureElement}
                    data-index={virtualRow.index}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <TableRow
                      key={String(row.key)} // Ensure key is a string or number
                      classNames={classNames}
                      isSelectable={isSelectable}
                      node={row}
                      slots={slots}
                      state={state}
                    >
                      {[...row.childNodes].map((cell) =>
                        cell.props.isSelectionCell ? (
                          <TableCheckboxCell
                            key={String(cell.key)} // Ensure key is a string or number
                            checkboxesProps={checkboxesProps}
                            classNames={classNames}
                            color={color}
                            disableAnimation={disableAnimation}
                            node={cell}
                            rowKey={row.key}
                            selectionMode={selectionMode}
                            slots={slots}
                            state={state}
                          />
                        ) : (
                          <TableCell
                            key={String(cell.key)} // Ensure key is a string or number
                            classNames={classNames}
                            node={cell}
                            rowKey={row.key}
                            slots={slots}
                            state={state}
                          />
                        ),
                      )}
                    </TableRow>
                  </div>
                );
              })}
            </div>
          </div>
        </td>
      </tr>
      {loadingContent}
      {emptyContent}
    </Component>
  );
});

VirtualizedTableBody.displayName = "NextUI.VirtualizedTableBody";

export default VirtualizedTableBody;
