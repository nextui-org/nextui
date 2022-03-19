import { TableHeader as TableHeaderBase } from '@react-stately/table';
import { TableHeaderProps } from '@react-types/table';

const TableHeader = TableHeaderBase as <T>(
  props: TableHeaderProps<T>
) => JSX.Element;

export default TableHeader;
