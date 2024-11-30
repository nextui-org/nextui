import type {ComponentProps, FC} from "react";

import {cn, table} from "@nextui-org/theme";

const tableSlots = table();

export const TableRoot: FC<ComponentProps<"div">> = ({children, className, ...props}) => {
  return (
    <div {...props} className={tableSlots.base({className})}>
      {children}
    </div>
  );
};

export const Table: FC<
  ComponentProps<"table"> & {
    layout?: "fixed" | "auto";
  }
> = ({children, className, layout = "auto", ...props}) => {
  return (
    <table {...props} className={tableSlots.table({className, layout})}>
      {children}
    </table>
  );
};

export const TableHeader: FC<ComponentProps<"thead">> = ({children, className, ...props}) => {
  return (
    <thead {...props} className={tableSlots.thead({className})}>
      {children}
    </thead>
  );
};

export const TableBody: FC<ComponentProps<"tbody">> = ({children, className, ...props}) => {
  return (
    <tbody {...props} className={tableSlots.tbody({className})}>
      {children}
    </tbody>
  );
};

export const TableRow: FC<ComponentProps<"tr">> = ({children, className, ...props}) => {
  return (
    <tr {...props} className={tableSlots.tr({className})}>
      {children}
    </tr>
  );
};

export const TableColumnHeader: FC<ComponentProps<"th">> = ({children, className, ...props}) => {
  return (
    <td {...props} className={tableSlots.th({className})}>
      {children}
    </td>
  );
};

export const TableCell: FC<ComponentProps<"td">> = ({children, className, ...props}) => {
  return (
    <td {...props} className={tableSlots.td({class: cn("p-0", className)})}>
      {children}
    </td>
  );
};

export const TableColumn: FC<ComponentProps<"th">> = ({children, className, ...props}) => {
  return (
    <th {...props} className={tableSlots.th({class: cn("p-0", className)})}>
      {children}
    </th>
  );
};
