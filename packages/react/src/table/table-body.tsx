import type {CSS} from "../theme/stitches.config";

import React, {useMemo} from "react";
import {TableCollection} from "@react-types/table";
import {TableState} from "@react-stately/table";
import {mergeProps} from "@react-aria/utils";

import {Loading, LoadingProps} from "../index";
import clsx from "../utils/clsx";

import {TableVariantsProps, StyledBaseTableCell, StyledTableLoadingRow} from "./table.styles";
import TableRowGroup from "./table-row-group";
import TableRow from "./table-row";
import TableCell from "./table-cell";
import TableCheckboxCell from "./table-checkbox-cell";
import {useTableContext} from "./table-context";
import {isInfinityScroll} from "./utils";

interface Props<T> {
  state: TableState<T>;
  collection: TableCollection<T>;
  animated?: boolean;
  hideLoading?: boolean;
  hasPagination?: boolean;
  // @internal
  isStatic?: boolean;
  color?: TableVariantsProps["color"];
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableBodyProps<T = unknown> = Props<T> & NativeAttrs & {css?: CSS};

// TODO: Remove this once we have a better way to pass it from the parent
const SCROLL_OFFSET = 40;

const TableBody: React.FC<TableBodyProps> = ({
  children,
  collection,
  state,
  animated,
  color,
  hasPagination,
  hideLoading,
  isStatic,
  ...props
}) => {
  const {
    currentPage,
    rowsPerPage,
    collection: collectionContext,
    setCollection,
  } = useTableContext();

  const infinityScroll = useMemo(() => isInfinityScroll(collection), [collection.body.props]);

  React.useEffect(() => {
    if (collection !== collectionContext) {
      setCollection?.(collection);
    }
  }, [collection, collectionContext]);

  const isLoading =
    collection.body?.props?.loadingState === "loading" ||
    collection.body?.props?.loadingState === "loadingMore";

  const rows = useMemo(() => {
    const data = [...collection.body.childNodes];

    if (!hasPagination) {
      return data;
    }

    return data?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  }, [hasPagination, collection, currentPage, rowsPerPage]);

  const completeSpaces = useMemo(() => {
    const rowsCount = rows.length;

    if (rowsCount >= rowsPerPage && !infinityScroll) {
      return null;
    }

    return (
      <tr aria-hidden="true" className="nextui-table-hidden-row" role="row">
        <StyledBaseTableCell
          aria-hidden="true"
          colSpan={collection.columnCount}
          css={{
            height: "var(--nextui--tableBodyEmptySpaceHeight)",
          }}
          style={mergeProps(
            {
              "--nextui--tableBodyEmptySpaceHeight": infinityScroll
                ? "var(--nextui-space-10)"
                : `calc(${rowsPerPage - rowsCount} * var(--nextui-space-14))`,
            },
            props?.style || {},
          )}
        />
      </tr>
    );
  }, [collection.columnCount, rows, rowsPerPage, infinityScroll]);

  // handle scroll and call next page on infinity scroll
  const handleScroll = (e: React.BaseSyntheticEvent) => {
    if (!infinityScroll) {
      return;
    }
    const element = e.target;
    const isAtBottom =
      element.scrollHeight - (element.scrollTop + SCROLL_OFFSET) <= element.clientHeight;

    if (isAtBottom && !isLoading) {
      collection.body?.props?.onLoadMore?.();
    }
  };

  return (
    <TableRowGroup
      as="tbody"
      className={clsx("nextui-table-body", props.className)}
      css={{
        position: "relative",
        ...props.css,
        ...collection.body?.props?.css,
      }}
      isInfinityScroll={infinityScroll}
      onScroll={handleScroll}
      {...props}
    >
      {children}
      {rows?.map((row) => {
        if (!row.hasChildNodes) {
          return null;
        }

        return (
          <TableRow key={row?.key} aria-hidden="false" item={row} state={state}>
            {[...row.childNodes].map((cell) =>
              cell?.props?.isSelectionCell ? (
                <TableCheckboxCell
                  key={cell?.key}
                  animated={animated}
                  cell={cell}
                  color={color}
                  state={state}
                />
              ) : (
                <TableCell key={cell?.key} cell={cell} isStatic={isStatic} state={state} />
              ),
            )}
          </TableRow>
        );
      })}
      {!hideLoading && isLoading && (
        <StyledTableLoadingRow
          aria-hidden="true"
          className="nextui-table-hidden-row"
          isAbsolute={!infinityScroll}
          isAtEnd={rows.length > 0}
          role="row"
        >
          <StyledBaseTableCell aria-hidden="true" colSpan={collection.columnCount}>
            <Loading color={color as LoadingProps["color"]} />
          </StyledBaseTableCell>
        </StyledTableLoadingRow>
      )}
      {completeSpaces}
    </TableRowGroup>
  );
};

TableBody.displayName = "NextUI.TableBody";

TableBody.toString = () => ".nextui-table-body";

export default TableBody;
