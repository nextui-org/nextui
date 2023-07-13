import {HTMLNextUIProps} from "@nextui-org/system";
import {TableBody as TableBodyBase} from "@react-stately/table";
import {TableBodyProps as TableBodyBaseProps} from "@react-types/table";
import {ReactNode} from "react";

export interface TableBodyProps<T>
  extends TableBodyBaseProps<T>,
    Omit<HTMLNextUIProps<"tbody">, keyof TableBodyBaseProps<T>> {
  /**
   * Provides content to display a loading component when the `loadingState` is `loading` or `loadingMore`.
   */
  loadingContent?: ReactNode;
  /**
   * Whether the table data is currently loading.
   * @default false
   */
  isLoading?: boolean;
  /**
   *  Provides content to display when there are no rows in the table.
   * */
  emptyContent?: ReactNode;
}

const TableBody = TableBodyBase as <T>(props: TableBodyProps<T>) => JSX.Element;

export default TableBody;
