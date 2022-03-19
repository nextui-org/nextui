import { Row as TableRowBase } from '@react-stately/table';
import { RowProps as TableRowBaseProps } from '@react-types/table';
import { CSS } from '../../theme/stitches.config';

export type TableRowProps = TableRowBaseProps & { css?: CSS };

// Override TS for TableRow to support NextUI specific props.
const TableRow = TableRowBase as (props: TableRowProps) => JSX.Element;

export default TableRow;
