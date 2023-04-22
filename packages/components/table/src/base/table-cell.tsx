import {HTMLNextUIProps} from "@nextui-org/system";
import {Cell} from "@react-stately/table";
import {CellProps} from "@react-types/table";

export type TableCellProps = CellProps & HTMLNextUIProps<"td">;

const TableCell = Cell as (props: TableCellProps) => JSX.Element;

export default TableCell;
