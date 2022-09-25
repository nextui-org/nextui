import {TableBody as TableBodyBase} from "@react-stately/table";
import {TableBodyProps as TableBodyBaseProps} from "@react-types/table";

import {CSS} from "../../theme/stitches.config";

export type TableBodyProps<T> = TableBodyBaseProps<T> & {css?: CSS};

// Override TS for Body to support NextUI specific props.
const TableBody = TableBodyBase as <T>(props: TableBodyProps<T>) => JSX.Element;

export default TableBody;
