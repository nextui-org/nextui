import Table from './table-old';
import ReactAriaTable from './table';

import {
  Cell as TableCell,
  Column as TableColumn,
  Row as TableRow,
  TableBody,
  TableHeader
} from '@react-stately/table';

export type {
  TableOnCellClick,
  TableRowData,
  TableRowData as TableRowItem,
  TableCellRender,
  TableColumnData,
  TableCellData,
  TableColumnProps,
  TableColumnItem,
  TableColumnHeaderData
} from './table-types';

export {
  ReactAriaTable,
  TableCell,
  TableColumn,
  TableRow,
  TableBody,
  TableHeader
};

export default Table;
