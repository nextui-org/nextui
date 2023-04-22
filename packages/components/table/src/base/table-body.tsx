import {HTMLNextUIProps} from "@nextui-org/system";
import {TableBody as TableBodyBase} from "@react-stately/table";
import {TableBodyProps as TableBodyBaseProps} from "@react-types/table";

export type TableBodyProps<T> = TableBodyBaseProps<T> &
  Omit<HTMLNextUIProps<"tbody">, keyof TableBodyBaseProps<T>>;

const TableBody = TableBodyBase as <T>(props: TableBodyProps<T>) => JSX.Element;

export default TableBody;
