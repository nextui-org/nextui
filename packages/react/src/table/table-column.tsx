import { Column } from '@react-stately/table';
import { SpectrumColumnProps } from '@react-types/table';

export type TableColumnProps<T> = Omit<SpectrumColumnProps<T>, 'showDivider'>;

// Override TS for Column to support spectrum specific props.
const TableColumn = Column as <T>(props: TableColumnProps<T>) => JSX.Element;

export default TableColumn;
