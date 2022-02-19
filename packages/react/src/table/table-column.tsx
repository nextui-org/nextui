import { Column } from '@react-stately/table';
import { SpectrumColumnProps } from '@react-types/table';

// Override TS for Column to support spectrum specific props.
const TableColumn = Column as <T>(props: SpectrumColumnProps<T>) => JSX.Element;

export default TableColumn;
