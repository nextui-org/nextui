import Table, { TableColumn } from './table';

import { Cell, Row, TableBody, TableHeader } from '@react-stately/table';

export {
  StyledTable,
  StyledTableRow,
  StyledTableCell,
  StyledTableHeaderCell
} from './table.styles';

export type { TableProps } from './table';
export type {
  TableVariantsProps,
  TableColumnHeaderVariantsProps,
  TableCellVariantsProps,
  StyledTableRowGroup,
  StyledTableHeaderRow
} from './table.styles';

Table.Cell = Cell;
Table.Column = TableColumn;
Table.Header = TableHeader;
Table.Row = Row;
Table.Body = TableBody;

export default Table;
