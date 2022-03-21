import { Cell as TableCellBase } from '@react-stately/table';
import { CellProps as TableCellBaseProps } from '@react-types/table';
import { CSS } from '../../theme/stitches.config';

export type TableCellProps = TableCellBaseProps & { css?: CSS };

// Override TS for Cell to support NextUI specific props.
const TableCell = TableCellBase as (props: TableCellProps) => JSX.Element;

export default TableCell;
