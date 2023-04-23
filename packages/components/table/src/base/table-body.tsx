import {HTMLNextUIProps} from "@nextui-org/system";
import {TableBody as TableBodyBase} from "@react-stately/table";
import {TableBodyProps as TableBodyBaseProps} from "@react-types/table";
import {ReactNode} from "react";

export interface TableBodyProps<T>
  extends TableBodyBaseProps<T>,
    Omit<HTMLNextUIProps<"tbody">, keyof TableBodyBaseProps<T>> {
  /** Provides content to display when there are no rows in the table. */
  renderEmptyState?: () => ReactNode;
}

const TableBody = TableBodyBase as <T>(props: TableBodyProps<T>) => JSX.Element;

export default TableBody;
