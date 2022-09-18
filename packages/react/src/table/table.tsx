import React, {useMemo, RefAttributes, PropsWithoutRef} from "react";
import {useTable} from "@react-aria/table";
import {useTableState, TableStateProps} from "@react-stately/table";
import {SelectionMode, SelectionBehavior, CollectionChildren} from "@react-types/shared";
import {mergeProps} from "@react-aria/utils";

import {Spacer} from "../index";
import {CSS} from "../theme/stitches.config";
import {pickSingleChild} from "../utils/collections";
import withDefaults from "../utils/with-defaults";
import clsx from "../utils/clsx";
import {useDOMRef} from "../utils/dom";

import TableRowGroup from "./table-row-group";
import TableColumnHeader from "./table-column-header";
import TableHeaderRow from "./table-header-row";
import TableSelectAllCheckbox from "./table-select-all-checkbox";
import {
  TableColumn as TableColumnBase,
  TableCell as TableCellBase,
  TableRow as TableRowBase,
  TableBody as TableBodyBase,
  TableHeader as TableHeaderBase,
} from "./base";
import TablePagination from "./table-pagination";
import TableFooter from "./table-footer";
import TableBody from "./table-body";
import {
  StyledTable,
  StyledTableContainer,
  TableVariantsProps,
  TableContainerVariantsProps,
} from "./table.styles";
import TableContext, {TableConfig} from "./table-context";
import {isInfinityScroll, hasPaginationChild} from "./utils";

interface Props<T> extends TableStateProps<T> {
  selectionMode?: SelectionMode;
  selectionBehavior?: SelectionBehavior;
  animated?: boolean;
  hideLoading?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.TableHTMLAttributes<unknown>, keyof Props<object>>;

export type TableProps<T = object> = Props<T> &
  NativeAttrs &
  Omit<TableVariantsProps, "isMultiple" | "shadow" | "hasPagination"> &
  TableContainerVariantsProps & {css?: CSS; containerCss?: CSS};

const defaultProps = {
  animated: true,
  hideLoading: false,
  selectionMode: "none",
  selectionBehavior: "toggle",
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (tableProps, ref: React.Ref<HTMLTableElement | null>) => {
    const {
      css,
      selectionMode,
      selectionBehavior,
      hideLoading,
      children,
      shadow,
      color,
      animated,
      borderWeight,
      bordered,
      hoverable,
      sticked,
      containerCss,
      className,
      ...otherProps
    } = tableProps;

    const [withoutPaginationChildren, paginationChildren] = pickSingleChild<
      CollectionChildren<any>
    >(children, TablePagination);

    const {hasPagination, rowsPerPage} = hasPaginationChild(children, TablePagination);

    const state = useTableState({
      ...tableProps,
      children: withoutPaginationChildren,
      showSelectionCheckboxes:
        tableProps.showSelectionCheckboxes !== undefined
          ? tableProps.showSelectionCheckboxes
          : selectionMode === "multiple" && selectionBehavior !== "replace",
    });

    const domRef = useDOMRef<HTMLTableElement>(ref);

    const {collection} = state;
    const {
      gridProps,
    }: {
      gridProps: Omit<React.HTMLAttributes<unknown>, keyof TableProps<unknown>>;
    } = useTable(tableProps, state, domRef);

    const initialValues = React.useMemo<Partial<TableConfig>>(() => {
      return {
        collection,
        color,
        animated,
        rowsPerPage,
      };
    }, [collection, animated, color, rowsPerPage]);

    const isHoverable = useMemo(
      () => !!(selectionMode !== "none" || hoverable),
      [selectionMode, hoverable],
    );

    return (
      <TableContext.Provider defaultValues={initialValues}>
        <StyledTableContainer
          borderWeight={borderWeight}
          bordered={bordered}
          className="nextui-table-container"
          css={{...(containerCss as any)}}
          shadow={shadow}
        >
          <StyledTable
            ref={domRef}
            animated={animated}
            className={clsx("nextui-table", className)}
            color={color}
            css={css}
            hasPagination={hasPagination}
            hoverable={isHoverable}
            isMultiple={selectionMode === "multiple"}
            shadow={shadow}
            {...mergeProps(gridProps, otherProps)}
          >
            <TableRowGroup as="thead" isFixed={isInfinityScroll(collection)}>
              {collection.headerRows.map((headerRow) => (
                <TableHeaderRow key={headerRow?.key} item={headerRow} state={state}>
                  {[...headerRow.childNodes].map((column) =>
                    column?.props?.isSelectionCell ? (
                      <TableSelectAllCheckbox
                        key={column?.key}
                        animated={animated}
                        color={color}
                        column={column}
                        state={state}
                      />
                    ) : (
                      <TableColumnHeader
                        key={column?.key}
                        animated={animated}
                        column={column}
                        state={state}
                      />
                    ),
                  )}
                </TableHeaderRow>
              ))}
              {!sticked && <Spacer as="tr" className="nextui-table-hidden-row" y={0.4} />}
            </TableRowGroup>
            <TableBody
              animated={animated}
              collection={collection}
              color={color}
              hasPagination={hasPagination}
              hideLoading={hideLoading}
              isStatic={!isHoverable}
              state={state}
            />

            {hasPagination && (
              <TableFooter>
                <Spacer as="tr" className="nextui-table-hidden-row" y={0.6} />
                <tr role="row">
                  <th colSpan={collection.columnCount} role="columnheader" tabIndex={-1}>
                    {paginationChildren}
                  </th>
                </tr>
              </TableFooter>
            )}
          </StyledTable>
        </StyledTableContainer>
      </TableContext.Provider>
    );
  },
);

type TableComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Cell: typeof TableCellBase;
  Column: typeof TableColumnBase;
  Row: typeof TableRowBase;
  Header: typeof TableHeaderBase;
  Body: typeof TableBodyBase;
  Pagination: typeof TablePagination;
};

Table.displayName = "NextUI.Table";
Table.toString = () => ".nextui-table";

export default withDefaults(Table, defaultProps) as TableComponent<HTMLTableElement, TableProps>;
