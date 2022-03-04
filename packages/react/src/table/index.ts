import Table from './table';
import TableColumn from './table-column';
import TablePagination from './table-pagination';

import { Cell, Row, TableBody, TableHeader } from '@react-stately/table';

export type { SortDescriptor } from '@react-types/shared';

export {
  StyledTable,
  StyledTableRow,
  StyledTableCell,
  StyledTableHeaderCell
} from './table.styles';

export type {
  TableVariantsProps,
  TableColumnHeaderVariantsProps,
  TableCellVariantsProps,
  StyledTableRowGroup,
  StyledTableHeaderRow
} from './table.styles';

export type { TableProps } from './table';
export type { TableColumnProps } from './table-column';
export type { TablePaginationProps } from './table-pagination';
export type { TableBodyProps } from './table-body';
export type { TableHeaderRowProps } from './table-header-row';
export type { TableRowProps } from './table-row';
export type { TableCellProps } from './table-cell';
export type { TableFooterProps } from './table-footer';

Table.Cell = Cell;
Table.Column = TableColumn;
Table.Header = TableHeader;
Table.Row = Row;
Table.Body = TableBody;
Table.Pagination = TablePagination;

export default Table;
