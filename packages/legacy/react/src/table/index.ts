import Table from "./table";
import TablePagination from "./table-pagination";
import {TableBody, TableColumn, TableRow, TableCell, TableHeader} from "./base";

export type {SortDescriptor} from "@react-types/shared";

export {StyledTable, StyledTableRow, StyledTableCell, StyledTableHeaderCell} from "./table.styles";

export type {
  TableVariantsProps,
  TableColumnHeaderVariantsProps,
  TableCellVariantsProps,
  StyledTableRowGroup,
  StyledTableHeaderRow,
} from "./table.styles";

export type {TableProps} from "./table";
export type {TablePaginationProps} from "./table-pagination";
export type {TableBodyProps} from "./table-body";
export type {TableHeaderRowProps} from "./table-header-row";
export type {TableRowProps} from "./table-row";
export type {TableCellProps} from "./table-cell";
export type {TableFooterProps} from "./table-footer";

Table.Cell = TableCell;
Table.Column = TableColumn;
Table.Header = TableHeader;
Table.Row = TableRow;
Table.Body = TableBody;
Table.Pagination = TablePagination;

export default Table;
