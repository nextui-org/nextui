import { Column } from '@react-stately/table';
import { SpectrumColumnProps } from '@react-types/table';
import { CSS } from '../../theme/stitches.config';

export type TableColumnProps<T> = Omit<
  SpectrumColumnProps<T>,
  'showDivider'
> & { css?: CSS };

// Override TS for Column to support NextUI specific props.
const TableColumn = Column as <T>(props: TableColumnProps<T>) => JSX.Element;

export default TableColumn;
