import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useTableRowGroup} from "@react-aria/table";
import {filterDOMProps} from "@nextui-org/react-utils";
import {mergeProps} from "@react-aria/utils";
import {useMemo} from "react";

import TableRow from "./table-row";
import TableCell from "./table-cell";
import TableCheckboxCell from "./table-checkbox-cell";
import {ValuesType} from "./use-table";

// @internal
export interface TableBodyProps extends HTMLNextUIProps<"tbody"> {
  slots: ValuesType["slots"];
  collection: ValuesType["collection"];
  state: ValuesType["state"];
  isSelectable: ValuesType["isSelectable"];
  color: ValuesType["color"];
  disableAnimation: ValuesType["disableAnimation"];
  checkboxesProps: ValuesType["checkboxesProps"];
  selectionMode: ValuesType["selectionMode"];
  classNames?: ValuesType["classNames"];
}

const TableBody = forwardRef<TableBodyProps, "tbody">((props, ref) => {
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
    ...otherProps
  } = props;

  const Component = as || "tbody";
  const domRef = useDOMRef(ref);

  const {rowGroupProps} = useTableRowGroup();

  const tbodyStyles = clsx(classNames?.tbody, className);
  const bodyProps = collection?.body.props;

  const isLoading =
    bodyProps?.isLoading ||
    bodyProps?.loadingState === "loading" ||
    bodyProps?.loadingState === "loadingMore";

  const renderRows = useMemo(() => {
    return [...collection.body.childNodes].map((row) => (
      <TableRow
        key={row.key}
        classNames={classNames}
        isSelectable={isSelectable}
        node={row}
        slots={slots}
        state={state}
      >
        {[...row.childNodes].map((cell) =>
          cell.props.isSelectionCell ? (
            <TableCheckboxCell
              key={cell.key}
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
              key={cell.key}
              classNames={classNames}
              node={cell}
              rowKey={row.key}
              slots={slots}
              state={state}
            />
          ),
        )}
      </TableRow>
    ));
  }, [collection.body.childNodes, classNames, isSelectable, slots, state]);

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
          {bodyProps.emptyContent}
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
      </tr>
    );
  }

  return (
    <Component
      ref={domRef}
      {...mergeProps(rowGroupProps, filterDOMProps(bodyProps), otherProps)}
      className={slots.tbody?.({class: tbodyStyles})}
      data-empty={dataAttr(collection.size === 0)}
      data-loading={dataAttr(isLoading)}
    >
      {renderRows}
      {loadingContent}
      {emptyContent}
    </Component>
  );
});

TableBody.displayName = "NextUI.TableBody";

export default TableBody;
