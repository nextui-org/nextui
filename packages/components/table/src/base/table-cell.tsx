import {HTMLHeroUIProps} from "@heroui/system";
import {Cell} from "@react-stately/table";
import {CellProps} from "@react-types/table";

export type TableCellProps = CellProps & HTMLHeroUIProps<"td">;

const TableCell = Cell as (props: TableCellProps) => JSX.Element;

export default TableCell;
